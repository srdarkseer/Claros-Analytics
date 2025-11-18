describe('Filtering Functionality', () => {
  beforeEach(() => {
    cy.visit('/data');
    // Wait for initial data to load
    cy.wait(3000);
  });

  it('should have a search input field', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="text"]').should('have.attr', 'placeholder');
  });

  it('should filter data when typing in search field', () => {
    // Wait for data to load
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0);

    // Get initial row count
    cy.get('tbody tr').then($rows => {
      const initialCount = $rows.length;

      // Type in search field
      cy.get('input[type="text"]').type('Leanne');

      // Wait for filtering to apply
      cy.wait(1000);

      // Verify filtered results
      cy.get('tbody tr').should('have.length.lessThan', initialCount);
      cy.get('tbody tr').should('contain', 'Leanne');
    });
  });

  it('should clear search when clear button is clicked', () => {
    // Type in search field
    cy.get('input[type="text"]').type('test search');

    // Verify input has value
    cy.get('input[type="text"]').should('have.value', 'test search');

    // Click clear button (X icon)
    cy.get('button[aria-label="Clear search"]').click();

    // Verify input is cleared
    cy.get('input[type="text"]').should('have.value', '');

    // Verify all data is shown again
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0);
  });

  it('should filter by email address', () => {
    cy.wait(2000);
    cy.get('input[type="text"]').type('@');
    cy.wait(1000);
    // Should show filtered results
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should filter by username', () => {
    cy.wait(2000);
    cy.get('input[type="text"]').type('Bret');
    cy.wait(1000);
    cy.get('tbody tr').should('contain', 'Bret');
  });

  it('should show no results when search matches nothing', () => {
    cy.wait(2000);
    cy.get('input[type="text"]').type('NonExistentUser12345');
    cy.wait(1000);
    // Should show empty state or no rows
    cy.get('tbody tr').should('have.length', 0);
  });

  it('should filter data in real-time as user types', () => {
    cy.wait(2000);

    // Type character by character
    cy.get('input[type="text"]').type('L');
    cy.wait(500);
    cy.get('tbody tr').should('have.length.greaterThan', 0);

    cy.get('input[type="text"]').type('e');
    cy.wait(500);
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });
});
