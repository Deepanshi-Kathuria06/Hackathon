const Talent = require('../models/TalentModel');
const emailController = require('./emailController');

// Register Talent Function
exports.registerTalent = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging log

    // Validate uploaded file
    if (!req.file) {
      return res.status(400).json({ error: 'Profile photo is required' });
    }

    const { name, email, contactNumber, skillName, description } = req.body;

    // Check if talent with the same email already exists
    const existingTalent = await Talent.findOne({ email });
    if (existingTalent) {
      return res.status(400).json({ error: 'This email is already registered' });
    }

    // Create a new talent instance
    const newTalent = new Talent({
      name,
      email,
      contactNumber,
      skillName,
      description,
      profilePhoto: req.file.path, // Save the file path
    });

    // Save the new talent to the database
    await newTalent.save();

    console.log('Talent registered successfully');

    // Send email to admin notifying about the new registration
    await emailController.sendAdminNotification(
      name,
      email,
      contactNumber,
      skillName,
      description,
      req.file
    );

    // Send confirmation email to the user
    await emailController.sendUserConfirmation(
      name,
      email,
      skillName,
      description,
      req.file
    );

    // Respond with a success message
    return res.status(200).json({
      message: 'Talent registered successfully',
      data: {
        name,
        email,
        contactNumber,
        skillName,
        description,
        profilePhoto: req.file.path,
      },
    });
  } catch (error) {
    console.error('Error during talent registration:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
