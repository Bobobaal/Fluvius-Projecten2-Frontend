/* eslint-disable */

describe("dashboard test", () => {
  
  beforeEach(() => {
    cy.login("coordinator", "coordinator");
  });

  it("toon lijst van alle templates", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/template`,
      {fixture: 'dashboardLijst.json'}
    );
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/template/1`,
      {fixture: 'dashboard.json'}
    );

    cy.visit("/dashboard/lijst");

    cy.get("[data-cy=template]").should("have.length", 4);

  })


  it("maak en verwijder een template", () => {

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie`,
      {fixture: 'categorieLijst.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
      {fixture: 'doelstellingLijst.json'}
    );

    cy.visit("/dashboard/stap1");

    cy.get("[data-cy=naamInput]").type('data-cy');
    cy.get("[data-cy=select]").select("1")


    cy.get("[data-cy=sumbitBtn]").click();
    cy.get("[data-cy=submitTemplate]").click();

    cy.get("[data-cy=succesAlert]").should('be.visible')
    
    
    cy.get("[data-cy=succes]").click();

    cy.get("[data-cy=removeBtn]").eq(4).click();


  })
  it("wijzig een template", () => {

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie`,
      {fixture: 'categorieLijst.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
      {fixture: 'doelstellingLijst.json'}
    );

    cy.visit("/dashboard/lijst");

    cy.get("[data-cy=wijzig]").eq(0).click();

    cy.get("[data-cy=sumbitBtn]").click();

    cy.get("[data-cy=submitTemplate]").click();

    cy.get("[data-cy=succesAlert]").should('be.visible')

  })

});