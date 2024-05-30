const Router = require("@koa/router");
const workoutService = require("../service/workouts");
const userService = require("../service/users");
const { addUserInfo } = require("../core/auth");
const Joi = require("joi");
const validate = require("./_validation");

const getAllWorkouts = async (ctx) => {
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
  ctx.body = await workoutService.getAll();
};

const getWorkoutById = async (ctx) => {
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
  ctx.body = await workoutService.getById(ctx.params.id);
};

getWorkoutById.validationSchema = {
  params: Joi.object({
    id: Joi.number(),
  }),
};

const getWorkoutByUserId = async (ctx) => {
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
  ctx.body = await workoutService.getByUserId(ctx.params.userId);
};

getWorkoutByUserId.validationSchema = {
  params: Joi.object({
    userId: Joi.number(),
  }),
};

const createWorkout = async (ctx) => {
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

  ctx.body = await workoutService.create(ctx.request.body, userId);
};

createWorkout.validationSchema = {
  body: Joi.object({
    name: Joi.string(),
  }),
};

const updateWorkoutById = async (ctx) => {
  ctx.body = await workoutService.updateById(ctx.params.id, ctx.request.body);
};

const deleteWorkoutById = async (ctx) => {
  ctx.body = await workoutService.deleteById(ctx.params.id);
};

const deleteExerciseById = async (ctx) => {
  ctx.body = await workoutService.deleteExerciseById(
    ctx.params.workoutId,
    ctx.params.exerciseId
  );
};

module.exports = (app) => {
  const router = new Router();

  router.get("/workouts", getAllWorkouts);
  router.get(
    "/workouts/:id",
    validate(getWorkoutById.validationSchema),
    getWorkoutById
  );
  router.post(
    "/workouts",
    validate(createWorkout.validationSchema),
    createWorkout
  );
  router.put("/workouts/:id", updateWorkoutById);
  router.delete("/workouts/:id", deleteWorkoutById);
  router.put("/workouts/:workoutId/exercises/:exerciseId", deleteExerciseById);
  router.get(
    "/workouts/users/:userId",
    validate(getWorkoutByUserId.validationSchema),
    getWorkoutByUserId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
