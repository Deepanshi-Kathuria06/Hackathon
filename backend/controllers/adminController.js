const User = require('../models/User');
const emailController = require('./emailController');

// Admin approves or rejects user registration
exports.handleUserApproval = async (req, res) => {
  const { userId, action, rejectionReason } = req.body;
  try {
    let status = action === 'approve' ? 'Approved' : 'Rejected';
    await User.findByIdAndUpdate(userId, { status, rejectionReason });

    // Send confirmation or rejection email to the user
    await emailController.sendUserConfirmation(userId, status, rejectionReason);

    res.status(200).send(`User ${status}`);
  } catch (error) {
    res.status(500).send('Error updating user status');
  }
};
