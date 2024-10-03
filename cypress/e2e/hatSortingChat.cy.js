describe('E2E Test for Hat Sorting Application', () => {
    beforeEach(() => {
        // Visit the application main page
        cy.visit('/chat');
    });

    it('allows the user to complete the quiz and shows the final answer', () => {
        // Step 1: Input the user name
        cy.get('.chat-button').click();
        cy.get('input[class="input-bar-input"]')
            .type('Ste')
            .type('{enter}')

        // Step 2: Start the quiz automatically (assumed to be triggered by entering the name)
        cy.get('.chat-window', {timeout: 10000})
            .should('contain', 'Ste');

        // Step 3: Start answering the quiz
        let totalQuestions = 28; // Total number of questions

        for (let i = 0; i < totalQuestions; i++) {
            // Wait for the question card to appear
            cy.get('.question-card', { timeout: 10000 }).should('be.visible').within(() => {
                cy.get('.answer-button').eq(0).click(); // Click the first answer
            });
        }

        // After selecting the last answer, check if the chat shows the final answer
        cy.get('.chat-window', { timeout: 10000 })
            .should('contain', 'That concludes the Sorting Hat Test!');
    });
});
