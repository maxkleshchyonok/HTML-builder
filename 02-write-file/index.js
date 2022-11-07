const readline = require('readline');
const {stdin: input, stdout: output} = require('process');
const fs = require('fs');
const path = require('path');
let str = '';
const pathFile = path.join(__dirname, 'text.txt')


fs.writeFile(pathFile, '', function(error){
    if(error) throw error;
})

console.log('Enter new text: ');
process.on('SIGINT', () => {
    output.write('Goodbye!');
    process.exit();
})
process.stdin.on('data', data => {
    if(data.toString().includes('exit')){
        process.on('exit', () => {
            output.write('Goodbye!');
        });
        process.exit();
    }
    str = '' + data;
    fs.appendFile(pathFile, `${str}`, function (error) {
        if (error) throw error;
    });
})








