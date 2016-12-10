const { emailRegex } = require('../utils');

const emailHeader = 'If you have not previously attended a Space Apps event, please confirm your email here, otherwise just enter "NA" (we only ask for your email to infrequently send messages related to Space Apps NYC; we will respect your privacy and never send spam):';

const headers = [
  'Name',,,,
  'Location',,,,,,,,,,,,,,,,,
  emailHeader
];

const options = {
  headers,
  discardUnmappedColumns: true,
  ignoreEmpty: true,
  delimiter: '\t'
};

const renameEmailProperty = (row = {}) => {
  const email = row[emailHeader];
  if (email) {
    const sanitizedEmail = emailRegex.exec(email);
    if (sanitizedEmail && sanitizedEmail.length) {
      row['Email'] = sanitizedEmail[0];
    }
    delete row[emailHeader];
  }
  return row;
};

const nonEmptyEmails = (row = {}) => row.hasOwnProperty('Email');

const splitName = (row = {}) => {
  const name = row['Name'];
  if (name) {
    const names = name.split(' ');
    if (names.length > 1) {
      row['Last Name'] = names.pop();
      row['First Name'] = names.join(' ');
    } else {
      row['First Name'] = names.pop();
    }
    delete row['Name'];
  }
  return row;
};

const sanitizeOutput = (output = []) => {
  return output
    .slice(1)
    .map(splitName)
    .map(renameEmailProperty)
    .filter(nonEmptyEmails);
};

module.exports = {
  renameEmailProperty,
  nonEmptyEmails,
  splitName,
  sanitizeOutput,
  emailHeader,
  options
};
