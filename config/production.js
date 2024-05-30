module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["https://frontend-qfitness.onrender.com"],
    maxAge: 3 * 60 * 60,
  },
  port: 9000,
};
