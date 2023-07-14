const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Post = require('../models/Post');
const JobApplications=require('../models/JobApplications')
const mongoose=require('mongoose');
const adminController = require('../controllers/admin_controller');
router.post('/:id', adminController.updateStudent);
router.get('/editpostDetails/:id', adminController.updatePostDetails);
router.get('/editpost/:id', adminController.renderEditPostForm);
router.get('/:studentid', async (req, res) => {
    try {
      const studentId = req.params.studentid;
      student = await Student.findById(new mongoose.Types.ObjectId(studentId))
      try {
      } catch (error) {
        return res.status(404).send('Student not found');
      }
      if (!student) {
        return res.status(404).send('Student not found');
      }
      res.render('adminEditProfile', { student });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.get('/deleteStudent/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
  
      // Delete the student
      const deletedStudent = await Student.findByIdAndRemove(studentId);
  
      if (!deletedStudent) {
        return res.status(404).send('Student not found');
      }
  
      // Delete all job applications related to the student
      await JobApplications.deleteMany({ student_id: studentId });
  
      res.redirect('/admin/adminDB'); // Redirect to the desired page after deletion
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/deletePost/:id', async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Delete the post
      const deletedPost = await Post.findByIdAndRemove(postId);
  
      if (!deletedPost) {
        return res.status(404).send('Post not found');
      }
  
      // Delete all job applications related to the post
      await JobApplications.deleteMany({ post_id: postId });
  
      res.redirect('/admin/adminDB'); // Redirect to the desired page after deletion
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
   
module.exports = router;