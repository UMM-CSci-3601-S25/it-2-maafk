describe('Player End-to-End Tests', () => {
  beforeEach(() => {
    cy.visit('/player');
  });

  it('should display the player page title', () => {
    cy.get('mat-card-header').contains('Join the Game');
  });

  it('should have a button to join a game', () => {
    cy.get('button').contains('Join').should('be.visible');
  });

  it('should go back to the home page when the button is clicked', () => {
    cy.get('button').contains('subdirectory_arrow_left').click();
  });


});
