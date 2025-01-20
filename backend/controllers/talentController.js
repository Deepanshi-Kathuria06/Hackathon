const Talent = require('../models/talentModel');

// Talent registration
const registerTalent = async (req, res) => {
  const { name, contact, skills, description, profilePhoto } = req.body;

  try {
    const newTalent = await Talent.create({
      name,
      contact,
      skills,
      description,
      profilePhoto,
      status: 'pending', // Default status
    });

    // Notify admin via email or WhatsApp (pseudo-code for now)
    // notifyAdmin(newTalent);

    res.status(201).json({ message: 'Talent registered and awaiting admin approval', talent: newTalent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all talents for admin
const getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.find(); // Admin can see all profiles
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject talent
const updateTalentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const talent = await Talent.findByIdAndUpdate(id, { status }, { new: true });
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }

    res.json({ message: `Talent status updated to ${status}`, talent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerTalent,
  getAllTalents,
  updateTalentStatus,
};
