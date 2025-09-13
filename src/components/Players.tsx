import React from 'react';
import { Target, TrendingUp, Award, MapPin } from 'lucide-react';

const Players: React.FC = () => {
  const players = [
    {
      id: 1,
      name: 'LeBron James',
      team: 'Los Angeles Lakers',
      position: 'SF',
      age: 39,
      height: '6\'9"',
      weight: '250 lbs',
      ppg: 25.2,
      rpg: 7.8,
      apg: 6.9,
      fg: 0.485,
      status: 'Active',
      photo: '👑'
    },
    {
      id: 2,
      name: 'Stephen Curry',
      team: 'Golden State Warriors',
      position: 'PG',
      age: 36,
      height: '6\'2"',
      weight: '185 lbs',
      ppg: 26.8,
      rpg: 4.3,
      apg: 5.1,
      fg: 0.413,
      status: 'Active',
      photo: '👨‍🦱'
    },
    {
      id: 3,
      name: 'Jayson Tatum',
      team: 'Boston Celtics',
      position: 'SF',
      age: 26,
      height: '6\'8"',
      weight: '210 lbs',
      ppg: 26.9,
      rpg: 8.1,
      apg: 4.9,
      fg: 0.471,
      status: 'Active',
      photo: '🏀'
    },
    {
      id: 4,
      name: 'Giannis Antetokounmpo',
      team: 'Milwaukee Bucks',
      position: 'PF',
      age: 29,
      height: '6\'11"',
      weight: '243 lbs',
      ppg: 30.4,
      rpg: 11.5,
      apg: 6.5,
      fg: 0.612,
      status: 'Active',
      photo: '🦌'
    },
    {
      id: 5,
      name: 'Luka Dončić',
      team: 'Dallas Mavericks',
      position: 'PG',
      age: 25,
      height: '6\'7"',
      weight: '230 lbs',
      ppg: 32.4,
      rpg: 8.0,
      apg: 8.8,
      fg: 0.487,
      status: 'Active',
      photo: '🇸🇮'
    },
    {
      id: 6,
      name: 'Kevin Durant',
      team: 'Phoenix Suns',
      position: 'SF',
      age: 35,
      height: '6\'10"',
      weight: '240 lbs',
      ppg: 27.1,
      rpg: 6.6,
      apg: 5.0,
      fg: 0.523,
      status: 'Active',
      photo: '🐍'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">NBA Players</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">{player.photo}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{player.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{player.team}</span>
                    <span>•</span>
                    <span>{player.position}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Age</div>
                  <div className="font-medium text-gray-800">{player.age}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Height</div>
                  <div className="font-medium text-gray-800">{player.height}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-600">PPG</span>
                  </div>
                  <span className="font-bold text-orange-600">{player.ppg}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">RPG</span>
                  </div>
                  <span className="font-bold text-blue-600">{player.rpg}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">APG</span>
                  </div>
                  <span className="font-bold text-green-600">{player.apg}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">FG%</span>
                  <span className="font-medium text-gray-800">{(player.fg * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {player.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;