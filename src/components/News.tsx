import React from 'react';
import { Newspaper, Clock, ExternalLink, TrendingUp } from 'lucide-react';

const News: React.FC = () => {
  const news = [
    {
      id: 1,
      title: 'Lakers Secure Victory in Overtime Thriller Against Warriors',
      summary: 'LeBron James delivers clutch performance with 35 points as Lakers win 127-123 in overtime at Crypto.com Arena.',
      category: 'Game Recap',
      timestamp: '2 hours ago',
      author: 'ESPN Staff',
      image: '🏀',
      trending: true
    },
    {
      id: 2,
      title: 'NBA Trade Deadline: Top Players Expected to Move',
      summary: 'Several All-Star players are reportedly available as teams prepare for the February trade deadline.',
      category: 'Trade News',
      timestamp: '4 hours ago',
      author: 'Adrian Wojnarowski',
      image: '📰',
      trending: true
    },
    {
      id: 3,
      title: 'Rookie of the Year Race Intensifies',
      summary: 'Victor Wembanyama continues to dominate, but several other rookies are making strong cases for the award.',
      category: 'Awards',
      timestamp: '6 hours ago',
      author: 'Shams Charania',
      image: '🏆',
      trending: false
    },
    {
      id: 4,
      title: 'Injury Update: Multiple Stars Expected to Return Soon',
      summary: 'Kawhi Leonard, Ben Simmons, and other injured stars are making progress in their recovery timelines.',
      category: 'Injuries',
      timestamp: '8 hours ago',
      author: 'The Athletic',
      image: '🏥',
      trending: false
    },
    {
      id: 5,
      title: 'All-Star Game Voting Results: First Update Released',
      summary: 'LeBron James and Giannis Antetokounmpo lead their respective conferences in the first voting returns.',
      category: 'All-Star',
      timestamp: '12 hours ago',
      author: 'NBA.com',
      image: '⭐',
      trending: true
    },
    {
      id: 6,
      title: 'Advanced Analytics: How AI is Changing Basketball Strategy',
      summary: 'Teams are increasingly using artificial intelligence to analyze player performance and game strategy.',
      category: 'Analytics',
      timestamp: '1 day ago',
      author: 'Basketball Reference',
      image: '🤖',
      trending: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Game Recap':
        return 'bg-green-100 text-green-800';
      case 'Trade News':
        return 'bg-blue-100 text-blue-800';
      case 'Awards':
        return 'bg-yellow-100 text-yellow-800';
      case 'Injuries':
        return 'bg-red-100 text-red-800';
      case 'All-Star':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">Basketball News</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Updated continuously</span>
          </div>
        </div>
        
        <div className="space-y-6">
          {news.map((article) => (
            <div key={article.id} className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{article.image}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    {article.trending && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-medium text-red-600">Trending</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 leading-relaxed">{article.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{article.timestamp}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 transition-colors duration-200">
                      <span className="text-sm font-medium">Read More</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
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

export default News;