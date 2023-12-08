describe('Each', () => {
    it('apply assert on each elements', () => {
        cy.visit('https://demo.evershop.io/women')
        cy.get('.listing-tem .sale-price').each($el => {
            cy.get($el).invoke('text').should('match', /\$\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/)
        })
    })
})
