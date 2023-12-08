describe('Viewport example', () => {
  it('should display a banner on a mobile configuration (screen witdh <= 480px)', () => {
    cy.visit('http://localhost:3005')
    cy.viewport(480, 800)

    cy.get('#mobile-banner').should('be.visible')
  })
  it('should not display a banner on a screen > 480px', () => {
    cy.visit('http://localhost:3005')
    cy.viewport(481, 800)

    cy.get('#mobile-banner').should('not.be.visible')
  })
})