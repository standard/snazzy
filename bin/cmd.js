#!/usr/bin/env node

var CompactToStylishStream = require('../')
var minimist = require('minimist')

var argv = minimist(process.argv.slice(2), {
  boolean: [
    'stdin'
  ]
})

if (!process.stdin.isTTY || argv._[0] === '-' || argv.stdin) {
  var snazzy = new CompactToStylishStream()

  // Set the process exit code based on whether snazzy found errors
  process.on('exit', function (code) {
    if (code === 0 && snazzy.exitCode !== 0) {
      process.exitCode = snazzy.exitCode
    }
  })

  process.stdin.pipe(snazzy).pipe(process.stdout)
} else {
  console.error(`
snazzy: 'standard' is no longer bundled with 'snazzy'. Install standard
snazzy: ('npm install standard') then run 'standard | snazzy' instead.
  `)
  process.exitCode = 1
}
