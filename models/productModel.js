const { createDB } = require("../config/db");

const { DataTypes } = require("sequelize");

const Product = createDB.define("productsDB", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: DataTypes.STRING,
  price: DataTypes.NUMBER,
  content: DataTypes.STRING,
});

module.exports = Product;
