const PlayerTracking = require('../models/PlayerTracking');

class PlayerTrackingService {
  constructor() {
    this.gestureLibrary = {
      'Jump Shot': {
        keyPoints: ['shoulder_alignment', 'elbow_position', 'wrist_snap', 'follow_through'],
        optimalAngles: { elbow: 90, release: 45 },
        confidence_threshold: 80
      },
      'Crossover': {
        keyPoints: ['ball_control', 'body_position', 'foot_placement', 'timing'],
        optimalAngles: { body_lean: 15, step_angle: 45 },
        confidence_threshold: 75
      },
      'Layup': {
        keyPoints: ['approach_angle', 'takeoff_foot', 'ball_release', 'body_control'],
        optimalAngles: { approach: 45, release: 60 },
        confidence_threshold: 85
      },
      'Defensive Stance': {
        keyPoints: ['foot_width', 'knee_bend', 'arm_position', 'head_position'],
        optimalAngles: { knee_bend: 120, arm_spread: 180 },
        confidence_threshold: 70
      }
    };
  }

  async analyzePlayerMovement(playerId, movementData) {
    try {
      // Simulate AI analysis of player movement
      const analysis = {
        speed: this.calculateSpeed(movementData.coordinates),
        shotAccuracy: this.analyzeShotForm(movementData.gestures),
        movementEfficiency: this.calculateEfficiency(movementData),
        gestureScore: this.analyzeGestures(movementData.gestures),
        reactionTime: this.calculateReactionTime(movementData.events),
        courtVision: this.analyzeCourt Vision(movementData.decisions)
      };

      // Generate AI insights
      const insights = this.generateInsights(analysis);

      // Save tracking data
      const trackingData = new PlayerTracking({
        playerId: playerId,
        gameId: movementData.gameId,
        metrics: analysis,
        gestures: movementData.gestures,
        aiAnalysis: insights
      });

      await trackingData.save();

      return {
        analysis,
        insights,
        recommendations: this.generateRecommendations(analysis)
      };
    } catch (error) {
      console.error('Error analyzing player movement:', error);
      throw error;
    }
  }

  calculateSpeed(coordinates) {
    // Calculate player speed based on coordinate changes
    if (!coordinates || coordinates.length < 2) return 0;
    
    let totalDistance = 0;
    let totalTime = 0;
    
    for (let i = 1; i < coordinates.length; i++) {
      const prev = coordinates[i - 1];
      const curr = coordinates[i];
      
      const distance = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + 
        Math.pow(curr.y - prev.y, 2)
      );
      
      const time = (curr.timestamp - prev.timestamp) / 1000; // Convert to seconds
      
      totalDistance += distance;
      totalTime += time;
    }
    
    return totalTime > 0 ? (totalDistance / totalTime) * 3.6 : 0; // Convert to km/h
  }

  analyzeShotForm(gestures) {
    const shotGestures = gestures.filter(g => g.gesture === 'Jump Shot');
    if (shotGestures.length === 0) return 0;
    
    const avgConfidence = shotGestures.reduce((sum, g) => sum + g.confidence, 0) / shotGestures.length;
    return avgConfidence;
  }

  calculateEfficiency(movementData) {
    // Calculate movement efficiency based on distance traveled vs. effective plays
    const effectiveMovements = movementData.gestures.filter(g => 
      ['Jump Shot', 'Layup', 'Defensive Stance'].includes(g.gesture)
    ).length;
    
    const totalMovements = movementData.gestures.length;
    
    return totalMovements > 0 ? (effectiveMovements / totalMovements) * 100 : 0;
  }

  analyzeGestures(gestures) {
    if (!gestures || gestures.length === 0) return 0;
    
    let totalScore = 0;
    let validGestures = 0;
    
    gestures.forEach(gesture => {
      const gestureType = this.gestureLibrary[gesture.gesture];
      if (gestureType && gesture.confidence >= gestureType.confidence_threshold) {
        totalScore += gesture.confidence;
        validGestures++;
      }
    });
    
    return validGestures > 0 ? totalScore / validGestures : 0;
  }

  calculateReactionTime(events) {
    // Calculate average reaction time based on stimulus-response events
    if (!events || events.length === 0) return 0.25; // Default reaction time
    
    const reactionTimes = events.map(event => event.reactionTime).filter(rt => rt > 0);
    
    return reactionTimes.length > 0 
      ? reactionTimes.reduce((sum, rt) => sum + rt, 0) / reactionTimes.length
      : 0.25;
  }

  analyzeCourtVision(decisions) {
    // Analyze decision-making and court awareness
    if (!decisions || decisions.length === 0) return 75; // Default score
    
    const goodDecisions = decisions.filter(d => d.outcome === 'positive').length;
    return (goodDecisions / decisions.length) * 100;
  }

  generateInsights(analysis) {
    const insights = {
      strengths: [],
      improvements: [],
      overallScore: 0
    };
    
    // Analyze strengths
    if (analysis.shotAccuracy > 85) insights.strengths.push('Excellent shot form consistency');
    if (analysis.speed > 20) insights.strengths.push('High movement speed');
    if (analysis.movementEfficiency > 80) insights.strengths.push('Efficient movement patterns');
    if (analysis.courtVision > 85) insights.strengths.push('Strong court awareness');
    
    // Analyze areas for improvement
    if (analysis.reactionTime > 0.3) insights.improvements.push('Reduce reaction time');
    if (analysis.gestureScore < 80) insights.improvements.push('Improve technique consistency');
    if (analysis.movementEfficiency < 70) insights.improvements.push('Optimize movement efficiency');
    if (analysis.courtVision < 75) insights.improvements.push('Enhance court vision');
    
    // Calculate overall score
    insights.overallScore = (
      analysis.shotAccuracy * 0.25 +
      analysis.movementEfficiency * 0.2 +
      analysis.gestureScore * 0.2 +
      analysis.courtVision * 0.2 +
      (100 - analysis.reactionTime * 100) * 0.15
    );
    
    return insights;
  }

  generateRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.shotAccuracy < 80) {
      recommendations.push({
        category: 'Shooting',
        suggestion: 'Focus on consistent shooting form and follow-through',
        priority: 'High'
      });
    }
    
    if (analysis.speed < 15) {
      recommendations.push({
        category: 'Conditioning',
        suggestion: 'Improve sprint speed and agility training',
        priority: 'Medium'
      });
    }
    
    if (analysis.courtVision < 75) {
      recommendations.push({
        category: 'Basketball IQ',
        suggestion: 'Practice reading defensive formations and passing lanes',
        priority: 'High'
      });
    }
    
    return recommendations;
  }

  async getPlayerTrackingHistory(playerId, options = {}) {
    try {
      const { limit = 50, gameId, startDate, endDate } = options;
      
      let query = { playerId };
      
      if (gameId) query.gameId = gameId;
      if (startDate || endDate) {
        query.timestamp = {};
        if (startDate) query.timestamp.$gte = new Date(startDate);
        if (endDate) query.timestamp.$lte = new Date(endDate);
      }
      
      const trackingData = await PlayerTracking.find(query)
        .sort({ timestamp: -1 })
        .limit(limit);
      
      return trackingData;
    } catch (error) {
      console.error('Error fetching player tracking history:', error);
      throw error;
    }
  }
}

module.exports = new PlayerTrackingService();