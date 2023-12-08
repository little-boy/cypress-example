describe.skip('Clock', function () {
    const clock_example_url = 'http://127.0.0.1:3005/'

    Cypress.Commands.add('setHour', (hours, minutes) => {
        const now = new Date()
        now.setHours(parseInt(hours, 10), parseInt(minutes, 10))
        cy.clock(now)
    })
    // la banniere devrait s'afficher entre 12 et 14h
    it.only('should show a banner when its 12am', () => {
        cy.setHour(12, 1)

        cy.visit(clock_example_url)
        // https://docs.cypress.io/api/commands/tick
        cy.tick(100)

        cy.get('#special-banner-promo-code').should('be.visible')
        cy.get('#special-banner-promo-code img').should('be.visible')
        cy.get('#special-banner-promo-code #promo-code').should('contain', 'BIGTASTYBURGER2023')
    })

    // la banniere ne devrait pas s'afficher à 14h01
    it('should not show a banner when it\'s 2:01pm', () => {
        cy.setHour(14, 1)

        cy.visit(clock_example_url)
        cy.tick(100)

        cy.get('#special-banner-promo-code').should('not.be.visible')
    })
});