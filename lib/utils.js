const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validDataSources = [
  'meetup',
  'mailchimp'
];

const checkDataSet = (name, dataSet) => {
  if (typeof name === 'undefined') {
    throw new Error('Need to specify the data set name.');
  }
  if (typeof dataSet === 'undefined') {
    throw new Error(`No ${name} data set provided.`);
  }
  if (!validDataSources.includes(dataSet)) {
    throw new Error(`The ${name} data set is unknown. Please choose one of the following: ${validDataSources.join(', ')}.`);
  }
};

module.exports = {
  emailRegex,
  validDataSources,
  checkDataSet
};
