import React from 'react';
import { Calendar, Clock, MapPin, Tv } from 'lucide-react';

const Schedule: React.FC = () => {
  const games = [
    {
      id: 1,
      date: '2024-01-15',
      time: '19:30',
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
      venue: 'Crypto.com Arena',
      tv: 'ESPN'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '20:00',
      homeTeam: 'Celtics',
      awayTeam: 'Heat',
      homeScore: 118,
      awayScore: 102,
      status: 'completed',
      venue: 'TD Garden',
      tv: 'TNT'
    },
    {
      id: 3,
      date: '2024-01-16',
      time: '21:00',
      homeTeam: 'Bucks',
      awayTeam: 'Suns',
      homeScore: 87,
      awayScore: 92,
      status: 'live',
      venue: 'Fiserv Forum',
      tv: 'ABC'
    },
    {
      id: 4,
      date: '2024-01-17',
      time: '19:00',
      homeTeam: 'Mavericks',
      awayTeam: 'Nuggets',
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
      venue: 'American Airlines Center',
      tv: 'ESPN'
    },
    {
      id: 5,
      date: '2024-01-17',
      time: '20:30',
      homeTeam: 'Clippers',
      awayTeam: 'Nets',
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
      venue: 'Crypto.com Arena',
      tv: 'TNT'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return '🔴';
      case 'completed':
        return '✅';
      default:
        return '⏰';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Game Schedule</h2>
        
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">{game.date}</span>
                  <Clock className="w-4 h-4 text-gray-600 ml-4" />
                  <span className="text-gray-600">{game.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(game.status)}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(game.status)}`}>
                    {game.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{game.awayTeam}</div>
                  <div className="text-sm text-gray-600">Away</div>
                  {game.awayScore !== null && (
                    <div className="text-2xl font-bold text-blue-600 mt-1">{game.awayScore}</div>
                  )}
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">VS</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{game.homeTeam}</div>
                  <div className="text-sm text-gray-600">Home</div>
                  {game.homeScore !== null && (
                    <div className="text-2xl font-bold text-orange-600 mt-1">{game.homeScore}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{game.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tv className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-800">{game.tv}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;