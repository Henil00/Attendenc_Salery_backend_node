const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  srNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'sr_no'
  },
  attendanceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'attendance_date'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  empSrNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'emp_sr_no'
  },
  notes: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  overtimeHours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'overtime_hours'
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['PRESENT', 'ABSENT', 'HALF_DAY']]
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  }
}, {
  tableName: 'attendance',
  timestamps: false
});

module.exports = Attendance;