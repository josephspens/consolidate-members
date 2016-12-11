#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');

const parseMeetup = require('./lib/meetup/parse');
const writeMeetup = require('./lib/meetup/write');
const { checkDataSet } = require('./lib/utils');

program
  .arguments('<input>')
  .option('-t, --target <target>', 'The target data set to which we are consolidating')
  .action((input) => {
    try {
      checkDataSet('target', program.target);
    } catch (exception) {
      console.error(exception.message);
      process.exit(1);
    }

    console.log(`Consolidating ${input} for ${program.target}`);
    if (program.target === 'meetup') {
      parseMeetup(input).then(writeMeetup);
    }
  })
  .parse(process.argv);
