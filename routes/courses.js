var express = require('express');
const course_controller = require('../controllers/course');

var router = express.Router();

router.get('/create', course_controller.createCourseForm);
router.get('/', course_controller.showCourses);
router.get('/:id', course_controller.readCourse);
router.post('/create', course_controller.createCourse);
router.put('/:id', course_controller.updateCourse);
router.delete('/:id', course_controller.deleteCourse);

module.exports = router;
