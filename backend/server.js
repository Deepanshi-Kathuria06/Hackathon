const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const talentRoutes = require('./routes/talentRoutes');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Allow requests from React app running on port 5173
}));

app.use(bodyParser.json({ limit: '50mb' })); // Increase to 50mb or desired limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const connectDB = require('./config/db'); // Import DB connection
// Import talent routes

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({limit : '50mb'})); // To parse incoming JSON data
app.use(express.urlencoded({ limit: '50mb' , extended: true })); // To parse form data
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Set up a default route for root (optional, for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Talent Registration API');
});

// Use talent routes
app.use('/api/talent', talentRoutes);


// Set up the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});