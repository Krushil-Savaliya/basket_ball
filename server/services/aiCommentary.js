const Commentary = require('../models/Commentary');

class AICommentaryService {
  constructor() {
    this.basketballRules = {
      scoring: {
        fieldGoal: 2,
        threePointer: 3,
        freeThrow: 1
      },
      fouls: ['Personal', 'Technical', 'Flagrant', 'Offensive', 'Defensive'],
      violations: ['Traveling', 'Double Dribble', 'Shot Clock', '24-Second', '8-Second'],
      positions: ['PG', 'SG', 'SF', 'PF', 'C']
    };
    
    this.commentaryTemplates = {
      score: [
        '{player} scores {points} points with a beautiful {shotType}!',
        'What a shot by {player}! {points} points added to the board.',
        '{player} finds the basket for {points} points. Great execution!',
        'Incredible {shotType} by {player} for {points} points!'
      ],
      foul: [
        'Foul called on {player}. {foulType} foul committed.',
        '{player} picks up a {foulType} foul. That\'s their {foulCount} of the game.',
        'Referee calls a {foulType} foul on {player}.'
      ],
      timeout: [
        'Timeout called by {team}. Coach looking to regroup the team.',
        '{team} takes a timeout to discuss strategy.',
        'Strategic timeout by {team} at a crucial moment.'
      ],
      substitution: [
        '{playerIn} comes in for {playerOut}. Fresh legs on the court.',
        'Substitution: {playerIn} replaces {playerOut}.',
        'Coach brings in {playerIn} to replace {playerOut}.'
      ]
    };
  }

  generateCommentary(gameEvent) {
    const { type, player, team, points, shotType, foulType } = gameEvent;
    
    let template = this.getRandomTemplate(type);
    let commentary = this.fillTemplate(template, gameEvent);
    
    // Add basketball context and rules
    commentary = this.addBasketballContext(commentary, gameEvent);
    
    return {
      text: commentary,
      type: type,
      player: player,
      confidence: this.calculateConfidence(gameEvent),
      aiGenerated: true
    };
  }

  getRandomTemplate(type) {
    const templates = this.commentaryTemplates[type] || this.commentaryTemplates.score;
    return templates[Math.floor(Math.random() * templates.length)];
  }

  fillTemplate(template, data) {
    return template.replace(/{(\w+)}/g, (match, key) => {
      return data[key] || match;
    });
  }

  addBasketballContext(commentary, gameEvent) {
    // Add context based on basketball rules and situation
    const contexts = [
      'The crowd is on their feet!',
      'What a display of skill and athleticism!',
      'That\'s textbook basketball right there.',
      'The momentum is shifting!',
      'Great court vision and execution.'
    ];
    
    if (Math.random() < 0.3) {
      commentary += ' ' + contexts[Math.floor(Math.random() * contexts.length)];
    }
    
    return commentary;
  }

  calculateConfidence(gameEvent) {
    // Calculate AI confidence based on data quality and context
    let confidence = 85; // Base confidence
    
    if (gameEvent.player) confidence += 5;
    if (gameEvent.shotType) confidence += 5;
    if (gameEvent.gameContext) confidence += 5;
    
    return Math.min(100, confidence);
  }

  async generateLiveCommentary(gameId, gameData) {
    try {
      // Simulate AI analysis of game data
      const events = this.analyzeGameData(gameData);
      
      for (const event of events) {
        const commentary = this.generateCommentary(event);
        
        // Save to database
        const commentaryDoc = new Commentary({
          gameId: gameId,
          time: event.gameTime,
          ...commentary
        });
        
        await commentaryDoc.save();
      }
      
      return events.length;
    } catch (error) {
      console.error('Error generating live commentary:', error);
      return 0;
    }
  }

  analyzeGameData(gameData) {
    // Simulate AI analysis of player movements, gestures, and game state
    const events = [];
    
    // Analyze scoring events
    if (gameData.lastScorer) {
      events.push({
        type: 'score',
        player: gameData.lastScorer.split(' ')[0],
        points: parseInt(gameData.lastScorer.match(/\d+/)[0]),
        shotType: this.determineShotType(),
        gameTime: `${gameData.gameTime.minutes}:${gameData.gameTime.seconds.toString().padStart(2, '0')} Q${gameData.gameTime.quarter}`
      });
    }
    
    // Add random basketball events for demonstration
    if (Math.random() < 0.2) {
      events.push({
        type: 'general',
        text: this.generateGeneralCommentary(),
        gameTime: `${gameData.gameTime.minutes}:${gameData.gameTime.seconds.toString().padStart(2, '0')} Q${gameData.gameTime.quarter}`
      });
    }
    
    return events;
  }

  determineShotType() {
    const shotTypes = ['three-pointer', 'layup', 'jump shot', 'dunk', 'hook shot', 'fadeaway'];
    return shotTypes[Math.floor(Math.random() * shotTypes.length)];
  }

  generateGeneralCommentary() {
    const general = [
      'Excellent ball movement by the offense.',
      'Strong defensive pressure forcing a difficult shot.',
      'Great hustle play diving for the loose ball.',
      'Coach calling out instructions from the sideline.',
      'The pace of this game is incredible.',
      'Both teams showing great conditioning.',
      'Veteran leadership on display.',
      'Young player making an impact.'
    ];
    
    return general[Math.floor(Math.random() * general.length)];
  }
}

module.exports = new AICommentaryService();