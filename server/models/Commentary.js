const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true
  },
  time: String,
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['score', 'foul', 'timeout', 'substitution', 'general'],
    default: 'general'
  },
  player: String,
  confidence: { type: Number, default: 0 }, // AI confidence score
  aiGenerated: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Commentary', commentarySchema);