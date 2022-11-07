const fs = require('fs');
const path = require('path');


fs.readdir('03-files-in-folder/secret-folder',
    { withFileTypes: true },
    (err, files) => {
    if(err) console.log(err);
    console.log("\nCurrent directory filenames:");
    files.forEach(file => {
        if(file.isDirectory() === false){
            const pathFile = path.join(__dirname, file.name)
            fs.stat(`03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
                if(stats.size === undefined) stats.size = 0;
                console.log(`${file.name.split('.').at(0)} - ${path.extname(`/secret-folder/${file.name}`).slice(1)} - ${(stats.size/1024).toFixed(3)} kb`)
            })
        }
    })
})

