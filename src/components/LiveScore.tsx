import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users } from 'lucide-react';
import { apiService, LiveGame } from '../services/apiService';

interface LiveScoreProps {
  isLive: boolean;
}

const LiveScore: React.FC<LiveScoreProps> = ({ isLive }) => {
  const [currentGame, setCurrentGame] = useState<LiveGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveGame = async () => {
      try {
        setLoading(true);
        const liveGames = await apiService.getLiveGames();
        
        if (liveGames.length > 0) {
          setCurrentGame(liveGames[0]); // Show first live game
        } else {
          // If no live games, show upcoming game
          const upcomingGames = await apiService.getUpcomingGames();
          if (upcomingGames.length > 0) {
            setCurrentGame(upcomingGames[0]);
          }
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch live games');
        console.error('Error fetching live games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveGame();

    // Set up real-time updates
    let stopUpdates: (() => void) | null = null;
    
    if (isLive) {
      stopUpdates = apiService.startLiveUpdates((games) => {
        if (games.length > 0) {
          setCurrentGame(games[0]);
        }
      }, 15000); // Update every 15 seconds
    }

    return () => {
      if (stopUpdates) stopUpdates();
    };
  }, [isLive]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          <span className="ml-3 text-gray-600">Loading live games...</span>
        </div>
      </div>
    );
  }

  if (error || !currentGame) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            {error || 'No live games available at the moment'}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentGame.status === 'live' ? 'Live Game' : 'Next Game'}
          </h2>
          <p className="text-sm text-gray-600">{currentGame.league}</p>
        </div>
        <div className="flex items-center space-x-2 text-orange-600">
          {currentGame.status === 'live' && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          )}
          <Clock className="w-5 h-5" />
          <span className="font-mono font-bold">
            {currentGame.status === 'live' 
              ? `Q${currentGame.gameTime.quarter} ${currentGame.gameTime.minutes}:${currentGame.gameTime.seconds.toString().padStart(2, '0')}`
              : new Date(currentGame.date).toLocaleTimeString()
            }
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Away Team */}
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">{currentGame.awayTeam.logo}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{currentGame.awayTeam.name}</h3>
            <p className="text-sm text-gray-600">Away</p>
          </div>
          <div className="text-4xl font-bold text-blue-600">{currentGame.awayTeam.score}</div>
        </div>

        {/* Home Team */}
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">{currentGame.homeTeam.logo}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{currentGame.homeTeam.name}</h3>
            <p className="text-sm text-gray-600">Home</p>
          </div>
          <div className="text-4xl font-bold text-purple-600">{currentGame.homeTeam.score}</div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{currentGame.gameTime.quarter}</div>
          <div className="text-sm text-gray-600">Quarter</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{currentGame.stats.leadChanges}</div>
          <div className="text-sm text-gray-600">Lead Changes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{currentGame.stats.accuracy}%</div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      {currentGame.lastScorer && (
        <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <span className="font-medium text-orange-800">Latest Score: {currentGame.lastScorer}</span>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Powered by BetsAPI • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default LiveScore;