const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Optional: Prevent duplicate emails
  },
  contactNumber: {
    type: String,
    required: true,
  },
  skillName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, // Path to the uploaded file
  },
});

module.exports = mongoose.model('Talent', talentSchema);
