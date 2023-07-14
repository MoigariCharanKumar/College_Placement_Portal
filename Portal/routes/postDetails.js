const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Student = require('../models/Student');
// GET route for /home/:studentId/:postId
router.get('/:studentId/:postId', async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
  const studentId = new mongoose.Types.ObjectId(req.params.studentId);
  const postId = req.params.postId;

  try {
    // Fetch the student and post details from the database
    const student = await Student.findById(studentId);
    const post = await Post.findById(postId);

    if (!student) {
      throw new Error('Student not found');
    }

    if (!post) {
      throw new Error('Post not found');
    }
    // Render the postDetails.ejs template and pass the studentId and post data
    res.render('postDetails', { studentId, student, post });
  } catch (error) {
    // Handle any errors that occur during fetching the student or post details
    console.log(error);
    res.status(500).send('Error retrieving student');
  }
});


module.exports = router;
