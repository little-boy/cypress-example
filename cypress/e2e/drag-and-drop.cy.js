    describe('Drag and drop example', () => {
        it('should drag & drop a file', () => {
            const file_path = 'cypress/fixtures/screenshot.png'
            cy.visit('https://css-tricks.com/examples/DragAndDropFileUploading/?submit-on-demand')
            cy.get('form').selectFile(file_path, { action: 'drag-drop' })
            cy.get('button[type="submit"]').click()
            cy.get('.box__success').should('be.visible')
        })
    })