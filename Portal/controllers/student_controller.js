const mongoose = require('mongoose');
const multer = require('multer');
const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, req.body.student_rollno + '.jpg'); // Use the original file name as the saved file name
  },
});

// Create the upload middleware using multer
const upload = multer({ storage: storage });

exports.createStudent = async (req, res) => {
  try {
    // Wait until MongoDB connection is established
    await mongoose.connect(process.env.MONGODB_URL);
    upload.single('student_image')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while uploading the image' });
      }

      const { student_rollno, student_name, student_pass, student_cgpa, student_mobile, student_program, student_branch } = req.body;

      const student = new Student({
        student_rollno,
        student_name,
        student_pass,
        student_cgpa,
        student_img: req.file.filename,
        student_mobile,
        student_program,
        student_branch,
      });

      await student.save();
      res.redirect('/admin');
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the student' });
  }
};









// Controller action to update student details and profile image
// Controller action to update student details and profile image
// Update student details and profile image

exports.updateStudent = [
  upload.single('student_img'), // Handle the file upload for 'student_img' field
  async (req, res) => {
    try {
      const studentId = req.params.id;
      const updatedFields = {
        student_name: req.body.student_name,
        student_rollno: req.body.student_rollno,
        student_rollno: req.body.pass,
        student_cgpa: req.body.student_cgpa,
        student_mobile: req.body.student_mobile,
        student_program: req.body.student_program,
        student_branch: req.body.student_branch,
      };

      // Check if a new profile image is uploaded
      if (req.file) {
        // Save the new profile image with the desired name
        const newImageName = req.body.student_rollno + '.jpg';
        const newImagePath = path.join('./assets/uploads', newImageName);
        fs.renameSync(req.file.path, newImagePath);
      
        // Set the profile image filename in the updated fields
        updatedFields.student_img = newImageName;
      
        // Delete the previous image if it has the same path name as the newly uploaded image
      } else {
        // If no new image is uploaded, retain the existing image filename
        updatedFields.student_img = req.body.student_img;
      }      // Update the student in the database
      await Student.findByIdAndUpdate(studentId, updatedFields);

      // Redirect to the student profile page
      res.redirect('/studentProfile/' + studentId);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
];