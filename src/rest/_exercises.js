const Router = require("@koa/router");
const exerciseService = require("../service/exercises");

const getAllExercises = async (ctx) => {
  ctx.body = await exerciseService.getAll(ctx.request.query.zoekterm);
};

const getExerciseById = async (ctx) => {
  ctx.body = await exerciseService.getById(ctx.params.id);
};

module.exports = (app) => {
  const router = new Router();

  router.get("/exercises", getAllExercises);
  router.get("/exercises/:id", getExerciseById);

  app.use(router.routes()).use(router.allowedMethods());
};
