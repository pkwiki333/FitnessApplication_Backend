const { getPrisma } = require("../data/index");
const { getLogger } = require("../core/logging");

const prisma = getPrisma();
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const includeMusclegroupAndEquipment = {
  include: {
    musclegroup: {
      select: {
        name: true,
      },
    },
    equipment: {
      select: {
        name: true,
      },
    },
  },
};

const getAll = async (zoekterm) => {
  let selected;
  if (zoekterm) {
    selected = {
      where: {
        OR: [
          { name: { contains: zoekterm } },
          { musclegroup: { some: { name: { contains: zoekterm } } } },
        ],
      },
    };
  }
  return await prisma.exercises.findMany({
    ...selected,
    ...includeMusclegroupAndEquipment,
  });
};

const getById = async (id) =>
  await prisma.exercises.findUnique({
    where: {
      id: parseInt(id),
    },
    ...includeMusclegroupAndEquipment,
  });

module.exports = { getAll, getById };
