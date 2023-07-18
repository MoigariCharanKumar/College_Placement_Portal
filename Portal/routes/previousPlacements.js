
// GET request for accessing the previous years placements detail page
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const mongoose = require('mongoose');

// GET request for accessing the previous years placements detail page
router.get('/:studentId', async (req, res) => {
    //await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
    await mongoose.connect(process.env.MONGODB_URL);

  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.render('previousPlacements', { student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

  
module.exports = router;
