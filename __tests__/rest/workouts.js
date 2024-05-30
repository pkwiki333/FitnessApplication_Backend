const { withServer } = require("../helper");
const { getPrisma } = require("../../src/data");

describe("workouts", () => {
  let request;
  let authHeader;
  const prisma = getPrisma();

  withServer(({ request: r, authHeader: a }) => {
    request = r;
    authHeader = a;
  });

  const url = "/api/workouts";

  describe("GET all workouts", () => {
    it("should return status 200 and all workouts", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);
    });
  });

  describe("POST /api/workouts", () => {
    it("should return status 201 and created workout", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({
          name: "Test workout",
          description: "Test description",
        });

      expect(response.status).toBe(201);
      expect(response.body[0].name).toBe("Test workout");
    });
  });

  describe("GET /api/workouts/:id", () => {
    it("should return status 200 and workout by id", async () => {
      const response = await request
        .get(`${url}/1`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test workout");
    });
  });

  describe("PUT /api/workouts/:id", () => {
    it("should return updated workout", async () => {
      const response = await request
        .put(`${url}/1`)
        .set("Authorization", authHeader)
        .send({
          name: "Updated workout",
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated workout");
    });
  });

  describe("DELETE /api/workouts/:id", () => {
    it("should return deleted workout", async () => {
      const response = await request
        .delete(`${url}/1`)
        .set("Authorization", authHeader);
    });
  });
});

describe("exercises", () => {
  let request;
  let authHeader;
  const prisma = getPrisma();

  withServer(({ request: r, authHeader: a }) => {
    request = r;
    authHeader = a;
  });

  const url2 = "/api/exercises";

  describe("GET all exercises", () => {
    it("should return status 200 all exercises", async () => {
      const response = await request.get(url2).set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(14);
    });
  });

  describe("GET /api/exercises/:id", () => {
    it("should return status 200 exercise by id", async () => {
      const response = await request
        .get(`${url2}/1`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Bench Press");
    });
  });

  describe(`GET /api/exercises?zoekterm=:zoekterm`, () => {
    it("should return status 200 exercise by search term", async () => {
      const response = await request
        .get(`${url2}?zoekterm=press`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body[0].name).toBe("Bench Press");
    });
  });
});
