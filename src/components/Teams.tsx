import React from 'react';
import { Users, Trophy, TrendingUp, MapPin } from 'lucide-react';

const Teams: React.FC = () => {
  const teams = [
    {
      id: 1,
      name: 'Los Angeles Lakers',
      logo: '🏀',
      conference: 'Western',
      wins: 28,
      losses: 15,
      winPercentage: 0.651,
      city: 'Los Angeles',
      founded: 1947,
      championships: 17
    },
    {
      id: 2,
      name: 'Golden State Warriors',
      logo: '⚡',
      conference: 'Western',
      wins: 25,
      losses: 18,
      winPercentage: 0.581,
      city: 'San Francisco',
      founded: 1946,
      championships: 7
    },
    {
      id: 3,
      name: 'Boston Celtics',
      logo: '🍀',
      conference: 'Eastern',
      wins: 32,
      losses: 11,
      winPercentage: 0.744,
      city: 'Boston',
      founded: 1946,
      championships: 18
    },
    {
      id: 4,
      name: 'Miami Heat',
      logo: '🔥',
      conference: 'Eastern',
      wins: 24,
      losses: 19,
      winPercentage: 0.558,
      city: 'Miami',
      founded: 1988,
      championships: 3
    },
    {
      id: 5,
      name: 'Milwaukee Bucks',
      logo: '🦌',
      conference: 'Eastern',
      wins: 29,
      losses: 14,
      winPercentage: 0.674,
      city: 'Milwaukee',
      founded: 1968,
      championships: 2
    },
    {
      id: 6,
      name: 'Phoenix Suns',
      logo: '☀️',
      conference: 'Western',
      wins: 23,
      losses: 20,
      winPercentage: 0.535,
      city: 'Phoenix',
      founded: 1968,
      championships: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">NBA Teams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">{team.logo}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{team.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{team.city}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{team.wins}</div>
                  <div className="text-sm text-gray-600">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{team.losses}</div>
                  <div className="text-sm text-gray-600">Losses</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Win %</span>
                  <span className="font-medium text-gray-800">{(team.winPercentage * 100).toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conference</span>
                  <span className="font-medium text-gray-800">{team.conference}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Championships</span>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-gray-800">{team.championships}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;