import { Player } from 'src/app/players/player';

export class PlayerPage {

  private readonly url = '/player';
  private readonly button = '[data-test="joinButton"]';
  private readonly PlayerName = 'name';
  private readonly formFieldSelector = 'mat-form-field';
  private readonly dropDownSelector = 'mat-option';

  navigateTo() {
    return cy.visit(this.url);
  }

  addPlayerButton() {
    return cy.get(this.button);
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    // Find and click the drop down
    return select.click()
      // Select and click the desired value from the resulting menu
      .get(`${this.dropDownSelector}[value="${value}"]`).click();
  }

  getFormField(fieldName: string) {
    return cy.get(`${this.formFieldSelector} [formcontrolname=${fieldName}]`);
  }

  addPlayer(newPlayer: Player) {
    this.getFormField('name').type(newPlayer.name);
    return this.addPlayerButton().click();
  }
}
