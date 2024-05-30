const Router = require("@koa/router");
const installExercisesRouter = require("./_exercises");
const installHealthRouter = require("./_health");
const installWorkoutRouter = require("./_workouts");
const installUserRouter = require("./_users");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installExercisesRouter(router);
  installHealthRouter(router);
  installWorkoutRouter(router);
  installUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
