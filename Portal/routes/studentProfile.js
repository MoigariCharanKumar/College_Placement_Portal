const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/Student');

// GET route to display the student profile
router.get('/:studentid', async (req, res) => {
  try {
    const studentId = req.params.studentid;
    let student;
    try {
      student = await Student.findById(new mongoose.Types.ObjectId(studentId));
    } catch (error) {
      return res.status(404).send('Student not found');
    }
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.render('studentProfile', { student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
