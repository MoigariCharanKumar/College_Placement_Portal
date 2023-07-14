const Student = require('../models/Student');
const mongoose = require('mongoose');

// Initialize the Mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.showLoginForm = function(req, res) {
  return res.render('login');
};

module.exports.processLogin = async function(req, res) {
  const student_rollno = req.body.username;
  const student_pass = req.body.password;
  const student = await Student.findOne({ student_rollno, student_pass });
  try {
    // Perform validation by querying the student database
    if (student_rollno === 'admin' && student_pass === 'admin') {
      res.redirect('/admin');}
    else if (student) {
      // Redirect to the appropriate page based on the user role
        res.redirect(`/home?id=${student._id}`);
    } else {
      res.send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error processing login:', error);
    // Handle the error and send an appropriate response
    res.status(500).send('Internal Server Error');
  }
};
