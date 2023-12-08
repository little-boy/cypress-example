    describe('Drag and drop example', () => {
        it('should drag & drop a file', () => {
            cy.visit('https://css-tricks.com/examples/DragAndDropFileUploading/?submit-on-demand')

            cy.get('form')
                .selectFile('cypress/fixtures/screenshot.png', { action: 'drag-drop' })
             cy.get('button[type="submit"]').click()
            //
            cy.get('.box__success').should('be.visible')
        })
    })
