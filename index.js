#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');

const parseMeetup = require('./lib/meetup/parse');
const writeMeetup = require('./lib/meetup/write');
const { checkDataSet } = require('./lib/utils');

program
  .arguments('<input> <output>')
  .option('-s, --source <source>', 'The source data set from which we are consolidating')
  .option('-t, --target <target>', 'The target data set to which we are consolidating')
  .action((input, output) => {
    try {
      checkDataSet('source', program.source);
      checkDataSet('target', program.target);
    } catch (exception) {
      console.error(exception.message);
      process.exit(1);
    }

    console.log(`Consolidating from ${program.source} file ${input} to ${program.target} file ${output}`);

    let sourceProcess;
    let targetProcess;

    switch (program.source) {
      case 'meetup':
        sourceProcess = parseMeetup;
        break;
      case 'mailchimp':
        sourceProcess = parseMeetup;
        break;
    }

    switch (program.target) {
      case 'meetup':
        targetProcess = writeMeetup;
        break;
      case 'mailchimp':
        targetProcess = writeMeetup;
        break;
    }

    sourceProcess(input, targetProcess(output));
  })
  .parse(process.argv);
