const istanbul = require('istanbul-lib-coverage')
const { join } = require('path')
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs')
const execa = require('execa')

module.exports = (on, config) => {
  // let coverageMap = istanbul.createCoverageMap({})
  const outputFolder = '.nyc_output'
  const nycFilename = join(process.cwd(), outputFolder, 'out.json')

  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder)
    console.log('created folder %s for output coverage', outputFolder)
  }

  on('task', {
    /**
     * Clears accumulated code coverage information
     */
    resetCoverage () {
      console.log('reset code coverage')
      const coverageMap = istanbul.createCoverageMap({})
      writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))

      return null
    },

    /**
     * Combines coverage information from single test
     * with previously collected coverage.
     */
    combineCoverage (coverage) {
      const previous = JSON.parse(readFileSync(nycFilename))
      const coverageMap = istanbul.createCoverageMap(previous)
      coverageMap.merge(coverage)
      writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))
      console.log('wrote coverage file %s', nycFilename)

      return null
    },

    /**
     * Saves coverage information as a JSON file and calls
     * NPM script to generate HTML report
     */
    coverageReport () {
      // writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))
      // console.log('wrote coverage file %s', nycFilename)
      console.log('saving coverage report')
      return execa('npm', ['run', 'report:coverage'], { stdio: 'inherit' })
    }
  })
}
