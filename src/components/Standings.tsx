import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const Standings: React.FC = () => {
  const standings = [
    {
      rank: 1,
      team: 'Boston Celtics',
      conference: 'Eastern',
      wins: 32,
      losses: 11,
      winPercentage: 0.744,
      streak: 'W3',
      lastGames: [true, true, true, false, true] // true = win, false = loss
    },
    {
      rank: 2,
      team: 'Milwaukee Bucks',
      conference: 'Eastern',
      wins: 29,
      losses: 14,
      winPercentage: 0.674,
      streak: 'W2',
      lastGames: [true, true, false, true, true]
    },
    {
      rank: 3,
      team: 'Los Angeles Lakers',
      conference: 'Western',
      wins: 28,
      losses: 15,
      winPercentage: 0.651,
      streak: 'L1',
      lastGames: [false, true, true, true, false]
    },
    {
      rank: 4,
      team: 'Golden State Warriors',
      conference: 'Western',
      wins: 25,
      losses: 18,
      winPercentage: 0.581,
      streak: 'W1',
      lastGames: [true, false, false, true, true]
    },
    {
      rank: 5,
      team: 'Miami Heat',
      conference: 'Eastern',
      wins: 24,
      losses: 19,
      winPercentage: 0.558,
      streak: 'L2',
      lastGames: [false, false, true, true, false]
    },
    {
      rank: 6,
      team: 'Phoenix Suns',
      conference: 'Western',
      wins: 23,
      losses: 20,
      winPercentage: 0.535,
      streak: 'W1',
      lastGames: [true, false, true, false, true]
    }
  ];

  const getStreakIcon = (streak: string) => {
    return streak.startsWith('W') ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getStreakColor = (streak: string) => {
    return streak.startsWith('W') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">NBA Standings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Team</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Conference</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">W</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">L</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Win%</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Streak</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Last 5</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {team.rank <= 3 && <Trophy className="w-4 h-4 text-yellow-600" />}
                      <span className="font-bold text-gray-800">{team.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{team.team}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      team.conference === 'Eastern' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {team.conference}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-green-600">{team.wins}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-red-600">{team.losses}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-medium text-gray-800">{(team.winPercentage * 100).toFixed(1)}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getStreakIcon(team.streak)}
                      <span className={`font-medium ${getStreakColor(team.streak)}`}>{team.streak}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-1">
                      {team.lastGames.map((won, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            won ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          title={won ? 'Win' : 'Loss'}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Standings;