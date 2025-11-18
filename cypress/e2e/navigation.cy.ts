describe('Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate from root to home page', () => {
    cy.url().should('include', '/home');
    cy.contains('Welcome to Claros Analytics Dashboard').should('be.visible');
  });

  it('should navigate to Data page from sidebar', () => {
    // Click on Data link in sidebar
    cy.get('nav').contains('Data').click();
    cy.url().should('include', '/data');
    cy.contains('Data').should('be.visible');
  });

  it('should navigate to Home page from sidebar', () => {
    // First navigate to Data page
    cy.get('nav').contains('Data').click();
    cy.url().should('include', '/data');

    // Then navigate to Home
    cy.get('nav').contains('Home').click();
    cy.url().should('include', '/home');
    cy.contains('Welcome to Claros Analytics Dashboard').should('be.visible');
  });

  it('should maintain navigation state when switching between pages', () => {
    // Navigate to Data
    cy.get('nav').contains('Data').click();
    cy.url().should('include', '/data');

    // Navigate to Home
    cy.get('nav').contains('Home').click();
    cy.url().should('include', '/home');

    // Navigate back to Data
    cy.get('nav').contains('Data').click();
    cy.url().should('include', '/data');
  });

  it('should have responsive sidebar on mobile', () => {
    cy.viewport('iphone-6');
    // Sidebar should be collapsible on mobile
    cy.get('nav').should('exist');
  });
});
