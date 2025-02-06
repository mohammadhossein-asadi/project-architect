/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to login with email and password
     * @example cy.login('test@example.com', 'password123')
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Custom command to assert toast message
     * @example cy.assertToastMessage('Successfully saved')
     */
    assertToastMessage(message: string): Chainable<void>;

    /**
     * Custom command to wait for API request to complete
     * @example cy.waitForApi('/api/users')
     */
    waitForApi(route: string): Chainable<void>;
  }
}