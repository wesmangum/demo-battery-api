/// <reference types="cypress" />
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

before(() => {
  cy.task('resetCoverage')
})

Cypress.Commands.add('coverageReport', () => {
  const execCommand = 'npm run report:coverage'
  const link = 'coverage/index.html'
  Cypress.log({
    name: 'coverage report',
    message: link,
    consoleProps () {
      // would be nice to be able to put a nice link
      // that would open the report right in the browser
      return {
        command: execCommand,
        link
      }
    }
  })
  cy.exec('npm run report:coverage', { log: false })
})

afterEach(() => {
  cy.window().then(win => {
    if (win.__coverage__) {
      cy.task('coverage', win.__coverage__)
    }
  })
})

// after(() => {
// Cypress.log('coverage report')
// cy.coverageReport()
// })
