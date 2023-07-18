const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplications');
const Post = require('../models/Post');
const Student = require('../models/Student');
const mongoose = require('mongoose');
// GET route to retrieve post IDs based on student ID
router.get('/:studentId', async (req, res) => {
  try {
    //await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
    await mongoose.connect(process.env.MONGODB_URL);

    const studentId = new mongoose.Types.ObjectId(req.params.studentId);
    const student = await Student.findById(studentId);
    // Find all job applications for the given student ID
    const applications = await JobApplication.find({ student_id: student._id })
      .select('post_id')
      .exec();
    // Extract the post IDs from the applications
    const postIds = applications.map((application) => application.post_id);

    // Find the corresponding posts based on the post IDs
    const posts = await Post.find({ _id: { $in: postIds } });
    res.render('myApplications', { student, posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
