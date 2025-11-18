/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// Extend Cypress Chainable interface using module augmentation
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for API calls to complete
       * @example cy.waitForApi()
       */
      waitForApi(): Chainable<void>;
    }
  }
}

// Wait for API calls to complete by checking for loading states
Cypress.Commands.add('waitForApi', () => {
  // Wait for loading spinner to disappear
  cy.get('[data-testid="loading-spinner"]', { timeout: 15000 }).should('not.exist');
  // Or wait for data to appear
  cy.get('[data-testid="data-table"]', { timeout: 15000 }).should('be.visible');
});

export {};
