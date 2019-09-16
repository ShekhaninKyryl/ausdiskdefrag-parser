const {quality} = require("../constants/logic");
const getSpecificFragments = (fragments, otherNumber) => {
  let specificFragments = fragments / otherNumber;
  specificFragments = Math.floor(specificFragments * quality) / quality;
  return specificFragments.toString().replace('.', ',');
};

module.exports = {
  getSpecificFragments,
};