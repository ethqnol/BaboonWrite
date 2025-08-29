import { TestResult, TestSettings } from '../types';

interface ResultsPageProps {
  result: TestResult;
  settings: TestSettings;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultsPage({ result, settings, onRestart, onHome }: ResultsPageProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalChars = result.correctChars + result.incorrectChars + result.extraChars;
  const rawWpm = Math.round((totalChars / 5) / (result.timeElapsed / 60));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Test Complete!</h1>
          <p className="text-gray-400">
            {settings.mode === 'words' ? `${settings.value} words` : `${settings.value} seconds`}
            {settings.punctuation && ', punctuation'}
            {settings.numbers && ', numbers'}
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{result.wpm}</div>
            <div className="text-gray-400 text-sm">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{result.accuracy}%</div>
            <div className="text-gray-400 text-sm">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{formatTime(result.timeElapsed)}</div>
            <div className="text-gray-400 text-sm">Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{rawWpm}</div>
            <div className="text-gray-400 text-sm">Raw WPM</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Detailed Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">{result.correctChars}</div>
              <div className="text-gray-400 text-sm">Correct Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">{result.incorrectChars}</div>
              <div className="text-gray-400 text-sm">Incorrect Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">{result.extraChars}</div>
              <div className="text-gray-400 text-sm">Extra Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">{result.totalWords}</div>
              <div className="text-gray-400 text-sm">Words Typed</div>
            </div>
          </div>
        </div>

        {/* Character Breakdown */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Character Breakdown</h3>
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {Array.from({ length: Math.max(result.correctChars, 100) }, (_, i) => {
                let bgColor = 'bg-gray-600';
                if (i < result.correctChars) bgColor = 'bg-green-500';
                else if (i < result.correctChars + result.incorrectChars) bgColor = 'bg-red-500';
                else if (i < totalChars) bgColor = 'bg-yellow-500';
                
                return <div key={i} className={`w-1 h-4 ${bgColor} rounded-sm`} />;
              }).slice(0, 100)}
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Incorrect</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Extra</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="btn btn-primary px-8 py-3"
          >
            Try Again
          </button>
          <button
            onClick={onHome}
            className="btn btn-secondary px-8 py-3"
          >
            Change Settings
          </button>
        </div>

        {/* Keyboard shortcuts */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Press Shift + Enter to try again | Escape to go home</p>
        </div>
      </div>
    </div>
  );
}