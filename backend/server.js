const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const talentRoutes = require('./routes/talentRoutes');
const Talent = require('./models/TalentModel'); // Talent model for fetching data
const emailController = require('./controllers/emailController'); // Email controller for sending notifications
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from React app running on port 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json({ limit: '50mb' })); // Increase to 50mb or desired limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const connectDB = require('./config/db'); // Import DB connection

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: '50mb' })); // To parse incoming JSON data
app.use(express.urlencoded({ limit: '50mb', extended: true })); // To parse form data
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Set up a default route for root (optional, for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Talent Registration API');
});

// Route to get all registered talents (for admin dashboard)
app.get('/api/talent', async (req, res) => {
  try {
    const talents = await Talent.find();
    res.status(200).json({
      message: 'All talents fetched successfully',
      data: talents,
    });
  } catch (error) {
    console.error('Error fetching talents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to approve or reject talent (for admin)
app.post('/api/talent/:id/status', async (req, res) => {
  const { status } = req.body; // 'Approved' or 'Rejected'
  const { id } = req.params;

  try {
    const talent = await Talent.findById(id);

    if (!talent) {
      return res.status(404).json({ error: 'Talent not found' });
    }

    talent.status = status;
    await talent.save();

    // Send an email to the user about the status update
    if (status === 'Approved') {
      await emailController.sendUserConfirmation(
        talent.name,
        talent.email,
        talent.skillName,
        talent.description,
        talent.profilePhoto
      );
    } else if (status === 'Rejected') {
      await emailController.sendUserRejection(
        talent.name,
        talent.email,
        talent.skillName,
        talent.description,
        talent.profilePhoto
      );
    }

    res.status(200).json({
      message: `Talent ${status.toLowerCase()} successfully`,
      data: talent,
    });
  } catch (error) {
    console.error('Error updating talent status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Talent Registration Route (with file upload)
app.post('/api/talent/register', upload.single('profilePhoto'), async (req, res) => {
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
      status: 'Pending', // Initially, the status is 'Pending'
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
});

// Set up the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
