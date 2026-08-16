const { Sequelize } = require("sequelize");

// Force load pg
const pg = require("pg");
console.log("PG loaded:", pg ? "yes" : "no");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
