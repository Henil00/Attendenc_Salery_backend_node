const express = require("express");
const router = express.Router();
const controller = require("../controllers/salaryController");

router.post("/calculate", controller.calculateSalary);
router.get("/employee/:employee_sr_no", controller.getSalaryByEmployee);
router.get("/:sr_no", controller.getSalaryReport);

module.exports = router;
