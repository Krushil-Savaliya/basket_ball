import React, { useState, useEffect } from 'react';
import { Activity, Target, Zap, TrendingUp, Eye, BarChart3 } from 'lucide-react';

const PlayerTracking: React.FC = () => {
  const [trackingData, setTrackingData] = useState({
    speed: 18.5,
    shotAccuracy: 89,
    movementEfficiency: 76,
    gestureScore: 92,
    reactionTime: 0.23,
    courtVision: 85
  });

  const [gestureDetection, setGestureDetection] = useState([
    { id: 1, gesture: 'Jump Shot', confidence: 94, timestamp: '10:23' },
    { id: 2, gesture: 'Crossover', confidence: 87, timestamp: '10:18' },
    { id: 3, gesture: 'Layup', confidence: 96, timestamp: '10:15' },
    { id: 4, gesture: 'Defensive Stance', confidence: 82, timestamp: '10:12' },
    { id: 5, gesture: 'Dribble', confidence: 91, timestamp: '10:08' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingData(prev => ({
        speed: prev.speed + (Math.random() - 0.5) * 2,
        shotAccuracy: Math.max(70, Math.min(100, prev.shotAccuracy + (Math.random() - 0.5) * 5)),
        movementEfficiency: Math.max(60, Math.min(100, prev.movementEfficiency + (Math.random() - 0.5) * 3)),
        gestureScore: Math.max(80, Math.min(100, prev.gestureScore + (Math.random() - 0.5) * 2)),
        reactionTime: Math.max(0.15, Math.min(0.35, prev.reactionTime + (Math.random() - 0.5) * 0.02)),
        courtVision: Math.max(70, Math.min(100, prev.courtVision + (Math.random() - 0.5) * 4))
      }));

      // Occasionally add new gesture detection
      if (Math.random() < 0.1) {
        const gestures = ['Jump Shot', 'Crossover', 'Layup', 'Defensive Stance', 'Dribble', 'Pass', 'Steal', 'Block'];
        const newGesture = {
          id: Date.now(),
          gesture: gestures[Math.floor(Math.random() * gestures.length)],
          confidence: Math.floor(Math.random() * 20) + 80,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
        };
        
        setGestureDetection(prev => [newGesture, ...prev.slice(0, 4)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Tracking Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">Player Movement Tracking</h2>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-4"></div>
          <span className="text-sm font-medium text-green-600">Live AI Analysis</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Speed</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600">{trackingData.speed.toFixed(1)}</div>
            <div className="text-sm text-blue-700">km/h</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Shot Accuracy</h3>
            </div>
            <div className="text-3xl font-bold text-green-600">{trackingData.shotAccuracy.toFixed(0)}%</div>
            <div className="text-sm text-green-700">Current session</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Movement Efficiency</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600">{trackingData.movementEfficiency.toFixed(0)}%</div>
            <div className="text-sm text-purple-700">AI calculated</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-orange-800">Gesture Score</h3>
            </div>
            <div className="text-3xl font-bold text-orange-600">{trackingData.gestureScore.toFixed(0)}%</div>
            <div className="text-sm text-orange-700">Form accuracy</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Reaction Time</h3>
            </div>
            <div className="text-3xl font-bold text-red-600">{trackingData.reactionTime.toFixed(2)}s</div>
            <div className="text-sm text-red-700">Average</div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-teal-800">Court Vision</h3>
            </div>
            <div className="text-3xl font-bold text-teal-600">{trackingData.courtVision.toFixed(0)}%</div>
            <div className="text-sm text-teal-700">Spatial awareness</div>
          </div>
        </div>
      </div>
      
      {/* Gesture Recognition */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">AI Gesture Recognition</h2>
        </div>
        
        <div className="space-y-4">
          {gestureDetection.map((gesture) => (
            <div key={gesture.id} className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{gesture.gesture}</h3>
                    <p className="text-sm text-gray-600">Detected at {gesture.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{gesture.confidence}%</div>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${gesture.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* AI Analysis Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold text-orange-800">AI Performance Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">Strengths Detected:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Excellent shot form consistency</li>
              <li>• High movement efficiency during plays</li>
              <li>• Strong defensive positioning</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">Areas for Improvement:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Reduce reaction time by 0.05s</li>
              <li>• Improve court vision scanning</li>
              <li>• Optimize crossover technique</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTracking;