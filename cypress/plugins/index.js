// const browserify = require('@cypress/browserify-preprocessor')
// const istanbul = require('browserify-istanbul')
const istanbul = require('istanbul-lib-coverage')
const { join } = require('path')
const { writeFileSync } = require('fs')

module.exports = on => {
  coverageMap = istanbul.createCoverageMap({})
  const nycFilename = join('.nyc_output', 'out.json')

  on('task', {
    coverage (coverage) {
      console.log('adding more coverage')
      coverageMap.merge(coverage)
      writeFileSync(nycFilename, JSON.stringify(coverageMap, null, 2))
      return null
    }
  })
  // const options = {
  //   browserifyOptions: {
  //     transform: [istanbul]
  //   }
  // }
  // on('file:preprocessor', browserify(options))
}
