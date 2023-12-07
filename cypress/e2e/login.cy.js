describe('Login', () => {
    it('should not login with unknown credentials', async () => {
        cy.visit('https://demo.evershop.io/account/login')

        cy.get('input[name=email]').type('lilboy.fr@gmail.com')
        cy.get('input[name=password]').type('12345678')

        cy.get('#loginForm button[type=submit]').click()
        cy.get('.login-form .text-critical').should('contain.html', 'Invalid email or password')
    })
})

