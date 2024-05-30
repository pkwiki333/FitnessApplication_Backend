const Router = require("@koa/router");
const userService = require("../service/users");
const { addUserInfo } = require("../core/auth");

const getUserById = async (ctx) => {
  ctx.body = await userService.getById(ctx.params.id);
};

const getUserInfo = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (error) {
    await addUserInfo(ctx);
    userId = await userService.create({
      name: ctx.state.user.name,
      auth0Id: ctx.state.user.sub,
    });
  }
  ctx.body = await userService.getById(userId);
};

const getUserByAuth0Id = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
    console.log(user);
  } catch (error) {
    console.log(error);
    await addUserInfo(ctx);

    userId = await userService.create({
      name: ctx.state.user.name,
      auth0Id: ctx.state.user.sub,
    });
  }
  ctx.body = await userService.getById(userId);
};

const updateUser = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (error) {
    await addUserInfo(ctx);
    userId = await userService.create({
      name: ctx.state.user.name,
      auth0Id: ctx.state.user.sub,
    });
  }
  ctx.body = await userService.updateById(userId, ctx.request.body);
};

module.exports = (app) => {
  const router = new Router();
  router.get("/users/:id", getUserById);
  router.get("/users", getUserInfo);
  router.get("/users/me/auth0", getUserByAuth0Id);
  router.put("/users", updateUser);

  app.use(router.routes()).use(router.allowedMethods());
};
