describe.skip('Clock', function () {
    it('should show a banner when its 12am', () => {
        // arrange
        const now = new Date()
        now.setHours(12, 1)
        cy.clock(now)

        // act
        cy.visit('http://localhost:3005/')
        cy.tick(100)

        // assert
        cy.get('#special-banner-promo-code').should('be.visible')
    })
    it('should show a banner when its 1:59pm', () => {
        // arrange
        const now = new Date()
        now.setHours(13, 59)
        cy.clock(now)

        // act
        cy.visit('http://localhost:3005/')
        cy.tick(100)

        // assert
        cy.get('#special-banner-promo-code').should('be.visible')
    })

    it('should not show a banner when it\'s 2:01pm', () => {
        // arrange
        const now = new Date()
        now.setHours(14, 1)
        cy.clock(now)

        // act
        cy.visit('http://localhost:3005/')
        cy.tick(100)

        // assert
        cy.get('#special-banner-promo-code').should('not.be.visible')
    })
});