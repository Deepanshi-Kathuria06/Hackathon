const express = require('express');
const router = express.Router();
const talentController = require('./controllers/talentController');

router.post('/register', talentController.TalentUser);

module.exports = router;
