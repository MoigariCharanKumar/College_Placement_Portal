const Student = require('../models/Student');
const Post = require('../models/Post');
const JobApplications=require('../models/JobApplications')
const mongoose=require('mongoose');
exports.adminDataBase = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    // Fetch data from the respective collections
    const students = await Student.find();
    const posts = await Post.find();
    const applications=await JobApplications.find()

    // Render the adminDB EJS template and pass the data as variables
    res.render('adminDB', {
      students: students,
      posts: posts,
      applications:applications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data for adminDB' });
  }
};

module.exports.showAdminPage=function(req,res){
    return res.render('admin')
}
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, req.body.student_rollno + '.jpg'); // Use the original file name as the saved file name
  },
});
const upload = multer({ storage: storage });
exports.updateStudent = [
  upload.single('student_img'), // Handle the file upload for 'student_img' field
  async (req, res) => {
    try {
      const studentId = req.params.id;
      const updatedFields = {
        student_name: req.body.student_name,
        student_rollno: req.body.student_rollno,
        student_rollno: req.body.pass,
        student_cgpa: req.body.student_cgpa,
        student_mobile: req.body.student_mobile,
        student_program: req.body.student_program,
        student_branch: req.body.student_branch,
      };

      // Check if a new profile image is uploaded
      if (req.file) {
        // Save the new profile image with the desired name
        const newImageName = req.body.student_rollno + '.jpg';
        const newImagePath = path.join('./assets/uploads', newImageName);
        fs.renameSync(req.file.path, newImagePath);
      
        // Set the profile image filename in the updated fields
        updatedFields.student_img = newImageName;
      
        // Delete the previous image if it has the same path name as the newly uploaded image
      } else {
        // If no new image is uploaded, retain the existing image filename
        updatedFields.student_img = req.body.student_img;
      }      // Update the student in the database
      await Student.findByIdAndUpdate(studentId, updatedFields);

      // Redirect to the student profile page
      res.redirect('/admin/adminDB');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
];




exports.renderEditPostForm = async (req, res) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('editPost', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.updatePostDetails = async (req, res) => {
  console.log(req.body)
  await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
  try {
    const postId = req.params.id;
    const updatedFields = {
      title: req.body.title,
      company: req.body.company,
      branch: req.body.branch,
      description: req.body.description,
      rounds: req.body.rounds,
      package: req.body.package,
      deadline: req.body.deadline,
      link: req.body.link,
      companycontact: req.body.companycontact,
    };

    // Update the post details in the database
    await Post.findByIdAndUpdate(postId, updatedFields);

    // Redirect to the adminDB page after successful update
    res.redirect('/admin/adminDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
