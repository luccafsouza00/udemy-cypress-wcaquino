describe("Basic Cypress Test Suite", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}`);
  });

  it("should ", () => {
    let syncTitle;

    cy.title().then((title) => {
      expect(title).be.equal("Campo de Treinamento");
      cy.get("#formNome").type(title);

      syncTitle = title;
    });

    cy.get('[data-cy="dataSobrenome"]').then(($el) => {
      cy.wrap($el).type(syncTitle);
    });
  });
});
