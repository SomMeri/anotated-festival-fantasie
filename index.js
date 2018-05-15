'use strict';
/**
 * Require dependencies
 *
 */
const program = require('commander'),
    chalk = require("chalk"),
    exec = require('child_process').exec,
    pkg = require('./package.json');

const phase_one = require("./src/all-in-one.js");
const phase_two = require("./src/modifications.js");

/**
 * list function definition
 *
 */
let list = (directory,options)  => {
    console.log('list');
};


program
    .version(pkg.version)
    .command('list [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long','Long list format')
    .action(list);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) {
    program.help();
}

phase_one.buildBody("data", "output\\append-1.txt")
    .then(data => phase_two.processBody("output\\append-1.txt", "output\\append.txt"))
    .then(cata => phase_one.createFinalHtm("output\\append.txt"));    
