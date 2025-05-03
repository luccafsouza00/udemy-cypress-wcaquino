describe("Working with basic elements", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  it("texts", () => {
    cy.get(".facilAchar").should(
      "have.text",
      "Cuidado onde clica, muitas armadilhas..."
    );
  });

  it.only("links", () => {
    cy.contains("a", "Voltar").click();
    cy.contains("div", "Voltou!").should("be.visible");
  });
});
