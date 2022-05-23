const fs = require('fs');
const path = require('path');
const process = require('process');

const file = path.join(__dirname, 'output.txt');
const output = fs.createWriteStream(file);

process.stdout.write ('Please, enter some text. Enter «exit» or press ctrl + с to exit.\n');

process.stdin.on('data', (data) =>
  data.toString().trim() === 'exit' ? process.exit() : output.write(data)
);

process.on('SIGINT', () => process.exit());
process.on('exit', () => process.stdout.write(`\nCheck ${file} \nBye!`));