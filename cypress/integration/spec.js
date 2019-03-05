// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

const ws = new WebSocket('ws://localhost:8765')

beforeEach(() => {
  expect(ws.readyState).to.equal(WebSocket.OPEN)
})

// ws.send('from Cypress')
// ws.on('message', function incoming (data) {
//   console.log(data)
// })

describe('battery test', () => {
  let instrumentedSrcIndex

  beforeEach(() => {
    // instrument src/index.js static resource
    cy.task('instrument', 'src/index.js').then(s => {
      instrumentedSrcIndex = s
    })
  })
  const instrumentIndexJs = () => {
    cy.server()
    cy.route({
      url: '/src/index.js',
      response: () => instrumentedSrcIndex
    })
  }

  it('shows battery status', function () {
    instrumentIndexJs()
    cy.visit('index.html')
    cy.get('.battery-percentage').should('be.visible')
  })

  context('navigator.battery', () => {
    it('shows battery status of 50%', function () {
      instrumentIndexJs()
      cy.visit('/', {
        onBeforeLoad (win) {
          win.navigator.battery = {
            level: 0.5,
            charging: false,
            addEventListener: () => {}
          }
        }
      })
      cy.get('.battery-percentage').should('be.visible')
    })
  })

  context('navigator.getBattery', () => {
    it('shows battery status of 75%', function () {
      instrumentIndexJs()
      cy.visit('/', {
        onBeforeLoad (win) {
          delete win.navigator.battery
          win.navigator.getBattery = cy
            .stub()
            .resolves({
              level: 0.75,
              charging: false,
              addEventListener: () => {}
            })
            .as('getBattery')
        }
      })
      cy.contains('.battery-percentage', '75%')
      cy.get('@getBattery').should('have.been.calledOnce')
    })
  })

  // // skipping because the app crashes when there is no battery set
  // context.skip('no battery', () => {
  //   it('does not crash', () => {
  //     cy.visit('/', {
  //       onBeforeLoad (win) {
  //         delete win.navigator.battery

  //         // how to delete navigator.getBattery method?
  //         // deleting does not work
  //         // delete win.navigator.getBattery

  //         // but we can just overwrite it with undefined!
  //         Object.defineProperty(win.navigator, 'getBattery', {
  //           value: undefined
  //         })
  //       }
  //     })
  //   })
  // })
})
