const Talent = require('../models/TalentModel');
const emailController = require('./emailController');

// Update Talent Status (Accept/Reject)
exports.updateTalentStatus = async (req, res) => {
  try {
    const { talentId, status } = req.body;

    // Ensure the status is either 'Accepted' or 'Rejected'
    if (status !== 'Accepted' && status !== 'Rejected') {
      return res.status(400).json({ error: 'Invalid status. Only "Accepted" or "Rejected" are allowed.' });
    }

    // Find and update the talent status
    const updatedTalent = await Talent.findByIdAndUpdate(
      talentId,
      { status },
      { new: true }
    );

    if (!updatedTalent) {
      return res.status(404).json({ error: 'Talent not found' });
    }

    console.log(`Talent status updated to ${status}`);

    // Send email to the user (talent) confirming the acceptance or rejection
    await emailController.sendUserConfirmation(
      updatedTalent.name,
      updatedTalent.email,
      updatedTalent.skillName,
      updatedTalent.description,
      updatedTalent.profilePhoto
    );

    // Respond with updated talent information
    return res.status(200).json(updatedTalent);
  } catch (error) {
    console.error('Error updating talent status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
