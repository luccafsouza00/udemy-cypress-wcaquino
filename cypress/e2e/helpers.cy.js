describe("Working with basic elements", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}`);
  });

  it("Wrap -> encapsula um objeto", () => {
    const obj = { nome: "User", idade: 20 };
    expect(obj).to.have.property("nome");
    cy.wrap(obj).should("have.property", "nome"); //encapsular o objeto para usar metodos do cypress

    cy.get("#formNome").then(($el) => {
      cy.wrap($el).type("assim funciona");
    });

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10);
      }, 500);
    });
    cy.get("#buttonSimple").then(() => {
      console.log("primeiro botao");
    });
    //promise.then(num => console.log(num))
    cy.wrap(promise).then((ret) => console.log(ret)); //faz uso da promise de modo sincrono
    cy.get("#buttonSimple").then(() => {
      console.log("segundo botao");
    });
  });

  it("Its -> retorna propriedade do objeto retornado", () => {
    const obj = { nome: "User", idade: 20 };

    cy.wrap(obj).should("have.property", "nome", "User");
    cy.wrap(obj).its("nome").should("be.equal", "User");

    const obj2 = {
      nome: "User",
      idade: 20,
      endereco: {
        rua: "dos santos",
      },
    };

    cy.wrap(obj2).its("endereco").should("deep.equal", { rua: "dos santos" });
    cy.wrap(obj2).its("endereco.rua").should("contain", "santos");

    cy.title().its("length").should("be.equal", 20);
  });

  it.only("Invoke -> invoca uma função", () => {
    const getValue = () => 1;
    const soma = (a, b) => a + b;

    cy.wrap({ fn: getValue }).invoke("fn").should("be.equal", 1);
    cy.wrap({ fn: soma }).invoke("fn", 2, 5).should("be.equal", 7);

    cy.get('#formNome').invoke('val', 'feito via invoke val');
    cy.window().invoke('alert', 'Da pra ver?')
    cy.get('#resultado').invoke('html', '<input type="button" value="hackeado">')
  });
});
