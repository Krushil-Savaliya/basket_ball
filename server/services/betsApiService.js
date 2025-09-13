const axios = require('axios');

class BetsApiService {
  constructor() {
    // You'll need to get an API key from BetsAPI
    this.apiKey = process.env.BETSAPI_KEY || 'your-api-key-here';
    this.baseUrl = 'https://api.betsapi.com/v1';
    this.sportId = 18; // Basketball sport ID in BetsAPI
  }

  async getInplayGames() {
    try {
      const response = await axios.get(`${this.baseUrl}/bet365/inplay`, {
        params: {
          token: this.apiKey,
          sport_id: this.sportId
        }
      });

      if (response.data.success) {
        return this.formatGamesData(response.data.results);
      } else {
        console.error('BetsAPI Error:', response.data.error);
        return [];
      }
    } catch (error) {
      console.error('Error fetching live games:', error.message);
      return [];
    }
  }

  async getGameDetails(gameId) {
    try {
      const response = await axios.get(`${this.baseUrl}/bet365/event`, {
        params: {
          token: this.apiKey,
          FI: gameId
        }
      });

      if (response.data.success) {
        return this.formatGameDetails(response.data.results[0]);
      } else {
        console.error('BetsAPI Error:', response.data.error);
        return null;
      }
    } catch (error) {
      console.error('Error fetching game details:', error.message);
      return null;
    }
  }

  async getUpcomingGames() {
    try {
      const response = await axios.get(`${this.baseUrl}/bet365/upcoming`, {
        params: {
          token: this.apiKey,
          sport_id: this.sportId,
          day: this.getTodayDate()
        }
      });

      if (response.data.success) {
        return this.formatGamesData(response.data.results);
      } else {
        console.error('BetsAPI Error:', response.data.error);
        return [];
      }
    } catch (error) {
      console.error('Error fetching upcoming games:', error.message);
      return [];
    }
  }

  formatGamesData(games) {
    return games.map(game => ({
      gameId: game.id,
      homeTeam: {
        name: game.home?.name || 'Home Team',
        score: parseInt(game.ss?.split('-')[0]) || 0,
        logo: this.getTeamLogo(game.home?.name)
      },
      awayTeam: {
        name: game.away?.name || 'Away Team',
        score: parseInt(game.ss?.split('-')[1]) || 0,
        logo: this.getTeamLogo(game.away?.name)
      },
      gameTime: this.parseGameTime(game.timer),
      status: this.mapGameStatus(game.time_status),
      venue: game.venue || 'Unknown Venue',
      date: new Date(game.time * 1000),
      league: game.league?.name || 'Basketball',
      stats: {
        leadChanges: 0,
        accuracy: 95
      },
      lastScorer: this.getLastScorer(game)
    }));
  }

  formatGameDetails(game) {
    return {
      gameId: game.id,
      homeTeam: {
        name: game.home?.name || 'Home Team',
        score: parseInt(game.ss?.split('-')[0]) || 0,
        logo: this.getTeamLogo(game.home?.name)
      },
      awayTeam: {
        name: game.away?.name || 'Away Team',
        score: parseInt(game.ss?.split('-')[1]) || 0,
        logo: this.getTeamLogo(game.away?.name)
      },
      gameTime: this.parseGameTime(game.timer),
      status: this.mapGameStatus(game.time_status),
      venue: game.venue || 'Unknown Venue',
      date: new Date(game.time * 1000),
      league: game.league?.name || 'Basketball',
      periods: this.parsePeriods(game.scores),
      stats: this.parseStats(game.stats),
      events: this.parseEvents(game.events)
    };
  }

  parseGameTime(timer) {
    if (!timer) return { quarter: 1, minutes: 12, seconds: 0 };
    
    // Parse timer format from BetsAPI (e.g., "2nd 08:45")
    const parts = timer.split(' ');
    const quarter = this.parseQuarter(parts[0]);
    const time = parts[1] ? parts[1].split(':') : ['12', '00'];
    
    return {
      quarter: quarter,
      minutes: parseInt(time[0]) || 12,
      seconds: parseInt(time[1]) || 0
    };
  }

  parseQuarter(quarterStr) {
    const quarterMap = {
      '1st': 1, '2nd': 2, '3rd': 3, '4th': 4,
      'OT': 5, 'OT2': 6, 'OT3': 7
    };
    return quarterMap[quarterStr] || 1;
  }

  mapGameStatus(timeStatus) {
    const statusMap = {
      0: 'upcoming',
      1: 'live',
      2: 'completed',
      3: 'postponed'
    };
    return statusMap[timeStatus] || 'upcoming';
  }

  parsePeriods(scores) {
    if (!scores) return [];
    
    return scores.map((score, index) => ({
      period: index + 1,
      homeScore: parseInt(score.home) || 0,
      awayScore: parseInt(score.away) || 0
    }));
  }

  parseStats(stats) {
    if (!stats) return { leadChanges: 0, accuracy: 95 };
    
    return {
      leadChanges: stats.lead_changes || 0,
      accuracy: stats.field_goal_percentage || 95,
      rebounds: {
        home: stats.home_rebounds || 0,
        away: stats.away_rebounds || 0
      },
      assists: {
        home: stats.home_assists || 0,
        away: stats.away_assists || 0
      }
    };
  }

  parseEvents(events) {
    if (!events) return [];
    
    return events.map(event => ({
      time: event.time,
      type: event.type,
      description: event.text,
      player: event.player,
      team: event.team
    }));
  }

  getLastScorer(game) {
    // Extract last scorer from recent events or score changes
    if (game.events && game.events.length > 0) {
      const scoringEvents = game.events.filter(e => 
        e.type === 'score' || e.text?.includes('scores')
      );
      if (scoringEvents.length > 0) {
        const lastEvent = scoringEvents[scoringEvents.length - 1];
        return `${lastEvent.player} +${this.extractPoints(lastEvent.text)}`;
      }
    }
    return '';
  }

  extractPoints(text) {
    const match = text.match(/(\d+)\s*point/i);
    return match ? match[1] : '2';
  }

  getTeamLogo(teamName) {
    // Map team names to emojis or logos
    const logoMap = {
      'Lakers': '🏀',
      'Warriors': '⚡',
      'Celtics': '🍀',
      'Heat': '🔥',
      'Bulls': '🐂',
      'Knicks': '🗽',
      'Nets': '🕸️',
      'Clippers': '⛵',
      'Suns': '☀️',
      'Mavericks': '🐎'
    };
    
    for (const [team, logo] of Object.entries(logoMap)) {
      if (teamName?.includes(team)) return logo;
    }
    
    return '🏀'; // Default basketball emoji
  }

  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0].replace(/-/g, '');
  }

  async syncLiveGames() {
    try {
      const liveGames = await this.getInplayGames();
      const upcomingGames = await this.getUpcomingGames();
      
      return {
        live: liveGames,
        upcoming: upcomingGames,
        total: liveGames.length + upcomingGames.length
      };
    } catch (error) {
      console.error('Error syncing live games:', error);
      return { live: [], upcoming: [], total: 0 };
    }
  }
}

module.exports = new BetsApiService();