const fs = require('fs');
const path = require('path');
const process = require('process');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', data => process.stdout.write(data));