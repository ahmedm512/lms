const Joi = require('joi');
var Course = require('../models/course');

const { body,validationResult } = require("express-validator");

function validateCourse(course){
    
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        code: Joi.string().pattern(new RegExp('^[a-zA-Z]{3}[0-9]{3}$')).required(),
        description: Joi.string().max(200).allow('')
    });
    return schema.validate(course);
}

function validateCourseUpdate(course){
    
    const schema = Joi.object({
        name: Joi.string().min(5),
        code: Joi.string().pattern(new RegExp('^[a-zA-Z]{3}[0-9]{3}$')),
        description: Joi.string().max(200)
    });
    return schema.validate(course);
}

const createCourseForm = (req, res, next)=> {
    res.render('course_form', { title: 'Create Course' });
};


const showCourses = (req, res, next)=> {
    Course.find()
    .exec(function (err, list_courses) {
        if (err) { return next(err); }
        // Successful, so render.
        res.send(list_courses);
    })
};

const createCourse = [

    // Validate and sanitize fields.
    body('name').trim().isLength({ min: 5 }).escape().withMessage('Name must be specified.')
        ,
    body('code').trim().isLength({ min: 1 }).escape().withMessage('Code must be specified.')
        .isAlphanumeric(),
    body('description').optional({ checkFalsy: true }).trim().isLength({ max: 200 }),
    
(req, res, next)=> {
    const {name, code, description} = req.body;

    const {error} = validateCourse(req.body);
    const errors = validationResult(req);

    var course = new Course ({
        name,
        code,
        description
    });
    if (error) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render('course_form', { title: 'Create Course', course: course, errors: error.details[0].message });
        return;
    }
    else{
    course.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.send(course);
    });
}
}
];

const readCourse = (req,res, next)=> {
    Course.findById(req.params.id, function (err, course) {
        if (err) { res.status(404).send('The course with the given ID was not found'); }
        if (course == null) { // No results.
            var err = new Error('Course not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.send(course)});
    };


const updateCourse = (req, res)=> {
    const {name, code, description} = req.body;
    const {error} = validateCourseUpdate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    Course.findById(req.params.id, function (err, course) {
        if (err) { 
            res.status(404).send('The course with the given ID was not found');
         }
         if(name) course.name = name;
         if(code) course.code = code;
         if(description) course.description = description;
         
         course.save(function (err) {
            if (err) { return next(err); }
            // Successful - redirect to new author record.
            res.send(course);
        });
        
        });
         
    
   


  
};

const deleteCourse = (req,res)=> {

    Course.findByIdAndRemove(req.params.id, function deleteCourse(err) {
        if (err) {res.status(404).send('The course with the given ID was not found'); }
       
        res.send('DELETED SUCCESSFULLY');
    })

};

module.exports = {
    createCourse,
    readCourse,
    updateCourse,
    deleteCourse,
    showCourses,
    createCourseForm
    };