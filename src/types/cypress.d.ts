/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    assertToastMessage(message: string): Chainable<void>;
    waitForApi(route: string): Chainable<void>;
  }
}