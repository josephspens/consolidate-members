# Consolidate Members
[![Build Status](https://travis-ci.org/josephspens/consolidate-members.svg?branch=master)](https://travis-ci.org/josephspens/consolidate-members)
[![Coverage Status](https://coveralls.io/repos/github/josephspens/consolidate-members/badge.svg?branch=master)](https://coveralls.io/github/josephspens/consolidate-members?branch=master)

Command line utility to pull data from various data sources used by Space Apps NYC to track membership, and compile them in one place.

## Usage

1. Export a TSV from Meetup to your computer
2. Install the program - (in bash) `git clone git@github.com:josephspens/consolidate-members.git`
3. Move into the program directory - `cd consolidate-members`
4. Install packages - `npm install`
5. Run the program - `node index.js -t meetup path/to/tsv/file`
6. Import the generated TSV file (located in the local `dist` directory) to MailChimp.

More options, sources, and target data sources to come.
