import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import TypingTest from './components/TypingTest';
import ResultsPage from './components/ResultsPage';
import { TestSettings, TestResult } from './types';

type AppState = 'home' | 'test' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [currentSettings, setCurrentSettings] = useState<TestSettings>({
    mode: 'words',
    value: 25,
    punctuation: false,
    numbers: false,
    language: 'english',
  });
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('baboonwrite-settings');
    if (saved) {
      try {
        setCurrentSettings(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse saved settings');
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('baboonwrite-settings', JSON.stringify(currentSettings));
  }, [currentSettings]);

  const handleStartTest = (settings: TestSettings) => {
    setCurrentSettings(settings);
    setAppState('test');
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setAppState('results');
  };

  const handleRestart = () => {
    setRestartKey(prev => prev + 1);
    setAppState('test');
  };

  const handleHome = () => {
    setAppState('home');
  };

  // Global keyboard shortcuts for results page only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (appState === 'results') {
        if (e.key === 'Enter' && e.shiftKey) {
          e.preventDefault();
          handleRestart();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          handleHome();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [appState, handleRestart, handleHome]);

  return (
    <div className="min-h-screen bg-gray-900">
      {appState === 'home' && (
        <HomePage onStartTest={handleStartTest} />
      )}
      
      {appState === 'test' && (
        <TypingTest 
          key={restartKey}
          settings={currentSettings}
          onComplete={handleTestComplete}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
      
      {appState === 'results' && testResult && (
        <ResultsPage 
          result={testResult}
          settings={currentSettings}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </div>
  );
}

export default App;
