const { Op } = require("sequelize");
const { Attendance } = require("../models");

exports.markAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

exports.getAllAttendance = async (req, res, next) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByPk(req.params.sr_no);
    if (!attendance) {
      const err = new Error(
        `Attendance not found with sr_no: ${req.params.sr_no}`,
      );
      err.status = 404;
      throw err;
    }
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceByEmployee = async (req, res, next) => {
  try {
    const attendances = await Attendance.findAll({
      where: { empSrNo: req.params.employee_sr_no },
    });
    res.json(attendances);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceByDate = async (req, res, next) => {
  try {
    const attendances = await Attendance.findAll({
      where: { attendanceDate: req.params.date },
    });
    res.json(attendances);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceByDateRange = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const attendances = await Attendance.findAll({
      where: { attendanceDate: { [Op.between]: [start, end] } },
    });
    res.json(attendances);
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeAttendanceByDateRange = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const attendances = await Attendance.findAll({
      where: {
        empSrNo: req.params.employee_sr_no, // ← was employeeSrNo
        attendanceDate: { [Op.between]: [start, end] },
      },
    });
    res.json(attendances);
  } catch (err) {
    next(err);
  }
};

exports.updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByPk(req.params.sr_no);
    if (!attendance) {
      const err = new Error(
        `Attendance not found with sr_no: ${req.params.sr_no}`,
      );
      err.status = 404;
      throw err;
    }
    await attendance.update(req.body);
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

exports.deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByPk(req.params.sr_no);
    if (!attendance) {
      const err = new Error(
        `Attendance not found with sr_no: ${req.params.sr_no}`,
      );
      err.status = 404;
      throw err;
    }
    await attendance.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
