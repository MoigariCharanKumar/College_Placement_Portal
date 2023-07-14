const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login_controller');
// Login route
const studentController = require('../controllers/student_controller');
router.get('/', loginController.showLoginForm);
// Home route
router.use('/previousPlacements',require('./previousPlacements'));
router.use('/adminDB',require('./adminDB'));
router.use('/adminUpdate',require('./adminDB'));
router.post('/update/:id', studentController.updateStudent);
router.use('/editProfile',require('./editProfile'));
router.use('/studentProfile',require('./studentProfile'));
router.use('/aboutCompanies',require('./aboutCompanies'));
router.use('/applicationDetails',require('./applicationDetails'));
router.use('/myApplications',require('./myApplications'));
router.use('/postdetails',require('./postDetails'));
router.use('/upcomingPlacements',require('./upcomingPlacements'));
router.use('/home',require('./home'));
router.use('/admin',require('./admin'));
router.use('/createStudent',require('./student'));
router.use('/createPost',require('./post'));
router.use('/createCompany',require('./company'));
router.use('/apply',require('./jobApplication'));
router.post('/login', loginController.processLogin);

module.exports = router;
