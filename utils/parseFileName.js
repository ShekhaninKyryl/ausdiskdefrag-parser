const {undefinedFileType, typeOfFileMaxLength} = require("../constants/logic");

const parseFileName = (fileName) => {
  const splittedFileName = fileName.split('.');
  let type = splittedFileName[splittedFileName.length - 1];
  if (type.length > typeOfFileMaxLength) {
    type = undefinedFileType;
  }
  return type.toLocaleUpperCase();
};

module.exports = {
  parseFileName
};