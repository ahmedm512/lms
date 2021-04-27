var express = require('express');
const student_controller = require('../controllers/student');

var router = express.Router();



router.get('/create', student_controller.createStudentForm);
router.get('/', student_controller.showStudents);
router.get('/:id', student_controller.readStudent);
router.post('/create', student_controller.createStudent);
router.put('/:id', student_controller.updateStudent);
router.delete('/:id', student_controller.deleteStudent);


module.exports = router;
