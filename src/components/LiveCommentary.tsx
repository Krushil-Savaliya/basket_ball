import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, Target, Activity } from 'lucide-react';

interface CommentaryItem {
  id: string;
  time: string;
  text: string;
  type: 'score' | 'foul' | 'timeout' | 'substitution' | 'general';
  player?: string;
}

interface LiveCommentaryProps {
  isLive: boolean;
}

const LiveCommentary: React.FC<LiveCommentaryProps> = ({ isLive }) => {
  const [commentary, setCommentary] = useState<CommentaryItem[]>([
    {
      id: '1',
      time: '8:45 Q3',
      text: 'Stephen Curry drains a three-pointer from way downtown! The crowd erupts as Warriors take the lead.',
      type: 'score',
      player: 'Stephen Curry'
    },
    {
      id: '2',
      time: '8:12 Q3',
      text: 'LeBron James drives to the basket with authority, drawing a foul on the play. And-one opportunity!',
      type: 'score',
      player: 'LeBron James'
    },
    {
      id: '3',
      time: '7:58 Q3',
      text: 'Defensive stop by Anthony Davis. Great positioning and timing on that block attempt.',
      type: 'general',
      player: 'Anthony Davis'
    },
    {
      id: '4',
      time: '7:30 Q3',
      text: 'Timeout called by Lakers. Coach looking to regroup after that Warriors run.',
      type: 'timeout'
    },
    {
      id: '5',
      time: '7:15 Q3',
      text: 'Klay Thompson shows his veteran presence with a mid-range jumper. Textbook form!',
      type: 'score',
      player: 'Klay Thompson'
    }
  ]);

  const basketballCommentaries = [
    'Amazing crossover by the point guard! Defender completely off balance.',
    'Three-pointer from the corner! Nothing but net on that shot.',
    'Fast break opportunity converted beautifully with a thunderous dunk!',
    'Defensive rebound secured. Great positioning under the basket.',
    'Free throw shooting has been excellent tonight - 9 out of 10 attempts.',
    'Pick and roll executed perfectly, leading to an easy layup.',
    'Steal by the guard! Quick hands and even quicker feet.',
    'Double team forces a turnover. Excellent defensive pressure.',
    'Alley-oop connection! What a display of athleticism and timing.',
    'Clutch shot under pressure! Ice in the veins of this player.',
    'Offensive rebound leads to a second-chance opportunity.',
    'Zone defense is causing problems for the opposing offense.',
    'Transition play results in a quick score before defense can set up.',
    'Technical foul called for excessive celebration. Emotions running high.',
    'Substitution brings fresh legs off the bench at crucial time.'
  ];

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        const newCommentary: CommentaryItem = {
          id: Date.now().toString(),
          time: `${Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} Q${Math.floor(Math.random() * 4) + 1}`,
          text: basketballCommentaries[Math.floor(Math.random() * basketballCommentaries.length)],
          type: Math.random() < 0.6 ? 'score' : Math.random() < 0.8 ? 'general' : 'foul',
          player: Math.random() < 0.7 ? ['LeBron James', 'Stephen Curry', 'Anthony Davis', 'Klay Thompson', 'Russell Westbrook'][Math.floor(Math.random() * 5)] : undefined
        };

        setCommentary(prev => [newCommentary, ...prev.slice(0, 19)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'score':
        return <Target className="w-4 h-4 text-green-600" />;
      case 'foul':
        return <Activity className="w-4 h-4 text-red-600" />;
      case 'timeout':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'score':
        return 'border-l-green-500 bg-green-50';
      case 'foul':
        return 'border-l-red-500 bg-red-50';
      case 'timeout':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Live Commentary</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600">AI-Powered Commentary</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {commentary.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border-l-4 ${getTypeColor(item.type)} transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-start space-x-3">
              {getTypeIcon(item.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-medium text-gray-600">{item.time}</span>
                  {item.player && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                      {item.player}
                    </span>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-800">AI Commentary Engine</h3>
            <p className="text-sm text-orange-700">
              Real-time analysis using basketball rules, player gestures, and movement patterns for accurate commentary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCommentary;