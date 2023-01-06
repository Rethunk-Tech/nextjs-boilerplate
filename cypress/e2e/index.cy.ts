// index.spec.ts
//
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Index', () => {
  it('should render welcome message', () => {
    // Start from the index page
    cy.visit('/')

    // The page should contain an h4 with start instructions
    cy.get('h4').contains('Get started by editing pages/index.tsx')
  })
})

// tslint: isolated modules
export { }
