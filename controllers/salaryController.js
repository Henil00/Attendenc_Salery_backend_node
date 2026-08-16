const { Op } = require("sequelize");
const { Employee, Attendance, SalaryReport } = require("../models");

exports.calculateSalary = async (req, res, next) => {
  try {
    const { employeeSrNo, month, year } = req.body;

    const employee = await Employee.findByPk(employeeSrNo);
    if (!employee) {
      const err = new Error(`Employee not found with sr_no: ${employeeSrNo}`);
      err.status = 404;
      throw err;
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendances = await Attendance.findAll({
      where: {
        empSrNo: employeeSrNo, // ← was employeeSrNo
        attendanceDate: { [Op.between]: [startDate, endDate] },
      },
    });

    let presentDays = 0,
      halfDays = 0,
      absentDays = 0;
    let totalOvertime = 0;

    attendances.forEach((att) => {
      if (att.status === "PRESENT") presentDays++;
      else if (att.status === "HALF_DAY") halfDays++;
      else if (att.status === "ABSENT") absentDays++;

      if (att.overtimeHours) totalOvertime += parseFloat(att.overtimeHours);
    });

    const presentSalary = parseFloat(employee.presentSalary);
    const overtimeRate = parseFloat(employee.overtimeRatePerHour);

    const halfDayAmount = parseFloat(
      ((presentSalary / 2) * halfDays).toFixed(2),
    );
    const overtimeAmount = parseFloat(
      (overtimeRate * totalOvertime).toFixed(2),
    );
    const totalSalary = parseFloat(
      (presentSalary * presentDays + halfDayAmount + overtimeAmount).toFixed(2),
    );

    let report = await SalaryReport.findOne({
      where: { employeeSrNo, month, year },
    });

    const payload = {
      employeeSrNo,
      employeeName: employee.name,
      month,
      year,
      presentDays,
      halfDays,
      absentDays,
      totalOvertimeHours: totalOvertime,
      presentSalary,
      overtimeRatePerHour: overtimeRate,
      halfDayAmount,
      overtimeAmount,
      totalSalary,
    };

    if (!report) {
      report = await SalaryReport.create(payload);
    } else {
      await report.update(payload);
    }

    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

exports.getSalaryReport = async (req, res, next) => {
  try {
    const report = await SalaryReport.findByPk(req.params.sr_no);
    if (!report) {
      const err = new Error(
        `Salary report not found with sr_no: ${req.params.sr_no}`,
      );
      err.status = 404;
      throw err;
    }
    res.json(report);
  } catch (err) {
    next(err);
  }
};

exports.getSalaryByEmployee = async (req, res, next) => {
  try {
    const reports = await SalaryReport.findAll({
      where: { employeeSrNo: req.params.employee_sr_no },
    });
    res.json(reports);
  } catch (err) {
    next(err);
  }
};
