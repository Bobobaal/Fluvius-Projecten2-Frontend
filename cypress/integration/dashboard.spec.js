describe("dashboard test", () => {
    beforeEach(() => {
        cy.login("manager", "manager");
    });

    it("toon correct dashboard" , () => {
        cy.intercept(
            "GET",
            `${Cypress.env("api_url")}/template/primair`,
            {fixture: 'primaryTemplate.json'}
        );

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

        cy.intercept(
            "GET",
            `${Cypress.env("api_url")}/data/goal`,
            {fixture: 'goals.json'}
        );

        cy.visit('/dashboard');

        cy.get('[data-cy=dashboard_categorie]').should("have.length", 1);
        cy.get('[data-cy=dashboard_categorieNaam]').eq(0).contains('Economic');
        cy.get('[data-cy=dashboard_goal]').should('have.length', 6);
        cy.get('[data-cy=dashboard_doelstelling').should('have.length', 1);
        cy.get('[data-cy=dashboard_doelstellingChart').should('be.visible');
        cy.get('[data-cy=dashboard_doelstellingVooruitgang').should('be.visible');
        cy.get('[data-cy=dashboard_doelstellingDetails').should('be.visible');
    });

    it("toon loading dashboard na slowResponse", () => {
        cy.intercept(
        "GET",
        `${Cypress.env("api_url")}/template/primair`,
        (req) => {
                req.on("response", (res) => {
                    res.setDelay(1000);
                });
            }
        ).as("slowResponse");

        cy.visit("/dashboard");

        cy.get("[data-cy=loading]").should("be.visible");
        cy.wait("@slowResponse");
        cy.get("[data-cy=loading]").should("not.exist");
    });

    it("toon loading dashboardCategorieën na slowResponse", () => {
        cy.intercept(
        "GET",
        `${Cypress.env("api_url")}/data/categorie`,
        (req) => {
                req.on("response", (res) => {
                    res.setDelay(1000);
                });
            }
        ).as("slowResponse");

        cy.visit("/dashboard");

        cy.get("[data-cy=loading]").should("be.visible");
        cy.wait("@slowResponse");
        cy.get("[data-cy=loading]").should("not.exist");
    });

    it("toon loading dashboardDoelstellingen na slowResponse", () => {
        cy.intercept(
        "GET",
        `${Cypress.env("api_url")}/data/doelstelling`,
        (req) => {
                req.on("response", (res) => {
                    res.setDelay(1000);
                });
            }
        ).as("slowResponse");

        cy.visit("/dashboard");

        cy.get("[data-cy=loading]").should("be.visible");
        cy.wait("@slowResponse");
        cy.get("[data-cy=loading]").should("not.exist");
    });

    it("toon errorbericht", () => {
        cy.intercept(
            "GET",
            `${Cypress.env("api_url")}/template/primair`,
            {statusCode: 404, body: {message: "Not found"}}
        );

        cy.visit("/dashboard");

        cy.get("[data-cy=error_message]").should("be.visible");
        cy.get("[data-cy=error_message]").contains("Not found");
    });

});