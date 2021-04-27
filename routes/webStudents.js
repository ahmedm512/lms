var express = require('express');
const student_controller = require('../controllers/student');

var router = express.Router();



router.get('/create', student_controller.createStudentForm);

module.exports = router;