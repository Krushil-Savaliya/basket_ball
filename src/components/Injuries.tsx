import React from 'react';
import { AlertCircle, Clock, Activity, User } from 'lucide-react';

const Injuries: React.FC = () => {
  const injuries = [
    {
      id: 1,
      player: 'Anthony Davis',
      team: 'Los Angeles Lakers',
      position: 'PF/C',
      injury: 'Right Ankle Sprain',
      status: 'Day-to-Day',
      expectedReturn: '2-3 days',
      severity: 'Minor',
      dateInjured: '2024-01-12'
    },
    {
      id: 2,
      player: 'Ben Simmons',
      team: 'Brooklyn Nets',
      position: 'PG',
      injury: 'Lower Back Soreness',
      status: 'Out',
      expectedReturn: '1-2 weeks',
      severity: 'Moderate',
      dateInjured: '2024-01-08'
    },
    {
      id: 3,
      player: 'Kawhi Leonard',
      team: 'LA Clippers',
      position: 'SF',
      injury: 'Right Knee Management',
      status: 'Load Management',
      expectedReturn: 'Game-by-game',
      severity: 'Ongoing',
      dateInjured: '2023-12-15'
    },
    {
      id: 4,
      player: 'Zion Williamson',
      team: 'New Orleans Pelicans',
      position: 'PF',
      injury: 'Hamstring Strain',
      status: 'Out',
      expectedReturn: '3-4 weeks',
      severity: 'Moderate',
      dateInjured: '2024-01-05'
    },
    {
      id: 5,
      player: 'Joel Embiid',
      team: 'Philadelphia 76ers',
      position: 'C',
      injury: 'Left Knee Soreness',
      status: 'Questionable',
      expectedReturn: 'Tonight',
      severity: 'Minor',
      dateInjured: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Out':
        return 'bg-red-100 text-red-800';
      case 'Day-to-Day':
        return 'bg-yellow-100 text-yellow-800';
      case 'Questionable':
        return 'bg-orange-100 text-orange-800';
      case 'Load Management':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Minor':
        return 'text-green-600';
      case 'Moderate':
        return 'text-yellow-600';
      case 'Severe':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Injury Report</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {injuries.map((injury) => (
            <div key={injury.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{injury.player}</h3>
                    <p className="text-sm text-gray-600">{injury.team} • {injury.position}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(injury.status)}`}>
                  {injury.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Injury</span>
                  <span className="font-medium text-gray-800">{injury.injury}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Severity</span>
                  <span className={`font-medium ${getSeverityColor(injury.severity)}`}>{injury.severity}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Expected Return</span>
                  </div>
                  <span className="font-medium text-gray-800">{injury.expectedReturn}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Date Injured</span>
                  <span className="font-medium text-gray-800">{injury.dateInjured}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-800 font-medium">
                    Monitoring recovery progress with AI analysis
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

export default Injuries;