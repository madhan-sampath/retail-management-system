const { Sequelize } = require("sequelize");

// ✅ Database connection configuration
const sequelize = new Sequelize("retail_management", "postgres", "sampath@0000", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log, // ✅ Log SQL queries
});

sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL Database Connected!"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

module.exports = sequelize;

