const fs = require('fs');
const csv = require('fast-csv');
const { sanitizeOutput, emailHeader, options } = require('./utils');

let output = [];

module.exports = (filename, callback) => {
  const stream = fs.createReadStream(filename);

  console.log('Parsing meetup CSV...');
  const csvStream = csv(options)
    .on('data', output.push.bind(output))
    .on('end', () => {
      console.log('Finished parsing meetup CSV.');
      callback(sanitizeOutput(output));
    });

  stream.pipe(csvStream);
};
