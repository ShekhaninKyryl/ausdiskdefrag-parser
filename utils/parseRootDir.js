const fs = require('fs');

const parseRootDir = (rootDirName) => {
  const dirNames = fs.readdirSync(rootDirName);
  const data = new Array(dirNames.length);
  dirNames.forEach((subDirName, indexDir) => {
    const fileNames = fs.readdirSync(`${rootDirName}/${subDirName}`);
    data[indexDir] = {
      dir: subDirName,
      files: new Array(fileNames)
    };
    fileNames.forEach((fileName, indexFile) => {
      data[indexDir].files[indexFile] = {
        fullPath: `${rootDirName}/${subDirName}/${fileName}`,
        fileName: fileName,
      }
    })
  });
  return data;
};

module.exports = {
  parseRootDir,
};