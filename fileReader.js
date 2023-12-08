const fs = require('fs')
const folderPath = 'assets';

fs.readdir(folderPath,(err,files)=> {
    if (err){
        console.error('Error reading directory', err);
    } else {
        console.log('Content of the folder');
        files.forEach((file)=>{
            console.log(file)
        });
    }
} );


