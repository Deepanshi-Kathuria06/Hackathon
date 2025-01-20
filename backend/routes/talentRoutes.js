const express = require('express');
const multer = require('multer');
const path = require('path');
const talentController = require('../controllers/TalentController');

const router = express.Router();

// Set up multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // File will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // File size limit of 10MB
});

// Post route for talent registration
router.post('/register', upload.single('profilePhoto'), talentController.registerTalent);

module.exports = router;
