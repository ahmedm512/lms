const Joi = require('joi');
var Student = require('../models/student');

const { body,validationResult } = require("express-validator");

function validateStudent(student){
    
    const schema = Joi.object({
        name: Joi.string().pattern(new RegExp("^[a-zA-Z'-]+$")).required(),
        code: Joi.string().pattern(new RegExp('^[0-9a-zA-Z]{7}$')).required()
    });
    return schema.validate(student);
}

function validateStudentUpdate(student){
    
    const schema = Joi.object({
        name: Joi.string().pattern(new RegExp("^[a-zA-Z'-]+$")),
        code: Joi.string().pattern(new RegExp('^[0-9a-zA-Z]{7}$'))
    });
    return schema.validate(student);
}

const createStudentForm = (req, res, next)=> {
    res.render('student_form', { title: 'Create Student' });
};

const showStudents = (req, res, next)=> {
    Student.find()
    .exec(function (err, list_students) {
        if (err) { return next(err); }
        // Successful, so render.
        res.send(list_students);
    })
};

const createStudent = [

    // Validate and sanitize fields.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.'),
    body('code').trim().isLength({ min: 7 }).escape(),
    
(req, res, next)=> {
    const {name, code} = req.body;

    const {error} = validateStudent(req.body);
    const errors = validationResult(req);

    var student = new Student ({
        name,
        code,
    });

    if (error) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render('student_form', { title: 'Create Student', student: student, errors: error.details[0].message });
        return;
    }
    else{
    student.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.send(student);
    });
}
}
];

const readStudent = (req,res)=> {
    Student.findById(req.params.id, function (err, student) {
        if (err) { res.status(404).send('The student with the given ID was not found'); }
        if (student == null) { // No results.
            var err = new Error('Student not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.send(student)});
};


const updateStudent = (req, res, next)=> {
    const {name, code} = req.body;
    const {error} = validateStudentUpdate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    Student.findById(req.params.id, function (err, student) {
        if (err) { 
            res.status(404).send('The student with the given ID was not found');
         }
         if(name) student.name = name;
         if(code) student.code = code;
         
         student.save(function (err) {
            if (err) { return next(err); }
            // Successful - redirect to new author record.
            res.send(student);
        });
        
        });
         
};

const deleteStudent = (req,res)=> {
   
    Student.findByIdAndRemove(req.params.id, function deleteStudent(err) {
        if (err) {res.status(404).send('The student with the given ID was not found'); }
       
        res.send('DELETED SUCCESSFULLY');
    })

};

module.exports = {
    createStudent,
    readStudent,
    updateStudent,
    deleteStudent,
    showStudents,
    createStudentForm
    };