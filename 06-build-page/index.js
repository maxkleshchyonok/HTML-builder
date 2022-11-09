const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const readStream = fs.createReadStream(path.join(__dirname, 'template.html'));
const filePath = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'style.css');
let bundleArray = [];
let htmlString = '';

const pathDirectoryCopyFonts = path.join(__dirname,'assets', 'fonts');
const targetDirectoryCopyFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');

const pathDirectoryCopyImg = path.join(__dirname,'assets', 'img');
const targetDirectoryCopyImg = path.join(__dirname, 'project-dist', 'assets', 'img');

const pathDirectoryCopySvg = path.join(__dirname,'assets', 'svg');
const targetDirectoryCopySvg = path.join(__dirname, 'project-dist', 'assets', 'svg');

const pathForBundled = path.join(__dirname, 'project-dist', 'index.html');

fsPromises.mkdir('06-build-page/project-dist').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});

fs.writeFile(pathForBundled, '', function(error){
    if(error) throw error;
});
fs.writeFile(bundleFile, '', function(error){
    if(error) throw error;
})

fsPromises.mkdir('06-build-page/project-dist/assets').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});

fsPromises.mkdir('06-build-page/project-dist/assets/fonts').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});

fsPromises.mkdir('06-build-page/project-dist/assets/img').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});

fsPromises.mkdir('06-build-page/project-dist/assets/svg').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('Directory already exists');
});


readStream.on('data', (chunk) => {
    htmlString += chunk.toString();
    fs.readFile(path.join(__dirname, 'components', 'header.html'), 'utf-8', (err, data) => {
        let regex = /{{header}}/g;
        htmlString = htmlString.replace(regex, data);
        fs.readFile(path.join(__dirname, 'components', 'footer.html'), 'utf-8', (err, data) => {
            let regex = /{{footer}}/g;
            htmlString = htmlString.replace(regex, data);
            fs.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf-8', (err, data) => {
                let regex = /{{articles}}/g;
                htmlString = htmlString.replace(regex, data);
                fs.readFile(path.join(__dirname, 'components', 'about.html'), 'utf-8', (err, data) => {
                    let regex = /{{about}}/g;
                    htmlString = htmlString.replace(regex, data);
                    fs.appendFile(pathForBundled, htmlString, (err) => {
                        if(err) throw err;
                    })
                })
            })
        });
    });
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


fs.readdir(targetDirectoryCopyFonts,(err,files) => {
    if (err) throw err;
    for(let file of files){
        fs.unlink(path.join(targetDirectoryCopyFonts,file), err => {
            if(err) throw err;
        })
    }
})

fs.readdir(pathDirectoryCopyFonts,{withFileTypes: true}, (err, files) => {
        if (err) console.log(err);
        let arrCopied = [];
        files.forEach(file => {
            arrCopied.push(file.name);
        });
        arrCopied.forEach(file => {
            fs.copyFile(path.join(__dirname, 'assets', 'fonts', file), path.join(__dirname, 'project-dist', 'assets', 'fonts', file), (err) => {
                if (err) throw err;
            });
            console.log('File copied!')
        })
    }
)

fs.readdir(targetDirectoryCopyImg,(err,files) => {
    if (err) throw err;
    for(let file of files){
        fs.unlink(path.join(targetDirectoryCopyImg,file), err => {
            if(err) throw err;
        })
    }
})

fs.readdir(pathDirectoryCopyImg,{withFileTypes: true}, (err, files) => {
        if (err) console.log(err);
        let arrCopied = [];
        files.forEach(file => {
            arrCopied.push(file.name);
        });
        arrCopied.forEach(file => {
            fs.copyFile(path.join(__dirname, 'assets', 'img', file), path.join(__dirname, 'project-dist', 'assets', 'img', file), (err) => {
                if (err) throw err;
            });
            console.log('File copied!')
        })
    }
)

fs.readdir(targetDirectoryCopySvg,(err,files) => {
    if (err) throw err;
    for(let file of files){
        fs.unlink(path.join(targetDirectoryCopySvg,file), err => {
            if(err) throw err;
        })
    }
})

fs.readdir(pathDirectoryCopySvg,{withFileTypes: true}, (err, files) => {
        if (err) console.log(err);
        let arrCopied = [];
        files.forEach(file => {
            arrCopied.push(file.name);
        });
        arrCopied.forEach(file => {
            fs.copyFile(path.join(__dirname, 'assets', 'svg', file), path.join(__dirname, 'project-dist', 'assets', 'svg', file), (err) => {
                if (err) throw err;
            });
            console.log('File copied!')
        })
    }
)
