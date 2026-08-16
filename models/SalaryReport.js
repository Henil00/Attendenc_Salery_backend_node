const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SalaryReport = sequelize.define('SalaryReport', {
  srNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'sr_no'
  },
  absentDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'absent_days'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  employeeName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'employee_name'
  },
  employeeSrNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'employee_sr_no'
  },
  halfDayAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'half_day_amount'
  },
  halfDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'half_days'
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  overtimeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'overtime_amount'
  },
  overtimeRatePerHour: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'overtime_rate_per_hour'
  },
  presentDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'present_days'
  },
  presentSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'present_salary'
  },
  totalOvertimeHours: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'total_overtime_hours'
  },
  totalSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_salary'
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'salary_reports',
  timestamps: false
});

module.exports = SalaryReport;