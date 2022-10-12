describe("categorieën test", () => {
  
  beforeEach(() => {
    cy.login("manager", "manager");
  });

  it("toon categorieën", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie`,
      {fixture: 'categorieLijst.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/user/profiel`,
      {fixture: 'profielManager.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/goal`,
      {fixture: 'goals.json'}
    );

    cy.visit("/categorie");

    cy.get("[data-cy=categorie]").should("have.length", 1);
    cy.get("[data-cy=categorie_naam]").eq(0).contains("Economic");
    cy.get("[data-cy=categorie_goals]").should("have.length", 6);
  });

  it("toon categorie", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie/1`,
      {fixture: 'categorie.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/user/profiel`,
      {fixture: 'profielManager.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/goal`,
      {fixture: 'goals.json'}
    );

    cy.visit("/categorie/1");

    cy.get("[data-cy=categorie_naam]").eq(0).contains("Economic");
    cy.get("[data-cy=categorie_goals]").should("have.length", 6);

    cy.get("[data-cy=doelstelling]").should("have.length", 2);

    cy.get("[data-cy=doelstelling_naam]").eq(0).contains("Partnerships 2022");
    cy.get("[data-cy=doelstelling_naam]").eq(1).contains("Lokale Leveranciers 2022");

    cy.get("[data-cy=doelstelling_goal]").eq(0).should("have.length", 1);
    cy.get("[data-cy=doelstelling_goal]").eq(1).should("have.length", 1);

    cy.get("[data-cy=doelstelling_subdoelstelling]").should("have.length", 2);

    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(0).contains("Partnerships in Europa");
    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(1).contains("Partnerships in Amerika");
  });

  it("toon categorie die niet bestaat -> Error", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie/5`,
      {statusCode: 404, body: {message: "Not found"}}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/user/profiel`,
      {fixture: 'profielManager.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/goal`,
      {fixture: 'goals.json'}
    );

    cy.visit("/categorie/5");

    cy.get("[data-cy=error_message]").should("be.visible");
    cy.get("[data-cy=error_message]").contains("Not found");
  });

  it("toon categorie, trage response", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie/1`,
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("trageResponse");

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/user/profiel`,
      {fixture: 'profielManager.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/goal`,
      {fixture: 'goals.json'}
    );

    cy.visit("/categorie/1");

    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@trageResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("toon categorieën, trage response", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/categorie`,
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("trageResponse");

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/user/profiel`,
      {fixture: 'profielManager.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/goal`,
      {fixture: 'goals.json'}
    );

    cy.visit("/categorie");

    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@trageResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });
});