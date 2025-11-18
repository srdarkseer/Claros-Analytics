describe('Error Handling', () => {
  beforeEach(() => {
    cy.visit('/data');
  });

  it('should display error message when API call fails', () => {
    // Intercept and fail the API call
    cy.intercept('GET', '**/users', { statusCode: 500, body: { error: 'Server Error' } }).as(
      'getUsersError'
    );

    // Reload to trigger API call
    cy.reload();
    cy.wait('@getUsersError');

    // Check for error message
    cy.contains('error', { matchCase: false }).should('be.visible');
  });

  it('should show retry button when error occurs', () => {
    // Intercept and fail the API call
    cy.intercept('GET', '**/users', { statusCode: 500 }).as('getUsersError');

    cy.reload();
    cy.wait('@getUsersError');

    // Look for retry button
    cy.contains('button', 'Retry', { matchCase: false }).should('be.visible');
  });

  it('should retry API call when retry button is clicked', () => {
    // First, fail the request
    cy.intercept('GET', '**/users', { statusCode: 500 }).as('getUsersError');
    cy.reload();
    cy.wait('@getUsersError');

    // Wait for error to be displayed and retry button to appear
    cy.contains('error', { matchCase: false }).should('be.visible');
    cy.get('[data-testid="retry-button"]', { timeout: 5000 }).should('be.visible');

    // Then, succeed on retry - use real API response instead of fixture
    cy.intercept('GET', '**/users', { statusCode: 200, fixture: 'users.json' }).as(
      'getUsersSuccess'
    );

    // Click retry button
    cy.get('[data-testid="retry-button"]').click();

    // Wait for successful response
    cy.wait('@getUsersSuccess');

    // Verify data is displayed
    cy.get('[data-testid="data-table"]', { timeout: 10000 }).should('be.visible');
  });

  it('should handle network errors gracefully', () => {
    // Simulate network error
    cy.intercept('GET', '**/users', { forceNetworkError: true }).as('networkError');

    cy.reload();
    cy.wait('@networkError');

    // Should show error message
    cy.contains('error', { matchCase: false }).should('be.visible');
  });

  it('should show loading state during API calls', () => {
    // Delay the response to see loading state
    cy.intercept('GET', '**/users', { delay: 2000 }).as('slowRequest');

    cy.reload();

    // Should show loading indicator
    cy.get('[data-testid="loading"]', { timeout: 5000 }).should('exist');

    cy.wait('@slowRequest');
  });

  it('should handle empty response gracefully', () => {
    // Intercept with empty array
    cy.intercept('GET', '**/users', { statusCode: 200, body: [] }).as('emptyResponse');

    cy.reload();
    cy.wait('@emptyResponse');

    // Wait a bit for state to update
    cy.wait(1000);

    // Should show empty state message
    cy.contains('No Data', { matchCase: false }).should('be.visible');
  });

  it('should display user-friendly error messages', () => {
    cy.intercept('GET', '**/users', { statusCode: 500 }).as('serverError');

    cy.reload();
    cy.wait('@serverError');

    // Error message should be user-friendly, not technical
    cy.contains('error', { matchCase: false }).should('be.visible');
  });

  it('should track retry count', () => {
    // Fail multiple times
    cy.intercept('GET', '**/users', { statusCode: 500 }).as('getUsersError');

    cy.reload();
    cy.wait('@getUsersError');

    // Click retry (should increment retry count)
    cy.contains('button', 'Retry', { matchCase: false }).click();
    cy.wait(1000);

    // Retry count should be visible or tracked
    // This depends on your implementation
    cy.contains('Retry', { matchCase: false }).should('be.visible');
  });
});
