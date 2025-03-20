describe('Host Page Tests', () => {
  beforeEach(() => {
    cy.visit('/host');
  });

  it('should click on the settings button', () => {
    cy.get('button').contains('Settings').click();
  });

  it('should click on the settings button', () => {
    cy.get('button').contains('Create Game').click();
  });

});
