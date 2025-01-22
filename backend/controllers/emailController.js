const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Function to send confirmation email to user
const sendUserConfirmation = async (name, email, skillName, description, profilePhoto) => {
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Talent Registration Confirmation',
    text: `Hello ${name},\n\nThank you for registering with us!\n\nDetails:\nSkill: ${skillName}\nDescription: ${description}`,
    attachments: profilePhoto
      ? [
          {
            filename: profilePhoto.originalname,
            path: profilePhoto.path,
          },
        ]
      : [],
  };

  await transporter.sendMail(userMailOptions);
};

// Function to send admin notification
const sendAdminNotification = async (name, email, contactNumber, skillName, description, profilePhoto) => {
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Admin email from environment variable
    subject: 'New Talent Registration',
    text: `A new talent has registered:\n\nName: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\nSkill: ${skillName}\nDescription: ${description}`,
    attachments: profilePhoto
      ? [
          {
            filename: profilePhoto.originalname,
            path: profilePhoto.path,
          },
        ]
      : [],
  };

  await transporter.sendMail(adminMailOptions);
};

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
};
