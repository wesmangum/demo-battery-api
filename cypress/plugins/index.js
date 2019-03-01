const istanbul = require('istanbul-lib-coverage')
const { join } = require('path')
const { writeFileSync } = require('fs')

module.exports = (on, config) => {
  let coverageMap = istanbul.createCoverageMap({})
  const nycFilename = join('.nyc_output', 'out.json')
  const sourceFolder = config.env.sourceFolder || 'src'
  console.log('support folder', sourceFolder)

  on('task', {
    resetCoverage () {
      coverageMap = istanbul.createCoverageMap({})
      return null
    },

    coverage (coverage) {
      console.log('adding more coverage')
      Object.keys(coverage).forEach(entry => {
        coverage[entry].path = join(sourceFolder, coverage[entry].path)
      })
      coverageMap.merge(coverage)
      writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))
      return null
    }
  })
}
