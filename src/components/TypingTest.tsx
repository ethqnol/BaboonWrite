import { useState, useEffect, useCallback, useRef } from 'react';
import { TestSettings, TestState, TestResult } from '../types';
import { getRandomWords, getWordsForTime } from '../data/words';

interface TypingTestProps {
  settings: TestSettings;
  onComplete: (result: TestResult) => void;
  onRestart: () => void;
  onHome: () => void;
}

export default function TypingTest({ settings, onComplete, onRestart, onHome }: TypingTestProps) {
  const [testState, setTestState] = useState<TestState>({
    isActive: false,
    isComplete: false,
    currentPosition: 0,
    input: '',
    targetText: '',
    words: [],
    startTime: null,
    errors: new Set(),
    keystrokes: [],
  });

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // setup words
  useEffect(() => {
    const words = settings.mode === 'words' 
      ? getRandomWords(settings.value, settings.language, settings.punctuation, settings.numbers)
      : getWordsForTime(settings.value, settings.language, settings.punctuation, settings.numbers);
    
    const targetText = words.join(' ');
    
    setTestState(prev => ({
      ...prev,
      words,
      targetText,
      isComplete: false,
      isActive: false,
      currentPosition: 0,
      input: '',
      startTime: null,
      errors: new Set(),
      keystrokes: [],
    }));
    
    if (settings.mode === 'time') {
      setTimeLeft(settings.value);
    }
  }, [settings]);

  // focus & keys
  useEffect(() => {
    inputRef.current?.focus();
    
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      console.log('Global key:', e.key, 'shift:', e.shiftKey);
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Restarting test!');
        onRestart();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onHome();
      }
    };
    
    document.addEventListener('keydown', handleGlobalKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleGlobalKeyDown, { capture: true });
  }, [onRestart, onHome]);

  // timer
  useEffect(() => {
    if (testState.isActive && settings.mode === 'time' && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testState.isActive, settings.mode, timeLeft]);


  const completeTest = useCallback(() => {
    if (!testState.startTime) return;
    
    const timeElapsed = (Date.now() - testState.startTime) / 1000;
    
    // no spaces for wpm
    let totalNonSpaceChars = 0;
    let correctNonSpaceChars = 0;
    
    for (let i = 0; i < testState.input.length; i++) {
      if (i < testState.targetText.length && testState.targetText[i] !== ' ') {
        totalNonSpaceChars++;
        if (testState.input[i] === testState.targetText[i]) {
          correctNonSpaceChars++;
        }
      }
    }
    
    const incorrectChars = totalNonSpaceChars - correctNonSpaceChars;
    
    // word count
    const targetWords = settings.mode === 'words' 
      ? testState.words.slice(0, settings.value)
      : testState.words;
    
    let correctWords = 0;
    let charPosition = 0;
    
    for (const word of targetWords) {
      const wordEnd = charPosition + word.length;
      if (wordEnd <= testState.input.length) {
        const typedWord = testState.input.slice(charPosition, wordEnd);
        if (typedWord === word) {
          correctWords++;
        }
      }
      charPosition = wordEnd + 1;
      if (charPosition > testState.input.length) break;
    }
    
    const result: TestResult = {
      wpm: correctNonSpaceChars > 0 ? Math.round((correctNonSpaceChars / 5) / (timeElapsed / 60)) : 0,
      accuracy: totalNonSpaceChars > 0 ? Math.round((correctNonSpaceChars / totalNonSpaceChars) * 100) : 100,
      timeElapsed,
      totalWords: correctWords,
      correctChars: correctNonSpaceChars,
      incorrectChars,
      extraChars: 0,
      missedChars: 0,
      wordStats: targetWords.map(word => ({
        word,
        correct: true, // todo
        timeMs: 0,
      })),
    };

    setTestState(prev => ({ ...prev, isComplete: true, isActive: false }));
    onComplete(result);
  }, [testState, settings, onComplete]);


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // start on keypress
    if (!testState.isActive && !testState.startTime) {
      setTestState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }
    
    // auto-expand words
    if (settings.mode === 'time' && value.length > testState.targetText.length - 50) {
      const additionalWords = getRandomWords(25, settings.language, settings.punctuation, settings.numbers);
      const newWords = [...testState.words, ...additionalWords];
      const newTargetText = testState.targetText + ' ' + additionalWords.join(' ');
      
      setTestState(prev => ({
        ...prev,
        words: newWords,
        targetText: newTargetText,
      }));
    }
    
    // skip word w/ space
    if (value.length > testState.input.length && value[value.length - 1] === ' ') {
      const currentPos = testState.input.length;
      
      // find word end
      let nextSpacePos = currentPos;
      while (nextSpacePos < testState.targetText.length && testState.targetText[nextSpacePos] !== ' ') {
        nextSpacePos++;
      }
      
      // pad w/ spaces to skip
      if (currentPos < nextSpacePos) {
        const userTyped = testState.input;
        const padding = ' '.repeat(nextSpacePos - currentPos);
        value = userTyped + padding + ' ';
      }
    }
    
    setTestState(prev => ({
      ...prev,
      input: value,
      currentPosition: value.length,
    }));

    // check done
    if (settings.mode === 'words') {
      const targetWords = testState.targetText.split(' ').slice(0, settings.value);
      const targetLength = targetWords.join(' ').length;
      if (value.length >= targetLength) {
        setTimeout(completeTest, 0);
      }
    }
  }, [testState, settings, completeTest]);


  const renderText = () => {
    return testState.targetText.split('').map((char, index) => {
      let className = 'text-xl transition-colors duration-150 ';
      
      if (index < testState.input.length) {
        if (testState.input[index] === char) {
          className += 'text-green-500 bg-green-500/20';
        } else {
          className += 'text-red-500 bg-red-500/20';
        }
      } else if (index === testState.input.length) {
        className += 'bg-yellow-500 text-gray-900 animate-pulse';
      } else {
        className += 'text-gray-500';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-center items-center">
          <div className="flex space-x-8 text-lg">
            {settings.mode === 'time' && timeLeft !== null && (
              <div className="text-yellow-500 font-bold">{timeLeft}s</div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div 
            className="text-2xl leading-relaxed p-8 bg-gray-800 rounded-lg min-h-32 cursor-text focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500/50"
            onClick={() => inputRef.current?.focus()}
            tabIndex={0}
          >
            {renderText()}
          </div>
          
          <input
            ref={inputRef}
            value={testState.input}
            onChange={handleInputChange}
            className="absolute opacity-0 pointer-events-none"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
        </div>

        {settings.mode === 'words' && (
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${testState.targetText.length > 0 ? Math.min(100, (testState.input.length / testState.targetText.split(' ').slice(0, settings.value).join(' ').length) * 100) : 0}%` 
              }}
            />
          </div>
        )}

        <div className="text-center text-gray-400 text-sm">
          <p>Press Shift + Enter to restart | Escape to return home</p>
        </div>
      </div>
    </div>
  );
}