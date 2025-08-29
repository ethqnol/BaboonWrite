export interface TestSettings {
  mode: 'words' | 'time';
  value: number;
  punctuation: boolean;
  numbers: boolean;
  language: 'english' | 'spanish' | 'vim';
}

export interface TestResult {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  totalWords: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  wordStats: Array<{
    word: string;
    correct: boolean;
    timeMs: number;
  }>;
}

export interface TestState {
  isActive: boolean;
  isComplete: boolean;
  currentPosition: number;
  input: string;
  targetText: string;
  words: string[];
  startTime: number | null;
  errors: Set<number>;
  keystrokes: Array<{
    key: string;
    timestamp: number;
    correct: boolean;
  }>;
}