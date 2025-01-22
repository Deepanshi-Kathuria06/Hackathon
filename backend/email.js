const nodemailer = require('nodemailer');

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'laughoutlaud75@gmail.com', // Replace with your Gmail address
    pass: 'dznq khdo hrdu pnuo', // Replace with the App Password
  },
});

// Define email options
const mailOptions = {
  from: 'laughoutlaud75@gmail.com', // Your email address
  to: 'deepanshikathuria06@gmail.com', // Recipient email address
  subject: 'Test Email from Nodemailer',
  text: 'Hello! This is a test email sent using Nodemailer with Gmail.',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
