var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var StudentSchema = new Schema(
  {
    name: {type: String, required: true, pattern:"^[a-zA-Z'-]+$"},
    code: {type: String, required: true, pattern:'^[0-9a-zA-Z]{7}$'}
  }
);

module.exports = mongoose.model('Student', StudentSchema);