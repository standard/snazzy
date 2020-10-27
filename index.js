/*! snazzy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
const chalk = require('chalk')
const standardJson = require('standard-json')
const stream = require('readable-stream')
const stripAnsi = require('strip-ansi')
const table = require('text-table')

class CompactToStylishStream extends stream.Transform {
  constructor (opts) {
    super(opts)

    this.exitCode = 0
    this._buffer = []
  }

  _transform (chunk, encoding, cb) {
    this._buffer.push(chunk)
    cb(null)
  }

  _flush (cb) {
    const lines = Buffer.concat(this._buffer).toString()
    const jsonResults = standardJson(lines, { noisey: true })
    const output = processResults(jsonResults)
    this.push(output)

    this.exitCode = output === '' ? 0 : 1
    cb(null)
  }
}

/**
 * Given a word and a count, append an s if count is not one.
 * @param {string} word A word in its singular form.
 * @param {int} count A number controlling whether word should be pluralized.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize (word, count) {
  return (count === 1 ? word : word + 's')
}

function processResults (results) {
  let output = '\n'
  let total = 0

  results.forEach(function (result) {
    const messages = result.messages

    if (messages.length === 0) {
      return
    }

    total += messages.length
    output += chalk.underline(result.filePath) + '\n'

    output += table(
      messages.map(function (message) {
        const messageType = chalk.red('error')

        return [
          '',
          message.line || 0,
          message.column || 0,
          messageType,
          message.message.replace(/\.$/, ''),
          chalk.dim(message.ruleId || '')
        ]
      }),
      {
        align: ['', 'r', 'l'],
        stringLength: function (str) {
          return stripAnsi(str).length
        }
      }
    ).split('\n').map(function (el) {
      return el.replace(/(\d+)\s+(\d+)/, function (m, p1, p2) {
        return chalk.dim(p1 + ':' + p2)
      })
    }).join('\n') + '\n\n'
  })

  if (total > 0) {
    output += chalk.red.bold([
      '\u2716 ', total, pluralize(' problem', total), '\n'
    ].join(''))
  }

  return total > 0 ? output : ''
}

module.exports = CompactToStylishStream
