/// <reference types="cypress" />
before(() => {
  cy.task('resetCoverage', { isInteractive: Cypress.config('isInteractive') })
})

afterEach(() => {
  // save coverage after each test
  // because the entire "window" object is about
  // to be recycled by Cypress before next test
  cy.window().then(win => {
    if (win.__coverage__) {
      cy.task('combineCoverage', win.__coverage__)
    }
  })
})

after(() => {
  cy.task('coverageReport')
})
