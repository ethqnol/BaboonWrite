import { vimCommands } from './vimCommands';
import { spanishWords } from './spanishWords';

export interface SpecialMode {
  id: string;
  name: string;
  description: string;
  getWords: (count: number) => string[];
}

export const specialModes: SpecialMode[] = [
  {
    id: 'vim',
    name: 'vim commands',
    description: 'Practice Vim editor shortcuts and commands',
    getWords: (count: number) => {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(vimCommands[Math.floor(Math.random() * vimCommands.length)]);
      }
      return words;
    }
  },
  {
    id: 'spanish',
    name: 'español',
    description: 'Practice typing in Spanish',
    getWords: (count: number) => {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(spanishWords[Math.floor(Math.random() * spanishWords.length)]);
      }
      return words;
    }
  }
];