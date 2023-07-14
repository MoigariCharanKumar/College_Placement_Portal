const Student = require('../models/Student');
const Post = require('../models/Post');
const Companywise = require('../models/Companywise');
const EventRegistered = require('../models/JobApplications');
const mongoose=require('mongoose');
exports.showHomePage = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);    // Fetch data from the respective collections
    const students = await Student.find();

    // Render the adminDB EJS template and pass the data as variables
    res.render('home', {
      students: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data for adminDB' });
  }
};