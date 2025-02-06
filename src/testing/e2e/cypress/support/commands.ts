Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid=email-input]').type(email);
  cy.get('[data-testid=password-input]').type(password);
  cy.get('[data-testid=login-button]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('assertToastMessage', (message: string) => {
  cy.get('[data-testid=toast]')
    .should('be.visible')
    .and('contain', message);
});

Cypress.Commands.add('waitForApi', (route: string) => {
  cy.intercept(route).as('apiCall');
  cy.wait('@apiCall');
});