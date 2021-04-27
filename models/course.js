var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema(
  {
    name: {type: String, required: true, minLength: 5},
    code: {type: String, required: true, pattern:'^[a-zA-Z]{3}[0-9]{3}$'},
    description: {type: String, maxLength:200}
    
  }
);

module.exports = mongoose.model('Course', CourseSchema);