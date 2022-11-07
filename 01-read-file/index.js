const fs = require('fs');
const path = require('node:path');
const dirPath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(dirPath);

readStream.on('data', (chunk) => {
    console.log(chunk.toString());
})