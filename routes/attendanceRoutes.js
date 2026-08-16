const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");

router.post("/", controller.markAttendance);
router.get("/", controller.getAllAttendance);
router.get("/range", controller.getAttendanceByDateRange);
router.get(
  "/employee/:employee_sr_no/range",
  controller.getEmployeeAttendanceByDateRange,
);
router.get("/date/:date", controller.getAttendanceByDate);
router.get("/employee/:employee_sr_no", controller.getAttendanceByEmployee);
router.get("/:sr_no", controller.getAttendanceById);
router.put("/:sr_no", controller.updateAttendance);
router.delete("/:sr_no", controller.deleteAttendance);

module.exports = router;
