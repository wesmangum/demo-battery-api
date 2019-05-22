/* eslint-disable no-undef */
const browserify = require('@cypress/browserify-preprocessor')

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // eslint-disable-next-line global-require
  on('task', require('cypress-istanbul/task'))

  // tell Cypress to use .babelrc when bundling spec code
  const options = browserify.defaultOptions
  options.browserifyOptions.transform[1][1].babelrc = true
  on('file:preprocessor', browserify(options))
}
