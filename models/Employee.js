const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  srNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'sr_no'
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'created_at'
  },
  employeeCode: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'employee_code'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'is_active'
  },
  joiningDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'joining_date'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  overtimeRatePerHour: {
    type: DataTypes.DECIMAL(38, 2),
    allowNull: true,
    field: 'overtime_rate_per_hour'
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  presentSalary: {
    type: DataTypes.DECIMAL(38, 2),
    allowNull: true,
    field: 'present_salary'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updated_at'
  },
  workingHoursPerDay: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'working_hours_per_day'
  }
}, {
  tableName: 'employees',
  timestamps: false  // we handle createdAt/updatedAt manually
});

module.exports = Employee;