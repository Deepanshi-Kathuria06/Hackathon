const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());


const connectDB = require('./config/db'); // Import DB connection
const talentRoutes = require('./routes/talentRoutes'); // Import talent routes

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Set up a default route for root (optional, for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Talent Registration API');
});

// Use talent routes
app.use('/api/talent', talentRoutes);

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
