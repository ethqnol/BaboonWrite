import { useState } from 'react';
import { TestSettings } from '../types';

interface HomePageProps {
  onStartTest: (settings: TestSettings) => void;
}

export default function HomePage({ onStartTest }: HomePageProps) {
  const [settings, setSettings] = useState<TestSettings>({
    mode: 'words',
    value: 25,
    punctuation: false,
    numbers: false,
    language: 'english',
  });

  const wordOptions = [10, 25, 50, 100];
  const timeOptions = [15, 30, 60, 120];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-yellow-500 mb-4">BaboonWrite</h1>
        <p className="text-lg text-gray-400">A minimalist typing test</p>
      </div>

      <div className="max-w-2xl w-full space-y-8">
        {/* Mode Selection */}
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setSettings({ ...settings, mode: 'words', value: 25 })}
              className={`setting-option ${settings.mode === 'words' ? 'active' : ''}`}
            >
              words
            </button>
            <button
              onClick={() => setSettings({ ...settings, mode: 'time', value: 30 })}
              className={`setting-option ${settings.mode === 'time' ? 'active' : ''}`}
            >
              time
            </button>
          </div>

          {/* Value Selection */}
          <div className="flex justify-center space-x-2 mb-8">
            {(settings.mode === 'words' ? wordOptions : timeOptions).map((option) => (
              <button
                key={option}
                onClick={() => setSettings({ ...settings, value: option })}
                className={`setting-option ${settings.value === option ? 'active' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Language Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setSettings({ ...settings, language: 'english' })}
              className={`setting-option ${settings.language === 'english' ? 'active' : ''}`}
            >
              english
            </button>
            <button
              onClick={() => setSettings({ ...settings, language: 'spanish' })}
              className={`setting-option ${settings.language === 'spanish' ? 'active' : ''}`}
            >
              español
            </button>
            <button
              onClick={() => setSettings({ ...settings, language: 'vim' })}
              className={`setting-option ${settings.language === 'vim' ? 'active' : ''}`}
            >
              vim
            </button>
          </div>

          {/* Additional Options (only for english/spanish) */}
          {settings.language !== 'vim' && (
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setSettings({ ...settings, punctuation: !settings.punctuation })}
                className={`setting-option ${settings.punctuation ? 'active' : ''}`}
              >
                punctuation
              </button>
              <button
                onClick={() => setSettings({ ...settings, numbers: !settings.numbers })}
                className={`setting-option ${settings.numbers ? 'active' : ''}`}
              >
                numbers
              </button>
            </div>
          )}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => onStartTest(settings)}
            className="btn btn-primary text-lg px-8 py-3"
          >
            Start Test
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-400 text-sm space-y-2">
          <p>Click on the text area and start typing to begin the test</p>
          <p>Press Shift + Enter to restart | Escape to return home</p>
        </div>
      </div>
    </div>
  );
}