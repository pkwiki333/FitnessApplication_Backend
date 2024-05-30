const supertest = require("supertest");
const createServer = require("../src/createServer");
const { getPrisma } = require("../src/data");
const { execSync } = require("child_process");
const axios = require("axios");
const config = require("config");

const fetchAccessToken = async () => {
  const response = await axios.post(
    config.get("auth.tokenUrl"),
    {
      grant_type: "password",
      username: config.get("auth.testUser.username"),
      password: config.get("auth.testUser.password"),
      audience: config.get("auth.audience"),
      scope: "openid profile email offline_access",
      client_id: config.get("auth.clientId"),
      client_secret: config.get("auth.clientSecret"),
    },
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );

  return response.data.access_token;
};

const withServer = (setter) => {
  let server;
  let prisma;

  beforeAll(async () => {
    server = await createServer();
    const token = await fetchAccessToken();
    prisma = getPrisma();
    execSync("npx prisma migrate reset --force");

    setter({
      request: supertest(server.getApp().callback()),
      authHeader: `Bearer ${token}`,
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

module.exports = {
  fetchAccessToken,
  withServer,
};
