#!/usr/bin/env node

const program = require('commander');

program
  .arguments('<file>')
  .option('-s, --source <source>', 'The source data set from which we are consolidating')
  .option('-t, --target <target>', 'The target data set to which we are consolidating')
  .action(file => {
    if (typeof program.source === 'undefined') {
      console.error('No source data set provided.');
      process.exit(1);
    }
    if (typeof program.target === 'undefined') {
      console.error('No target data set provided.');
      process.exit(2);
    }
    console.log(`Consolidating ${file} from ${program.source} to ${program.target}`);
  })
  .parse(process.argv);
