const sequelize = require("../config/database");
const Employee = require("./Employee");
const Attendance = require("./Attendance");
const SalaryReport = require("./SalaryReport");

// Associations (optional, for includes only)
Employee.hasMany(Attendance, { foreignKey: "empSrNo", sourceKey: "srNo" });
Attendance.belongsTo(Employee, { foreignKey: "empSrNo", targetKey: "srNo" });

Employee.hasMany(SalaryReport, {
  foreignKey: "employeeSrNo",
  sourceKey: "srNo",
});
SalaryReport.belongsTo(Employee, {
  foreignKey: "employeeSrNo",
  targetKey: "srNo",
});

// NO sync() — tables already exist
const syncDatabase = async () => {
  console.log("Connected to existing database");
};

module.exports = {
  sequelize,
  Employee,
  Attendance,
  SalaryReport,
  syncDatabase,
};
