const { getPrisma } = require("../data/index");
const ServiceError = require("../core/serviceError");

const prisma = getPrisma();

const includeExercises = {
  include: {
    exercises: {
      select: {
        id: true,
        name: true,
        howTo: true,
        img: true,
        musclegroup: true,
        equipment: true,
      },
    },
  },
};

const getAll = async () =>
  await prisma.workouts.findMany({
    ...includeExercises,
  });

const getById = async (id) => {
  const workout = await prisma.workouts.findUnique({
    where: {
      id: parseInt(id),
    },
    ...includeExercises,
  });
  if (!workout) {
    throw ServiceError.notFound(`There is no workout with this id ${id} `, {
      id,
    });
  }

  return workout;
};

const getByUserId = async (userId) => {
  const workout = await prisma.workouts.findMany({
    where: {
      userId: parseInt(userId),
    },
    ...includeExercises,
  });
  if (!workout) {
    throw ServiceError.notFound(
      `There is no workout with this userId ${userId} `,
      { userId }
    );
  }

  return workout;
};

const create = async ({ name }, userId) => {
  const workout = await prisma.workouts.create({
    data: {
      name: name,
      users: {
        connect: {
          id: parseInt(userId),
        },
      },
    },
  });
  if (!workout) {
    throw ServiceError.notFound(`This name is not good : ${name} `, { name });
  }

  return workout;
};

const updateById = async (id, { name, exercises, userId }) =>
  await prisma.workouts.update({
    where: {
      id: parseInt(id),
    },
    data: {
      id: parseInt(id),
      name: name,
      exercises: {
        connect: exercises.map((exercise) => ({ id: parseInt(exercise.id) })),
      },
    },
  });

const deleteById = async (id) =>
  await prisma.workouts.delete({
    where: {
      id: parseInt(id),
    },
  });

const deleteExerciseById = async (workoutId, exerciseId) => {
  await prisma.workouts.update({
    where: {
      id: parseInt(workoutId),
    },
    data: {
      exercises: {
        disconnect: {
          id: parseInt(exerciseId),
        },
      },
    },
  });
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  updateById,
  deleteById,
  deleteExerciseById,
};
