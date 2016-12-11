const fs = require('fs');
const csv = require('fast-csv');
const { sanitizeOutput, emailHeader } = require('./utils');

const headers = [
  'Name',,,,
  'Location',,,,,,,,,,,,,,
  'URL of Member Profile',,,
  emailHeader
];

const options = {
  headers,
  discardUnmappedColumns: true,
  ignoreEmpty: true,
  delimiter: '\t'
};

let output = [];

module.exports = (file) => {
  console.log('Parsing meetup TSV...');
  const stream = fs.createReadStream(file);
  return new Promise((resolve, reject) => {
    try {
      csv
        .fromStream(stream, options)
        .on('data', output.push.bind(output))
        .on('end', () => {
          console.log('Finished parsing meetup TSV.');
          resolve(sanitizeOutput(output));
        });
    } catch (exception) {
      reject(exception.message);
    }
  });
};
