const express = require('express');
const router = express.Router();
const posts = require('../models/Post');
const Student = require('../models/Student');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
  const studentId = req.query.id; // Get the student ID from the query parameter

  try {
    // Retrieve the student record from the database using the student ID
    const student = await Student.findById(studentId);

    if (student) {
      // Retrieve the posts from the database or any other data source
      const postsData = await posts.find(); // Example: Fetching all posts

      // Render the "upcomingPlacements" view and pass the student data and posts
      res.render('upcomingPlacements', { student, posts: postsData });
    } else {
      res.send('Invalid student ID');
    }
  } catch (error) {
    console.error('Error retrieving student:', error);
    // Handle the error and send an appropriate response
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
