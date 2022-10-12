describe("doelstellingen tests", () => {
  
  beforeEach(() => {
    cy.login("manager", "manager");
  });

  it("toon doelstellingen", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
      {fixture: 'doelstellingLijst.json'}
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

    cy.visit("/doelstelling");
    
    cy.get("[data-cy=doelstelling_icoon]").should("have.length", 1);
    cy.get("[data-cy=doelstelling]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_naam]").eq(0).contains("Partnerships 2022");
    cy.get("[data-cy=doelstelling_goal]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_subdoelstelling]").should("have.length", 2);
    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(0).contains("Partnerships in Europa");
    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(1).contains("Partnerships in Amerika");
  });

  it("toon doelstelling, met subdoelstelling en geen eigen datasource", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling/1`,
      {fixture: 'doelstellingMetSub.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
      {fixture: 'doelstellingLijst.json'}
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

    cy.visit("/doelstelling/1");
    
    cy.get("[data-cy=doelstelling_icoon]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_naam]").contains("Partnerships 2022");
    cy.get("[data-cy=doelstelling_goal]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_huidigeWaarde]").contains("335 Partners");
    cy.get("[data-cy=doelstelling_drempelWaarde]").contains("1000 Partners");

    cy.get("[data-cy=datasource]").should("not.exist");

    cy.get("[data-cy=doelstelling_subdoelstelling]").should("have.length", 2);

    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(0).contains("Partnerships in Europa");
    cy.get("[data-cy=doelstelling_subdoelstelling_huidigeWaarde]").eq(0).contains("203 Partners");
    cy.get("[data-cy=doelstelling_subdoelstelling_drempelWaarde]").eq(0).contains("500 Partners");
    cy.get("[data-cy=doelstelling_subdoelstelling_datasource_naam]").eq(0).contains("Partnerships in Europa 2022");

    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(1).contains("Partnerships in Amerika");
    cy.get("[data-cy=doelstelling_subdoelstelling_huidigeWaarde]").eq(1).contains("132 Partners");
    cy.get("[data-cy=doelstelling_subdoelstelling_drempelWaarde]").eq(1).contains("500 Partners");
    cy.get("[data-cy=doelstelling_subdoelstelling_datasource_naam]").eq(1).contains("Partnerships in Amerika 2022");
  });

  it("toon doelstelling, zonder subdoelstelling en eigen datasource", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling/2`,
      {fixture: 'doelstellingZonderSub.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
      {fixture: 'doelstellingLijst.json'}
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

    cy.visit("/doelstelling/2");
    
    cy.get("[data-cy=doelstelling_icoon]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_naam]").contains("Lokale Leveranciers 2022");
    cy.get("[data-cy=doelstelling_goal]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_huidigeWaarde]").eq(0).contains("Lokaal: 31%");
    cy.get("[data-cy=doelstelling_huidigeWaarde]").eq(1).contains("Extern: 69%");
    cy.get("[data-cy=doelstelling_drempelWaarde]").eq(0).contains("Lokaal: 50%");
    cy.get("[data-cy=doelstelling_drempelWaarde]").eq(1).contains("Extern: 50%");

    cy.get("[data-cy=datasource]").should("have.length", 1);
    cy.get("[data-cy=datasource_naam]").contains("Lokale Leveranciers");
    cy.get("[data-cy=datasource_detailsbutton]").should("be.visible");
    cy.get("[data-cy=datasource_foutiefbutton]").should("be.visible");

    cy.get("[data-cy=doelstelling_subdoelstelling]").should("not.exist");
  });

  it("toon subdoelstelling op doelstelling pagina", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling/1`,
      {fixture: 'doelstellingMetSub.json'}
    );

    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
      {fixture: 'doelstellingLijst.json'}
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

    cy.visit("/doelstelling/1/8");
    
    cy.get("[data-cy=doelstelling_icoon]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_naam]").contains("Partnerships in Europa");
    cy.get("[data-cy=doelstelling_goal]").should("not.exist");
    cy.get("[data-cy=doelstelling_huidigeWaarde]").contains("203 Partners");
    cy.get("[data-cy=doelstelling_drempelWaarde]").contains("500 Partners");

    cy.get("[data-cy=datasource]").should("have.length", 1);
    cy.get("[data-cy=datasource_naam]").contains("Partnerships in Europa 2022");
    cy.get("[data-cy=datasource_detailsbutton]").should("be.visible");
    cy.get("[data-cy=datasource_foutiefbutton]").should("be.visible");

    cy.get("[data-cy=doelstelling_subdoelstelling]").should("not.exist");
  });

  it("toon doelstellingen, trage response", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling`,
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

    cy.visit("/doelstelling");
    
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@trageResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("toon doelstelling, trage response", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling/1`,
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

    cy.visit("/doelstelling/1");
    
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@trageResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("toon doelstelling die niet bestaat -> Error", () => {
    cy.intercept(
      "GET",
      `${Cypress.env("api_url")}/data/doelstelling/100`,
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

    cy.visit("/doelstelling/100");

    cy.get("[data-cy=error_message]").should("be.visible");
    cy.get("[data-cy=error_message]").contains("Not found");
  });

  it("Doelstellingen, searchbar", () => {
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

    cy.visit("/doelstelling");

    cy.get("[data-cy=searchbar_input]").type("Partnerships");
    cy.get("[data-cy=searchbar_button]").click();

    cy.get("[data-cy=doelstelling_icoon]").should("have.length", 1);
    cy.get("[data-cy=doelstelling]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_naam]").eq(0).contains("Partnerships 2022");
    cy.get("[data-cy=doelstelling_goal]").should("have.length", 1);
    cy.get("[data-cy=doelstelling_subdoelstelling]").should("have.length", 2);
    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(0).contains("Partnerships in Europa");
    cy.get("[data-cy=doelstelling_subdoelstelling_naam]").eq(1).contains("Partnerships in Amerika");
  });
});