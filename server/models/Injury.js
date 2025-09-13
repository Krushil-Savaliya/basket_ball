const mongoose = require('mongoose');

const injurySchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  team: String,
  position: String,
  injury: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Day-to-Day', 'Out', 'Questionable', 'Load Management'],
    default: 'Day-to-Day'
  },
  expectedReturn: String,
  severity: {
    type: String,
    enum: ['Minor', 'Moderate', 'Severe', 'Ongoing'],
    default: 'Minor'
  },
  dateInjured: { type: Date, default: Date.now },
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Injury', injurySchema);