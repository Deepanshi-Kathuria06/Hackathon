// controllers/talentController.js

const registerTalent = async (req, res) => {
    try {
      // Logic to register talent
      res.status(201).json({ message: 'Talent registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getTalent = async (req, res) => {
    try {
      // Logic to get talent
      res.status(200).json({ message: 'Talent fetched successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    registerTalent,
    getTalent,
  };
  