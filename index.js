const {parseRootDir} = require('./utils/parseRootDir');
const {parseHTML} = require('./utils/parseHTML');
const {
  getNumFilesFromFragments,
  getNumFilesFromFragmentsAmount,
  getNumFilesFromFragmentsAverage
} = require('./logic/getNumFilesFromFragments');
const {
  getNumFilesFromSpecificFragments,
  getNumFilesFromSpecificFragmentsAmount,
  getNumFilesFromSpecificFragmentsAverage
} = require("./logic/getNumFilesFromSpecificFragments");
const {getNumFragmentsFromTypeOfFile} = require("./logic/getNumFragmentsFromTypeOfFile");
const {rootDirName} = require('./constants/fileNames');
const {typeOfResults} = require("./constants/logic");

const data = parseRootDir(rootDirName);
data.forEach((d, dirIndex) => {
  d.files.forEach((f, fileIndex) => {
    f.data = parseHTML(f.fullPath);
  })
});

getNumFragmentsFromTypeOfFile(data, 1, typeOfResults.min);
getNumFragmentsFromTypeOfFile(data, 1, typeOfResults.avg);
getNumFragmentsFromTypeOfFile(data, 1, typeOfResults.max);
getNumFragmentsFromTypeOfFile(data, 1, typeOfResults.numF);