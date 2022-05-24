const fs = require('fs');
const path = require('path');
const process = require('process');

const file = path.join(__dirname, 'output.txt');
const output = fs.createWriteStream(file);

process.stdout.write ('\x1b[35mPlease, enter some text. Enter \x1b[1m«exit»\x1b[0m\x1b[35m or press \x1b[1mctrl + с\x1b[0m\x1b[35m to exit.\n >> \x1b[0m');

process.stdin.on('data', (data) =>{
  if (data.toString().trim() === 'exit') process.exit();
  output.write(data);
  process.stdout.write('\x1b[35m >> \x1b[0m');
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => process.stdout.write(`\x1b[35m\nYour input has been written to \x1b[0m${file}`));