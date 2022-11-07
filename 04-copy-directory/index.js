const fs = require('fs');
const path = require('path');
const pathDirectory = path.join(__dirname,'files');
const targetDirectory = path.join(__dirname, 'files-copy');
const fsPromises = fs.promises;

fsPromises.mkdir('04-copy-directory/files-copy').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});

fs.readdir(targetDirectory,(err,files) => {
    if (err) throw err;
    for(let file of files){
        fs.unlink(path.join(targetDirectory,file), err => {
            if(err) throw err;
        })
    }
})

fs.readdir(pathDirectory,
    {withFileTypes: true},
    (err, files) => {
        if (err) console.log(err);
        let arrCopied = [];
        files.forEach(file => {
            arrCopied.push(file.name);
        });
        arrCopied.forEach(file => {
            fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
                if (err) throw err;
            });
            console.log('File copied!')
        })
    }
)


