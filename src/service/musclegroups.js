// const { prisma } = require("@prisma/client");

// const getAll = async () => await prisma.MuscleGroup.findmany();

// const getById = async (id) =>
//   await prisma.MuscleGroup.findUnique({
//     where: {
//       id: id,
//     },
//   });

// const create = async ({ id, name, ...exercise }) =>
//   await prisma.MuscleGroup.create({
//     data: {
//       id: id,
//       name: name,
//       exercises: {
//         connect: exercise.map((exercise) => ({ id: exercise.id })),
//       },
//     },
//   });

// const updateById = async (id, { id, name, ...exercises }) =>
//   await prisma.MuscleGroup.update({
//     where: {
//       id: id,
//     },
//     data: {
//       id: id,
//       name: name,
//       exercises: {
//         connect: exercises.map((exercise) => ({ id: exercise.id })),
//       },
//     },
//   });

// const deleteById = async (id) =>
//   await prisma.MuscleGroup.delete({
//     where: {
//       id: id,
//     },
//   });

// module.exports = { getAll, getById, create, updateById, deleteById };
