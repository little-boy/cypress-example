describe('Clock', function () {
    const clock_example_url = 'http://127.0.0.1:3005/'

    it.only('should show a banner when its 12am', () => {
        const now = new Date()
        now.setHours(12, 1)
        cy.clock(now)
        cy.visit(clock_example_url)
        cy.tick(100)

        cy.get('#special-banner-promo-code').should('be.visible')
    })
    it.only('should not show a banner when its 14:01', () => {

        cy.visit(clock_example_url)

        cy.get('#special-banner-promo-code').should('not.be.visible')
    })
});