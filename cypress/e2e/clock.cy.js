describe('Clock', function () {
    it.only('should show a banner when its 12am', () => {
        cy.visit('http://127.0.0.1:3005/')
        // https://docs.cypress.io/api/commands/tick
        cy.tick()
    })
});