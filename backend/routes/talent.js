const express = require('express');
const nodemailer = require('nodemailer');
const Talent = require('../models/Talent'); // Assume you have a Talent model in Mongoose
const router = express.Router();

// Talent registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, contactNumber, skillName, description } = req.body;

    // Save data to database
    const newTalent = new Talent({
      name,
      email,
      contactNumber,
      skillName,
      description,
      status: 'Pending',
    });
    await newTalent.save();

    // Email notification to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-app-password', // Replace with your app password
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'admin-email@gmail.com', // Replace with admin email
      subject: `New Talent Registration: ${name}`,
      text: `A new talent has registered:\n\nName: ${name}\nEmail: ${email}\nContact: ${contactNumber}\nSkill: ${skillName}\nDescription: ${description}\n\nPlease log in to the admin panel to approve or reject this registration.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: 'Form submitted successfully and sent for approval.' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error submitting form.' });
  }
});

// Route for admin approval/rejection
router.post('/update-status', async (req, res) => {
  try {
    const { talentId, status, rejectionReason } = req.body;

    // Update status in database
    const talent = await Talent.findById(talentId);
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found.' });
    }

    talent.status = status;
    if (status === 'Rejected') {
      talent.rejectionReason = rejectionReason;
    }
    await talent.save();

    // Notify user of approval/rejection
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: talent.email, // Send email to the user
      subject: `Your Registration Status: ${status}`,
      text: `Dear ${talent.name},\n\nYour registration has been ${status.toLowerCase()}.${
        status === 'Rejected' ? ` Reason: ${rejectionReason}` : ''
      }\n\nThank you.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: `Talent ${status.toLowerCase()} successfully.` });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error updating status.' });
  }
});

module.exports = router;
