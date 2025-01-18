const express = require('express');
const { registerTalent, getTalent } = require('./controllers/talentController');

const router = express.Router();

// Route to register talent
router.post('/register', registerTalent);

// Route to fetch talent
router.get('/', getTalent);

module.exports = router;
