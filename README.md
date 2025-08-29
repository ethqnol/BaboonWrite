# BaboonWrite

yet another typing test but this one actually works offline

## what it is

basically monkeytype but as a desktop app. made with tauri so it runs native and doesn't need internet

## features

- **typing modes**: words (10/25/50/100) or timed (15/30/60/120 seconds) 
- **languages**: english, español, vim commands
- **extras**: punctuation & numbers (not for vim obvs)
- **real-time stats**: wmp, accuracy, mistakes highlighting
- **works offline**: no internet needed, all word lists built-in
- **keyboard shortcuts**: shift+enter to restart, escape to go home
- **word skipping**: press space to skip a word (marks it wrong)

## how to run

```bash
pnpm install
pnpm tauri dev
```

## why baboons

they're fast typers probably idk

## dev stuff

- react + typescript
- tailwind for styling  
- tauri for desktop app
- character-based typing (spaces count as normal chars)
- no real-time wpm display (was buggy, only shows final results)

the vim commands are actual command-line stuff you'd type in vim, not keybinds

## word lists

- english: ~500 common words
- spanish: ~300 common words + some useful vocab
- vim: ~60 command-center commands (no visual mode stuff)

spaces don't count toward wpm calculation btw

## license
MIT - do whatever you want with this
