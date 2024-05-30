const { getPrisma } = require("../data/index");
const { getLogger } = require("../core/logging");

const prisma = getPrisma();

const getById = async (id) =>
  await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });

const getUserByAuth0Id = async (auth0id) =>
  await prisma.users.findFirst({
    where: {
      auth0Id: auth0id,
    },
  });

const getByAuth0Id = async (auth0id) =>
  await prisma.users.findFirst({
    where: {
      auth0Id: auth0id,
    },
  });

const create = async (user) => {
  return await prisma.users.create({
    data: user,
  });
};

const updateById = async (id, user) => {
  return await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: user,
  });
};

module.exports = {
  getById,
  getByAuth0Id,
  getUserByAuth0Id,
  create,
  updateById,
};
