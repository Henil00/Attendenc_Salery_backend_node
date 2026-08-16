const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

router.post('/', controller.createEmployee);
router.get('/', controller.getAllEmployees);
router.get('/:sr_no', controller.getEmployeeById);
router.put('/:sr_no', controller.updateEmployee);
router.delete('/:sr_no', controller.deleteEmployee);

module.exports = router;