const fs = require('fs');

const getNumFilesFromFragments = (data, fileIndex = 0) => {
  let res = [];
  data.forEach((dir) => {
    const resObj = {
      fileName: dir.files[fileIndex].fullPath,
      data: {},
    };
    dir.files[fileIndex].data.map(obj => {
      if (resObj.data[obj.fragments]) {
        resObj.data[obj.fragments]++;
      } else {
        resObj.data[obj.fragments] = 1;
      }
    });
    res.push(resObj);
  });

  const str = res.map(r => {
    const fileName = `${r.fileName}\n`;
    const header = `Fragments;NumFiles\n`;
    let table = '';
    for (let key in r.data) {
      if (r.data.hasOwnProperty(key)) {
        table += `${key};${r.data[key]}\n`;
      }
    }
    const divider = `\n\n`;

    return fileName + header + table + divider;
  });
  const fileName = data[0].files[fileIndex].fileName;
  fs.writeFileSync(`./results/NumFilesFromFragments_${fileName}.csv`, str);
  return res;
};

const getNumFilesFromFragmentsAmount = (data, fileIndex = 0) => {
  let res = {
    fileName: 'Amount',
    data: {},
  };
  data.forEach((dir) => {
    dir.files[fileIndex].data.map(obj => {
      if (res.data[obj.fragments]) {
        res.data[obj.fragments]++;
      } else {
        res.data[obj.fragments] = 1;
      }
    });
  });

  const fileName = res.fileName;
  const header = `Fragments;NumFiles\n`;
  let table = '';
  for (let key in res.data) {
    if (res.data.hasOwnProperty(key)) {
      table += `${key};${res.data[key]}\n`;
    }
  }
  const divider = `\n\n`;

  const str = fileName + header + table + divider;
  fs.writeFileSync(`./results/NumFilesFromFragments_${fileName}.csv`, str);
  return res;
};

const getNumFilesFromFragmentsAverage = (data, fileIndex = 0) => {
  let res = {
    fileName: 'Average',
    data: {},
  };
  data.forEach((dir) => {
    dir.files[fileIndex].data.map(obj => {
      if (res.data[obj.fragments]) {
        res.data[obj.fragments]++;
      } else {
        res.data[obj.fragments] = 1;
      }
    });
  });

  for (let key in res.data) {
    if (res.data.hasOwnProperty(key)) {
      res.data[key] /= data.length;
    }
  }

  const fileName = res.fileName;
  const header = `Fragments;NumFiles\n`;
  let table = '';
  for (let key in res.data) {
    if (res.data.hasOwnProperty(key)) {
      table += `${key};${res.data[key]}\n`;
    }
  }
  const divider = `\n\n`;

  const str = fileName + header + table + divider;
  fs.writeFileSync(`./results/NumFilesFromFragments_${fileName}.csv`, str);
  return res;
};

module.exports = {
  getNumFilesFromFragments,
  getNumFilesFromFragmentsAmount,
  getNumFilesFromFragmentsAverage,
};

// fragments: c.childNodes[1].childNodes[0].rawText,
//   clusters: c.childNodes[3].childNodes[0].rawText,
//   size: c.childNodes[5].childNodes[0].rawText,
//   results: c.childNodes[7].childNodes[0].rawText,
//   fileName: c.childNodes[9].childNodes[0].rawText,