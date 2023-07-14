const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get('/', adminController.showAdminPage);
router.get('/adminDB',adminController.adminDataBase);
module.exports = router;
