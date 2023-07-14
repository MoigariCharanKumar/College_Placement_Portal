const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

// Create a new student
router.post('/', studentController.createStudent);
router.post('/:id', studentController.updateStudent)
module.exports = router;
