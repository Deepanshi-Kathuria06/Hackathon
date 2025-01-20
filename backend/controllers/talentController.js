const Talent = require('../models/talentModel');  // Make sure the model is correctly defined

// Register Talent Function
exports.registerTalent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name, email, contactNumber, skillName, description } = req.body;

    const newTalent = new Talent({
      name,
      email,
      contactNumber,
      skillName,
      description,
      profilePhoto: req.file.path, // Save the file path
    });

    await newTalent.save();

    return res.status(200).json({
      message: 'Talent registered successfully',
      data: { name, email, contactNumber, skillName, description, profilePhoto: req.file.path },
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
