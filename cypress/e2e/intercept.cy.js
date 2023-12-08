describe('Intercept example', () => {
    it('should replace stuff inside top charts list', () => {
        // https://raga.vkdbois.xyz/api/topcharts
        cy.intercept('https://raga.vkdbois.xyz/api/topcharts', (req) => {
            req.continue((res) => {
                const results = res.body.results
                results[0].image = ''
                res.send({ results  })
            })
        })
        // https://raga.vkdbois.xyz/topcharts
        cy.visit('https://raga.vkdbois.xyz')
        cy.get('a[href="/topcharts"]').click()
    })
})