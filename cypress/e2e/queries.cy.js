/// <reference types="cypress" />

describe("test each query", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can query for a specific customer name", () => {
    cy.get('[data-cy="form"]').find('[data-columnname="customer_name"]').type("brittany jackson");

    cy.get('[data-cy="form"]').submit();

    cy.get('[data-cy="invoice"]').each(($el) => {
      cy.get('[data-cy="customer_name"]').should("contain", "Brittany Jackson");
    });
  });
});
