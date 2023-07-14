const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  student_rollno: {
    type: String,
    required: true
  },
  student_name: {
    type: String,
    required: true
  },
  student_pass: {
    type: String,
    required: true
  },
  student_cgpa: {
    type: Number,
    required: true
  },
  student_img: {
    type: String,
    required: true
  },
  student_mobile: {
    type: String,
    required: true
  },
  student_program: {
    type: String,
    required: true
  },
  student_branch: {
    type: String,
    required: true
  }
});

// Create the student model
const Student = mongoose.model('Student', studentSchema);

// Export the student model
module.exports = Student;
