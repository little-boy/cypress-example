describe('Cart flow', () => {
    const baseUrl = 'https://demo.evershop.io'

    // workaround
    it('should reset the cart', () => {
        cy.intercept('/customer/login').as('login')
        cy.visit(`${baseUrl}/account/login`)
        cy.get('input[name="email"]').type('test@test.fr')
        cy.get('input[name="password"]').type('12345678')
        cy.get('button[type="submit"]').click()

        cy.wait('@login')

        // may fail when cart is empty
        cy.visit(`${baseUrl}/cart`)
        cy.get('.cart-tem-info a').contains('Remove').click()
    })

    it('Should do EVERYTHING', () => {
        // se logguer
        cy.intercept('/customer/login').as('login')
        cy.visit(`${baseUrl}/account/login`)
        cy.get('input[name="email"]').type('test@test.fr')
        cy.get('input[name="password"]').type('12345678')
        cy.get('button[type="submit"]').click()
        cy.wait('@login')

        // aller à la caté des femmes
        cy.visit(`${baseUrl}/women`)
        // cliquer sur le premier produit de la liste
        cy.get('.product-thumbnail-listing a').first().click()
        //
        cy.intercept('/women/alphaboost-shoes-20*').as('selectOption')
        // retrieve price from product
        cy.get('.sale-price').invoke('text').then(product_price => {
            cy.get('.variant-option-list a').contains('L').click()
            cy.wait('@selectOption')
            cy.get('.variant-option-list a').contains('Blue').click()
            cy.wait('@selectOption')

            cy.intercept('/api/cart/mine/items').as('addToCart')
            cy.get('.add-to-cart button').click()
            cy.wait('@addToCart')

            cy.get('.add-cart-popup-button').click()

            cy.intercept('/checkout?ajax=true').as('loadingCheckout')
            cy.intercept('/api/shippingMethods/**').as('getShippingMethods')
            cy.intercept('/api/paymentMethods*').as('getPaymentMethods')
            cy.get('.shopping-cart-checkout-btn a').click()
            cy.wait('@loadingCheckout')

            cy.get('input[name="address[full_name]"]').type('John Doe')
            cy.get('input[name="address[telephone]"]').type('123456')
            cy.get('input[name="address[address_1]"]').type('John Doe home')
            cy.get('input[name="address[city]"]').type('John Doe city')
            cy.get('input[name="address[postcode]"]').type('1111')
            cy.get('select[name="address[country]"]').select('US')
            cy.get('select[name="address[province]"]').select('US-AL')
            cy.wait('@getShippingMethods')
        //
            cy.get('.shipping-methods label').first().click()
            cy.get('.form-submit-button button').click()
        //

            cy.intercept('/checkout?ajax=true').as('checkout')
            cy.intercept('https://m.stripe.com/6').as('stripeCall')

            cy.wait('@getPaymentMethods')
            cy.wait('@checkout')
            // cy.wait('@stripeCall')
            cy.get('.payment-method-list a').first().click()

            cy.intercept('POST', '/api/carts/*/paymentMethods').as('cartValidation')
            cy.get('.form-submit-button button').click()
            cy.wait('@cartValidation')
        //
            const removeDollar = (value) => {
                return value.replace('$', '')
            }

            // const product_price_with_delivery_formatted
            cy.get('.grand-total-value')
                .first()
                .invoke('text')
                .then((cart_total) => {
                    cart_total = parseFloat(removeDollar(cart_total))
                    let product_price_with_delivery_cost = parseFloat(removeDollar(product_price))
                    product_price_with_delivery_cost += 5

                    expect(cart_total).to.eql(product_price_with_delivery_cost)
                })

            cy.contains('Checkout success')
        })

    })
})