const express = require('express');
const router = express.Router();
const adminController = require('./controllers/adminController');

router.post('/approveReject', adminController.handleUserApproval);

module.exports = router;
