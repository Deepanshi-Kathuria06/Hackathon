const express = require('express');
const router = express.Router();
const talentController = require('../controllers/TalentController');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming convention
  }
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('profilePhoto'), talentController.registerTalent);

module.exports = router;
