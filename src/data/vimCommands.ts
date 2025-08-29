export const vimCommands = [
  ":w", ":q", ":wq", ":q!", ":x", ":e", ":help", ":version",
  ":set nu", ":set nonu", ":set hlsearch", ":noh", ":syntax on",
  ":sp", ":vsp", ":vs", ":tabnew", ":tabc", ":tabo",
  ":%s/old/new/g", ":%s/foo/bar/gc", ":s/test/example/gi",
  ":1,10d", ":1,5y", ":20,30s/old/new/g", ":g/pattern/d",
  ":sort", ":sort!", ":sort u", ":retab", ":nohlsearch",
  ":pwd", ":cd", ":lcd", ":set paste", ":set nopaste",
  ":set number", ":set nonumber", ":set relativenumber",
  ":set norelativenumber", ":set wrap", ":set nowrap",
  ":set ignorecase", ":set noignorecase", ":set smartcase",
  ":set incsearch", ":set hlsearch", ":set nohlsearch",
  ":colorscheme", ":syntax", ":filetype", ":buffers",
  ":ls", ":bn", ":bp", ":bd", ":split", ":vsplit",
  ":resize", ":vertical resize", ":only", ":close",
  ":write", ":quit", ":exit", ":wall", ":qall",
  ":source", ":so", ":edit!", ":reload", ":checktime",
  ":r", ":read", ":w!", ":saveas", ":find", ":grep",
  ":make", ":copen", ":cnext", ":cprev", ":cclose",
  ":undo", ":redo", ":undolist", ":earlier", ":later",
  ":marks", ":jumps", ":changes", ":registers", ":set all"
];

export const vimDescriptions: Record<string, string> = {
  ":w": "save file",
  ":q": "quit",
  ":wq": "save and quit",
  ":q!": "quit without saving",
  "dd": "delete line",
  "yy": "copy line",
  "p": "paste after cursor",
  "P": "paste before cursor",
  "u": "undo",
  "gg": "go to top of file",
  "G": "go to bottom of file",
  "0": "go to beginning of line",
  "$": "go to end of line",
  "w": "move to next word",
  "b": "move to previous word",
  "i": "insert mode",
  "a": "append mode",
  "v": "visual mode",
  "x": "delete character",
  "/": "search forward",
  "n": "next search result",
};

export function getRandomVimCommands(count: number): string[] {
  const commands = [];
  for (let i = 0; i < count; i++) {
    commands.push(vimCommands[Math.floor(Math.random() * vimCommands.length)]);
  }
  return commands;
}