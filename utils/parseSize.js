const {clusterSize} = require("../constants/logic");
const parseSize = (stringSize) => {
  const parsedSize = stringSize.split(' ');
  let factor = 1;
  switch (parsedSize[1]) {
    case 'KB': {
      factor = 1000;
      break;
    }
    case 'MB': {
      factor = 1000000;
      break;
    }
    default:
      factor = 1;
  }
  let size = +parsedSize[0].replace(',', '.') * factor;
  return Math.ceil(size / clusterSize);
};

module.exports = {
  parseSize,
};