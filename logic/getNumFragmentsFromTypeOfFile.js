const fs = require('fs');
const {typeOfResults} = require("../constants/logic");
const {parseFileName} = require("../utils/parseFileName");

const getNumFragmentsFromTypeOfFile = (data, fileIndex = 0, option = typeOfResults.avg) => {
  let res = {
    fileName: option.toLocaleUpperCase(),
    data: {},
    fileType: {},
  };

  switch (option) {
    case typeOfResults.avg: {
      data.forEach((dir) => {
        dir.files[fileIndex].data.map(obj => {
          let type = parseFileName(obj.fileName);
          if (res.fileType[type]) {
            res.fileType[type]++;
            res.data[type] += +obj.fragments;
          } else {
            res.fileType[type] = 1;
            res.data[type] = +obj.fragments;
          }
        });
      });

      for (let key in res.fileType) {
        if (res.fileType.hasOwnProperty(key)) {
          res.data[key] /= res.fileType[key];
          res.data[key] = res.data[key].toString().replace('.', ',');
        }
      }
      break;
    }
    case typeOfResults.min: {
      data.forEach((dir) => {
        dir.files[fileIndex].data.map(obj => {
          let type = parseFileName(obj.fileName);
          if (res.fileType[type]) {
            res.fileType[type]++;
            if (res.data[type] > +obj.fragments) {
              res.data[type] = +obj.fragments;
            }
          } else {
            res.fileType[type] = 1;
            res.data[type] = +obj.fragments;
          }
        });
      });
      for (let key in res.fileType) {
        if (res.fileType.hasOwnProperty(key)) {
          res.data[key] = res.data[key].toString().replace('.', ',');
        }
      }
      break;
    }
    case typeOfResults.max: {
      data.forEach((dir) => {
        dir.files[fileIndex].data.map(obj => {
          let type = parseFileName(obj.fileName);
          if (res.fileType[type]) {
            res.fileType[type]++;
            if (res.data[type] < +obj.fragments) {
              res.data[type] = +obj.fragments;
            }
          } else {
            res.fileType[type] = 1;
            res.data[type] = +obj.fragments;
          }
        });
      });
      for (let key in res.fileType) {
        if (res.fileType.hasOwnProperty(key)) {
          res.data[key] = res.data[key].toString().replace('.', ',');
        }
      }
      break;
    }
    case typeOfResults.numF: {
      data.forEach((dir) => {
        dir.files[fileIndex].data.map(obj => {
          let type = parseFileName(obj.fileName);
          if (res.fileType[type]) {
            res.fileType[type]++;
          } else {
            res.fileType[type] = 1;
          }
        });
      });
      for (let key in res.fileType) {
        if (res.fileType.hasOwnProperty(key)) {
          res.data[key] = res.fileType[key].toString().replace('.', ',');
        }
      }
      break;
    }
    default: {
      console.warn('Error option: ', option);
      return;
    }
  }

  const fileName = res.fileName;
  const header = `TypeOfFile;Fragments\n`;
  let table = '';
  for (let key in res.data) {
    if (res.data.hasOwnProperty(key)) {
      table += `${key};${res.data[key]}\n`;
    }
  }
  const divider = `\n\n`;

  const str = fileName + header + table + divider;
  fs.writeFileSync(`./results/getNumFragmentsFromTypeOfFile_${fileName}.csv`, str);
  return res;
};


module.exports = {
  getNumFragmentsFromTypeOfFile
};