import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { EmailSyncStatus } from './components/EmailSyncStatus';
import { Dashboard } from './components/Dashboard';
import { EmailResultsScreen } from './components/EmailResultsScreen';

type AppState = 'login' | 'syncing' | 'dashboard' | 'results';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedQuery, setSelectedQuery] = useState<string>('');

  // Update document title
  useEffect(() => {
    document.title = 'Briefly.AI - Intelligent Email Summaries';
  }, []);

  const handleLogin = () => {
    setCurrentState('syncing');
  };

  const handleSyncComplete = () => {
    setCurrentState('dashboard');
  };

  const handleCategorySelect = (category: string, query: string) => {
    setSelectedCategory(category);
    setSelectedQuery(query);
    setCurrentState('results');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setCurrentState('login');
    setSelectedCategory('');
    setSelectedQuery('');
  };

  switch (currentState) {
    case 'login':
      return <LoginScreen onLogin={handleLogin} />;
    
    case 'syncing':
      return <EmailSyncStatus onSyncComplete={handleSyncComplete} />;
    
    case 'dashboard':
      return (
        <Dashboard 
          onCategorySelect={handleCategorySelect}
          onLogout={handleLogout}
        />
      );
    
    case 'results':
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <EmailResultsScreen
              category={selectedCategory}
              query={selectedQuery}
              onBack={handleBackToDashboard}
            />
          </div>
        </div>
      );
    
    default:
      return <LoginScreen onLogin={handleLogin} />;
  }
}