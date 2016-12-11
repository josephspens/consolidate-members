const fs = require('fs');
const path = require('path');

const headers = [
  'First Name',
  'Last Name',
  'Email',
  'Location',
  'URL of Member Profile'
]

const writeData = (data) => {
  const outputPath = path.resolve(__dirname, '../../dist');
  const outputFile = path.resolve(outputPath, 'meetup.tsv');
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
  fs.writeFileSync(outputFile, data);
};

const reduceTSVRow = (row) => (columnMemo, column) => {
  const value = typeof row[column] !== 'undefined' ? row[column] : '';
  return `${columnMemo}${value}\t`;
};

const reduceTSV = (headers) => (rowMemo, row) => {
  const column = headers.reduce(reduceTSVRow(row), '');
  return `${rowMemo}${column}\n`;
};

const convertToTSV = (data) => {
  const reducedHeaders = headers.reduce((memo, column) => `${memo}${column}\t`, '');
  return data.reduce(reduceTSV(headers), `${reducedHeaders}\n`);
};

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    const tsv = convertToTSV(data);
    writeData(tsv);
    resolve(tsv);
  });
}
