const mongoose = require('mongoose');

const playerTrackingSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true
  },
  gameId: String,
  timestamp: { type: Date, default: Date.now },
  metrics: {
    speed: Number,
    shotAccuracy: Number,
    movementEfficiency: Number,
    gestureScore: Number,
    reactionTime: Number,
    courtVision: Number
  },
  gestures: [{
    gesture: String,
    confidence: Number,
    timestamp: Date,
    coordinates: {
      x: Number,
      y: Number,
      z: Number
    }
  }],
  aiAnalysis: {
    strengths: [String],
    improvements: [String],
    overallScore: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PlayerTracking', playerTrackingSchema);