const { execSync } = require("child_process");
const { PrismaClient } = require("@prisma/client");
const { getLogger } = require("../core/logging");

const config = require("config");
const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const prisma = new PrismaClient();

async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to database");

  //migrate database
  if (NODE_ENV !== "test") {
    execSync("npx prisma migrate deploy");
    execSync("npx prisma db seed");
    logger.info("Database migrated");
  }

  prisma.$connect().catch(async (e) => {
    logger.info(e);
    closeConnection();
  });

  //test connection
  await prisma.$queryRaw`SELECT 1+1 AS result`.catch(async (e) => {
    logger.info(e);
    closeConnection();
  });

  logger.info("Connection to database established");

  return prisma;
}

//get prisma instance
function getPrisma() {
  if (!prisma) throw new Error("Please initialize instance before using it.");
  return prisma;
}

//close connection before exiting
async function closeConnection() {
  const logger = getLogger();
  logger.info("disconnecting from database");
  await prisma.$disconnect().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  logger.info("Database disconnected");
}

module.exports = {
  initializeData,
  getPrisma,
  closeConnection,
};
