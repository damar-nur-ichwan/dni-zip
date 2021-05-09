const AdmZip = require('adm-zip');
const file = new AdmZip();
const fs = require('fs')

function Zip(InputPath,OutputPath){
    for(let i = 0; i<InputPath.length;i++){
        if(InputPath[i].includes('.')){
            file.addLocalFile(InputPath[i]);
        } else {
            const convertPath = JSON.parse(JSON.stringify(InputPath[i]).replace(/\\\\/g,'/'))
            let folderName = convertPath.split('/')
            folderName = folderName[folderName.length-1]
            file.addLocalFolder(InputPath[i], folderName);
        }
    }
    fs.writeFileSync(OutputPath, file.toBuffer());
    file.writeZip(OutputPath);
}
module.exports = Zip


// const path = require('path')
// const AllFiles = require('../../../AllFiles')
// Zip([path.join(AllFiles,'3400000004_00620548_11855841.pdf')],path.join(__dirname,'example.zip'))
