const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css')
let bundleArray = [];

fs.writeFile(bundleFile, '', (err) => {
    if(err) throw err;
})

fs.readdir(filePath,{ withFileTypes: true }, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        if(file.isDirectory() === false){
            if(path.extname(`${filePath}/${file.name}`) === '.css'){
                console.log(file.name);
                fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (err,data) => {
                    bundleArray.push(data);
                    fs.appendFile(bundleFile, bundleArray.join(' '), (err) => {
                        if(err) throw err;
                    })
                })
            }
        }
    })
})

