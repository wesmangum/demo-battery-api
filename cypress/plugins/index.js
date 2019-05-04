const istanbul = require('istanbul-lib-coverage')
const { join } = require('path')
const { existsSync, mkdirSync, writeFileSync } = require('fs')

module.exports = (on, config) => {
  let coverageMap = istanbul.createCoverageMap({})
  const outputFolder = '.nyc_output'
  const nycFilename = join(outputFolder, 'out.json')

  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder)
    console.log('created folder %s for output coverage', outputFolder)
  }

  on('task', {
    /**
     * Clears accumulated code coverage information
     */
    resetCoverage () {
      coverageMap = istanbul.createCoverageMap({})
      console.log('reset code coverage')
      return null
    },

    /**
     * Writes combined coverage JSON file
     */
    coverage (coverage) {
      coverageMap.merge(coverage)
      writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))
      console.log('wrote coverage file %s', nycFilename)
      return null
    }
  })
}
