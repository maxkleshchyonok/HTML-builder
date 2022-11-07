const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const readStream = fs.createReadStream(path.join(__dirname, 'template.html'));
let htmlArray = [];


fsPromises.mkdir('06-build-page/project-dist').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});

readStream.on('data', (chunk) => {
    // console.log(chunk.toString());
    htmlArray.push(chunk.toString());
    // console.log(htmlArray)
    htmlArray.forEach(item => {

    })
    console.log('Здравствуйте. В данный момент активно доделываю это задание. Очень хочу вас попросить ещё раз проверить мою работу чуть позже. Спасибо :)')
})