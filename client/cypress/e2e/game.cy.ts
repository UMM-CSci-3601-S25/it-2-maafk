describe('Game Page Tests', () => {
  beforeEach(() => {
    cy.visit('/game');
  });

  it('should click the button to submit a response', () => {
    cy.get('button').contains('Submit Prompt').click();
  });

  it('should display a prompt', () => {
    // Assuming the prompt text is "Sample Prompt"
    cy.get('mat-grid-tile').contains(' ______ is a slippery slope that leads to ______. ').should('be.visible');
  });
});
