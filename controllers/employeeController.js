const { Employee } = require('../models');

exports.createEmployee = async (req, res, next) => {
  try {
    const exists = await Employee.findOne({ where: { employeeCode: req.body.employeeCode } });
    if (exists) {
      const err = new Error(`Employee with code '${req.body.employeeCode}' already exists`);
      err.status = 409;
      throw err;
    }
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.sr_no);
    if (!employee) {
      const err = new Error(`Employee not found with sr_no: ${req.params.sr_no}`);
      err.status = 404;
      throw err;
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.sr_no);
    if (!employee) {
      const err = new Error(`Employee not found with sr_no: ${req.params.sr_no}`);
      err.status = 404;
      throw err;
    }
    if (req.body.employeeCode && req.body.employeeCode !== employee.employeeCode) {
      const exists = await Employee.findOne({ where: { employeeCode: req.body.employeeCode } });
      if (exists) {
        const err = new Error(`Employee with code '${req.body.employeeCode}' already exists`);
        err.status = 409;
        throw err;
      }
    }
    await employee.update(req.body);
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.sr_no);
    if (!employee) {
      const err = new Error(`Employee not found with sr_no: ${req.params.sr_no}`);
      err.status = 404;
      throw err;
    }
    await employee.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};