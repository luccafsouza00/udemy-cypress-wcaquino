describe("Working with basic elements", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}`);
  });

  //   beforeEach(() => {
  //     cy.reload(true);
  //   });

  it("texts", () => {
    cy.get(".facilAchar").should(
      "have.text",
      "Cuidado onde clica, muitas armadilhas..."
    );
  });

  it("links", () => {
    cy.contains("a", "Voltar").click();
    cy.contains("div", "Voltou!").should("be.visible");
  });

  it("TextFields", () => {
    cy.get("#formNome").type("Cypress Test");
    cy.get("#formNome").should("have.value", "Cypress Test");

    cy.get("#elementosForm\\:sugestoes")
      .type("textarea")
      .should("have.value", "textarea");

    cy.get(
      "#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input"
    ).type("???");

    cy.get("[data-cy=dataSobrenome]")
      .type("Teste12345{backspace}{backspace}")
      .should("have.value", "Teste123");

    cy.get("#elementosForm\\:sugestoes")
      .clear()
      .type("Erro{selectall}acerto", { delay: 100 })
      .should("have.value", "acerto");
  });

  it("RadioButton", () => {
    cy.get("#formSexoFem").click().should("be.checked");

    cy.get("#formSexoMasc").should("not.be.checked");

    cy.get("[name=formSexo]").should("have.length", 2);
  });

  it("Combo ", () => {
    cy.get('[data-test="dataEscolaridade"] option').should("have.length", 8);
    cy.get('[data-test="dataEscolaridade"] option').then(($arr) => {
      const values = [];
      $arr.each(function () {
        values.push(this.innerHTML);
      });
      expect(values).to.include.members(["Superior", "Mestrado"]);
    });
  });

  it.only("Combo multiplo", () => {
    cy.get("#formEsportes").select(["Futebol", "Natacao"]);

    cy.get("#formEsportes").then(($el) => {
      expect($el.val()).to.be.deep.equal(["natacao", "futebol"]);
      expect($el.val()).to.have.length(2);
    });

    cy.get("#formEsportes").invoke('val').should('eql', ['natacao', 'futebol']);
  });
});
