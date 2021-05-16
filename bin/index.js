#!/usr/bin/env node

const program = require('commander')

program.version(require('../package').version)

program.command('init <name>')
    .description('init project')
    .option('-s, --session', 'session param')
    .action(require('../lib/init'))


program.parse(process.argv);