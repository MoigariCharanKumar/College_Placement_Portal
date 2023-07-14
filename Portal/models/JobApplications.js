const mongoose = require('mongoose');

// Define the student schema
const eventSchema = new mongoose.Schema({
    student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  student_resume: {
    type: String,
    required: true
  }
});

// Create the post model
const Application = mongoose.model('Application', eventSchema);

// Export the post model
module.exports = Application;
