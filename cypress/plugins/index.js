const istanbul = require('istanbul-lib-coverage')
const instrument = require('istanbul-lib-instrument')
const i = instrument.createInstrumenter({ compact: false })

const { join, resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const WebSocket = require('ws')

// https://github.com/websockets/ws#simple-server
const wss = new WebSocket.Server({ port: 8765 })
wss.on('connection', function connection (ws) {
  console.log('new socket connection 🎉')

  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })

  ws.send('something')
})

module.exports = (on, config) => {
  let coverageMap = istanbul.createCoverageMap({})
  const nycFilename = join('.nyc_output', 'out.json')
  const sourceFolder = config.env.sourceFolder || 'src'
  console.log('support folder', sourceFolder)

  on('task', {
    instrument (filename) {
      const fullFilename = resolve(filename)
      console.log('instrumenting file %s', fullFilename)
      return i.instrumentSync(readFileSync(fullFilename, 'utf8'), fullFilename)
    },

    resetCoverage () {
      coverageMap = istanbul.createCoverageMap({})
      return null
    },

    coverage (coverage) {
      console.log('adding more coverage')
      // Object.keys(coverage).forEach(entry => {
      //   coverage[entry].path = join(sourceFolder, coverage[entry].path)
      // })
      coverageMap.merge(coverage)
      writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))
      return null
    }
  })
}
