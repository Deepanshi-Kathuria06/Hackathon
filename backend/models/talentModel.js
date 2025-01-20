const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: false
  }
});

const Talent = mongoose.model("Talent", talentSchema);

module.exports = Talent;
