const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const Student = require('../models/Student');
const mongoose=require('mongoose');
router.get('/', async (req, res) => 
{
 await mongoose.connect(process.env.MONGODB_URL);

    const studentId = req.query.id; // Get the student ID from the query parameter
    try {
      // Retrieve the student record from the database using the student ID
      const student = await Student.findById(studentId);
  
      if (student) {
        // Render the "home" view and pass the student data
        res.render('home', { student });
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
