const Koa = require("koa");
const koaCors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-better-serve");
const ServiceError = require("./core/serviceError");
const { serializeError } = require("serialize-error");

//Configurations & environment variables
const config = require("config");
const NODE_ENV = config.get("env"); //process.env.NODE_ENV;
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");
const CORS_ORIGINS = config.get("cors.origins");
const CORS_MAX_AGE = config.get("cors.maxAge");

//logging
const { getLogger, initializeLogger } = require("./core/logging");
const { initializeData, closeConnection } = require("./data");
const installRest = require("./rest");

const emoji = require("node-emoji");
const Router = require("@koa/router");

const { checkJwtToken } = require("./core/auth");

module.exports = async function createServer() {
  //initailize logger
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });

  await initializeData();

  const app = new Koa();

  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-Type", "Authorization"], //de aanvraagheaders die het oorspronkelijke domein kan opgeven voor de CORS-aanvraag
      maxAge: CORS_MAX_AGE,
    })
  );

  const logger = getLogger();

  app.use(checkJwtToken());

  app.use(async (ctx, next) => {
    logger.debug(`token : ${ctx.headers.authorization}`);
    logger.debug(`current user : ${JSON.stringify(ctx.state.user)}`);
    logger.debug(`error in token : ${ctx.state.jwtOriginalError}`);
    await next();
  });

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    const logger = getLogger();
    logger.info(`${emoji.get("fast_forward")} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get("skull");
      if (ctx.status >= 400) return emoji.get("x");
      if (ctx.status >= 300) return emoji.get("rocket");
      if (ctx.status >= 200) return emoji.get("white_check_mark");
      return emoji.get("rewind");
    };

    try {
      await next();

      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
    } catch (error) {
      logger.error(`${emoji.get("x")} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error,
      });

      throw error;
    }
  });

  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: "NOT_FOUND",
          message: `Unknown resource: ${ctx.url}`,
        };
      }
    } catch (error) {
      const logger = getLogger();
      logger.error("Error occured while handling a request", {
        error: serializeError(error),
      });

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || error.statusCode || "INTERNAL_SERVER_ERROR",
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== "production" ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  installRest(app);

  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }

        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-Type", "Authorization"],
      maxAge: CORS_MAX_AGE,
    })
  );
  app.use(bodyParser());
  app.use(serve("./images/", "/api/images"));

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port = config.get("port");
        app.listen(port);
        logger.info(`🚀 Server listening on http://localhost:${port}`);
        resolve();
      });
    },

    async stop() {
      {
        app.removeAllListeners();
        await closeConnection();
        getLogger().info("Server stopped");
      }
    },
  };
};
