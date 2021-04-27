var express = require('express');
const course_controller = require('../controllers/course');

var router = express.Router();

router.get('/create', course_controller.createCourseForm);

module.exports = router;