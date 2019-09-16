const fs = require('fs');
const parser = require('node-html-parser');

const parseHTML = (fileName) => {
  const fileData = fs.readFileSync(fileName, 'utf8');
  const table = parser.parse(fileData)
    .childNodes[0]
    .childNodes[10]
    .childNodes[5]
    .childNodes[9];
  return table.childNodes.map(c => {
    if (c.tagName === 'tr' && c.rawAttrs === '') {
      if (c.childNodes.length === 11) {
        return {
          fragments: c.childNodes[1].childNodes[0].rawText,
          clusters: c.childNodes[3].childNodes[0].rawText,
          size: c.childNodes[5].childNodes[0].rawText,
          results: c.childNodes[7].childNodes[0].rawText,
          fileName: c.childNodes[9].childNodes[0].rawText,
        }
      }
    }
  }).filter(d => !!d);
};

module.exports = {
  parseHTML,
};