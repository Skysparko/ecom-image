const { Sequelize } = require("sequelize");

const createDB = new Sequelize("data-db", "user", "pass", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

const connectDB = () => {
  createDB
    .sync()
    .then(() => {
      console.log("Db is connected");
    })
    .catch((e) => {
      console.log("Db connection failed", e);
    });
};

module.exports = { createDB, connectDB };
