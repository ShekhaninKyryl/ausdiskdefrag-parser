const {parseRootDir} = require('./utils/parseRootDir');
const {parseHTML} = require('./utils/parseHTML');
const {rootDirName} = require('./constants/fileNames');

const data = parseRootDir(rootDirName);
data.forEach((d, dirIndex) => {
  d.files.forEach((f, fileIndex) => {
    f.data = parseHTML(f.fullPath);
  })
});

console.log(1);