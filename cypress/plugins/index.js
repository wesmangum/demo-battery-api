const browserify = require('@cypress/browserify-preprocessor')
const istanbul = require('browserify-istanbul')

module.exports = on => {
  const options = {
    browserifyOptions: {
      transform: [istanbul]
    }
  }
  on('file:preprocessor', browserify(options))
}
