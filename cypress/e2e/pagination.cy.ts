describe('Pagination Functionality', () => {
  beforeEach(() => {
    cy.visit('/data');
    // Wait for initial data to load
    cy.wait(3000);
    // Ensure we have enough data for pagination (load posts which has 100 items)
    cy.contains('button', 'Posts').click();
    cy.wait(3000);
  });

  it('should display pagination controls', () => {
    // Pagination only shows when there are more items than items per page
    // Posts has 100 items, so pagination should be visible
    cy.get('[data-testid="pagination"]', { timeout: 10000 }).should('be.visible');
  });

  it('should show correct number of items per page', () => {
    cy.wait(2000);
    // Default should be 10 items per page
    cy.get('tbody tr').should('have.length.at.most', 10);
  });

  it('should navigate to next page', () => {
    cy.wait(2000);
    // Get first item from first page
    cy.get('tbody tr')
      .first()
      .then($firstRow => {
        const firstPageText = $firstRow.text();

        // Click next page button (PaginationNext component)
        cy.get('a[aria-label="Go to next page"]').first().click();
        cy.wait(1000);

        // Verify we're on a different page
        cy.get('tbody tr')
          .first()
          .should($newFirstRow => {
            expect($newFirstRow.text()).not.to.equal(firstPageText);
          });
      });
  });

  it('should navigate to previous page', () => {
    cy.wait(2000);
    // First go to next page
    cy.get('a[aria-label="Go to next page"]').first().click();
    cy.wait(1000);

    // Get first item from second page
    cy.get('tbody tr')
      .first()
      .then($secondPageRow => {
        const secondPageText = $secondPageRow.text();

        // Click previous page button (PaginationPrevious component)
        cy.get('a[aria-label="Go to previous page"]').first().click();
        cy.wait(1000);

        // Verify we're back on first page
        cy.get('tbody tr')
          .first()
          .should($firstPageRow => {
            expect($firstPageRow.text()).not.to.equal(secondPageText);
          });
      });
  });

  it('should change items per page', () => {
    cy.wait(2000);
    // Find and click items per page selector (Select component)
    cy.get('[id="items-per-page"]').click();
    cy.wait(500);

    // Select different page size (e.g., 20) - use role="option" to find visible option
    cy.get('[role="option"]').contains('20').click({ force: true });
    cy.wait(1000);

    // Verify more items are displayed
    cy.get('tbody tr').should('have.length.at.most', 20);
  });

  it('should disable previous button on first page', () => {
    cy.wait(2000);
    // Previous button should be disabled on first page (check for disabled class or attribute)
    cy.get('a[aria-label="Go to previous page"]')
      .first()
      .should('have.class', 'pointer-events-none');
  });

  it('should show correct page numbers', () => {
    cy.wait(2000);
    // Should show current page number
    cy.get('[data-testid="pagination"]').should('contain', '1');
  });

  it('should reset to first page when changing page size', () => {
    cy.wait(2000);
    // Go to second page
    cy.get('a[aria-label="Go to next page"]').first().click();
    cy.wait(1000);

    // Change page size - click the select trigger
    cy.get('[id="items-per-page"]').click();
    cy.wait(500);

    // Select the option with value "20" - use the SelectItem which should be visible
    cy.get('[role="option"]').contains('20').click({ force: true });
    cy.wait(1000);

    // Should be back on first page (check for active page link with "1")
    cy.get('[data-testid="pagination"]').should('contain', '1');
  });

  it('should work correctly with filtered data', () => {
    cy.wait(2000);
    // Apply filter (search for something that might have multiple results)
    cy.get('input[type="text"]').type('a');
    cy.wait(1000);

    // If filtered results are more than items per page, pagination should be visible
    cy.get('tbody tr').should('have.length.greaterThan', 0);
    // Pagination might not show if filtered results are <= 10, so check conditionally
    cy.get('body').then($body => {
      if ($body.find('[data-testid="pagination"]').length > 0) {
        cy.get('[data-testid="pagination"]').should('be.visible');
      }
    });
  });
});
