const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const zip = new AdmZip();

const files = ['manifest.json', 'popup.html', 'popup.css', 'styles.css'];
const folders = ['dist', 'icons', 'lib', 'models'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    zip.addLocalFile(file);
  }
});

folders.forEach(folder => {
  if (fs.existsSync(folder)) {
    zip.addLocalFolder(folder, folder);
  }
});

const outputPath = path.join(__dirname, '..', 'LLT-Extension-v1.1.zip');
zip.writeZip(outputPath);
console.log('Successfully generated Firefox & Chrome compliant LLT-Extension-v1.1.zip');
