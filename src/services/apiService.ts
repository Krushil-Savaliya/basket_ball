const API_BASE_URL = window.location.protocol === 'https:' 
  ? 'https://localhost:5000/api' 
  : 'http://localhost:5000/api';

export interface LiveGame {
  gameId: string;
  homeTeam: {
    name: string;
    score: number;
    logo: string;
  };
  awayTeam: {
    name: string;
    score: number;
    logo: string;
  };
  gameTime: {
    quarter: number;
    minutes: number;
    seconds: number;
  };
  status: 'upcoming' | 'live' | 'completed';
  venue: string;
  date: string;
  league: string;
  stats: {
    leadChanges: number;
    accuracy: number;
  };
  lastScorer?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  games?: T[];
  count?: number;
  timestamp?: string;
}

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Live Games API
  async getLiveGames(): Promise<LiveGame[]> {
    try {
      const response = await this.fetchApi<LiveGame>('/live-games/live');
      return response.games || [];
    } catch (error) {
      console.error('Error fetching live games:', error);
      return [];
    }
  }

  async getUpcomingGames(): Promise<LiveGame[]> {
    try {
      const response = await this.fetchApi<LiveGame>('/live-games/upcoming');
      return response.games || [];
    } catch (error) {
      console.error('Error fetching upcoming games:', error);
      return [];
    }
  }

  async getGameDetails(gameId: string): Promise<LiveGame | null> {
    try {
      const response = await this.fetchApi<LiveGame>(`/live-games/game/${gameId}`);
      return response.data || null;
    } catch (error) {
      console.error('Error fetching game details:', error);
      return null;
    }
  }

  async syncGames(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/live-games/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error syncing games:', error);
      return false;
    }
  }

  // Real-time updates using polling
  startLiveUpdates(callback: (games: LiveGame[]) => void, interval: number = 10000) {
    const updateInterval = setInterval(async () => {
      try {
        const liveGames = await this.getLiveGames();
        callback(liveGames);
      } catch (error) {
        console.error('Error in live updates:', error);
      }
    }, interval);

    return () => clearInterval(updateInterval);
  }

  // WebSocket connection for real-time updates
  connectWebSocket(onMessage: (data: any) => void) {
    const ws = new WebSocket('ws://localhost:5000');
    
    ws.onopen = () => {
      console.log('WebSocket connected for live updates');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connectWebSocket(onMessage), 5000);
    };
    
    return ws;
  }
}

export const apiService = new ApiService();