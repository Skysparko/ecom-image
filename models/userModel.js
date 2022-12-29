const { createDB } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = createDB.define("usersDB", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
