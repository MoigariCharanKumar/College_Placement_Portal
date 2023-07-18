const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/JobApplications');
const mongoose = require('mongoose');

// Set storage for resume files
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${extension}`);
  }
});

// Create multer instance for resume uploads
const uploadResume = multer({ storage: resumeStorage }).single('resume');

// POST route to handle resume upload and application creation/update
router.post('/:studentId/:postId', async (req, res) => {
 // mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
  await mongoose.connect(process.env.MONGODB_URL);

  const { studentId, postId } = req.params;
  const student = new mongoose.Types.ObjectId(studentId); // Convert to ObjectId

  try {
    // Check if application already exists
    const existingApplication = await Application.findOne({ student_id: student, post_id: postId });

    if (existingApplication) {
      // Application already exists, update the resume

      // Handle resume upload
      uploadResume(req, res, (err) => {
        if (err) {
          // Handle multer error
          console.error(err);
          res.status(500).send('Resume upload failed');
        } else {
          // File uploaded successfully
          // Access the uploaded resume file via req.file
          const resumePath = req.file.path;

          // Update the existing application with the new resume
          existingApplication.student_resume = resumePath;
          existingApplication.save();

          res.redirect(`/upcomingPlacements?id=${student}`);
        }
      });
    } else {
      // Application doesn't exist, create a new application

      // Handle resume upload
      uploadResume(req, res, (err) => {
        if (err) {
          // Handle multer error
          console.error(err);
          res.status(500).send('Resume upload failed');
        } else {
          // File uploaded successfully
          // Access the uploaded resume file via req.file
          const resumePath = req.file.path;

          // Create a new application
          const newApplication = new Application({
            student_id: student,
            post_id: postId,
            student_resume: resumePath
          });

          // Save the application to the database
          newApplication.save();
          res.redirect(`/upcomingPlacements?id=${student}`);
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
