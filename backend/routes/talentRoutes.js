const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  }
});

const upload = multer({ storage: storage });

// Talent registration route
router.post('/register', upload.single('profilePhoto'), async (req, res) => {
  const { name, email, phone, skills, description } = req.body;
  const profilePhoto = req.file ? req.file.path : null;  // File path of uploaded photo

  // Simulate saving data to the database
  try {
    const newTalent = {
      name,
      email,
      phone,
      skills,
      description,
      profilePhoto,  // Save profile photo path in DB
      approved: false,  // Initially, the talent is not approved
    };

    // Here you would save this data to your database (e.g., MongoDB)
    // const result = await Talent.create(newTalent);

    // Notify the admin (e.g., send email or WhatsApp notification)
    // You can implement this feature here

    res.status(201).json({
      message: 'Talent registered successfully and sent for approval!',
    });
  } catch (error) {
    console.error('Error registering talent:', error);
    res.status(500).json({ message: 'Error registering talent.' });
  }
});

module.exports = router;
