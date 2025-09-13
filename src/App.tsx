import React, { useState, useEffect } from 'react';
import { Play, Users, Calendar, Trophy, AlertCircle, Newspaper, Activity, Target, Clock, TrendingUp } from 'lucide-react';
import LiveScore from './components/LiveScore';
import LiveCommentary from './components/LiveCommentary';
import Teams from './components/Teams';
import Players from './components/Players';
import Schedule from './components/Schedule';
import Standings from './components/Standings';
import Injuries from './components/Injuries';
import News from './components/News';
import PlayerTracking from './components/PlayerTracking';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('live');
  const [isLive, setIsLive] = useState(true);

  const navigationItems = [
    { id: 'live', label: 'Live Score', icon: Play },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'players', label: 'Players', icon: Target },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'injuries', label: 'Injuries', icon: AlertCircle },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'tracking', label: 'Player Tracking', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'live':
        return (
          <div className="space-y-6">
            <LiveScore isLive={isLive} />
            <LiveCommentary isLive={isLive} />
          </div>
        );
      case 'teams':
        return <Teams />;
      case 'players':
        return <Players />;
      case 'schedule':
        return <Schedule />;
      case 'standings':
        return <Standings />;
      case 'injuries':
        return <Injuries />;
      case 'news':
        return <News />;
      case 'tracking':
        return <PlayerTracking />;
      default:
        return <LiveScore isLive={isLive} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">BASKMANIAC</h1>
                <p className="text-gray-600">Live Basketball Commentary & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isLive ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation 
          items={navigationItems} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Main Content */}
        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;