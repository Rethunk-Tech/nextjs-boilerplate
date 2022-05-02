// index.spec.ts
//
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Index', () => {
  it('should render welcome message', () => {
    // Start from the index page
    cy.visit('/')

    // The page should contain an h1 with "Welcome to Next.js!"
    cy.get('h1').contains('Welcome to Next.js!')
  })
})
