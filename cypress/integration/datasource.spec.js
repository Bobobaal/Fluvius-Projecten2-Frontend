describe("datasources test", () => {
    beforeEach(() => {
        cy.login("manager", "manager");
    });

    describe("DatasourceLijstPage test", () => {
        it("toon lijst datasources", () => {
            cy.intercept(
                "GET",
                `${Cypress.env("api_url")}/data/datasource`,
                {fixture: 'datasourceLijst.json'}
            );
        
            cy.visit("/datasource");

            cy.get("[data-cy=datasource]").should("have.length", 4);
            cy.get("[data-cy=datasource_naam]").eq(0).contains("Afval Brussel 2022");
            cy.get("[data-cy=datasource_foutiefbutton").should("be.visible");
            cy.get("[data-cy=datasource_foutboodschap")
                .should("have.length", 1)
                .contains("Foutieve waarden");
        });

        it("toon enkel partnerships datasource via zoekbalk", () => {
            cy.intercept(
                "GET",
                `${Cypress.env("api_url")}/data/datasource`,
                {fixture: 'datasourceLijst.json'}
            );

            cy.visit("/datasource");

            cy.get("[data-cy=searchbar_input").type("Partner");
            cy.get("[data-cy=searchbar_button").click();
            cy.get("[data-cy=datasource]").should("have.length", 2);
            cy.get("[data-cy=datasource_naam]").eq(0).contains("Partnerships in Amerika 2022");
            cy.get("[data-cy=datasource_naam]").eq(1).contains("Partnerships in Europa 2022");
        });
        
        it("toon loading datasources na slowResponse", () => {
            cy.intercept(
            "GET",
            `${Cypress.env("api_url")}/data/datasource`,
            (req) => {
                    req.on("response", (res) => {
                        res.setDelay(1000);
                    });
                }
            ).as("slowResponse");

            cy.visit("/datasource");

            cy.get("[data-cy=loading]").should("be.visible");
            cy.wait("@slowResponse");
            cy.get("[data-cy=loading]").should("not.exist");
        });

        it("toon errorbericht", () => {
            cy.intercept(
                "GET",
                `${Cypress.env("api_url")}/data/datasource`,
                {statusCode: 404, body: {message: "Not found"}}
            );

            cy.visit("/datasource");

            cy.get("[data-cy=error_message]").should("be.visible");
            cy.get("[data-cy=error_message]").contains("Not found");
        });
    });

    describe("DatasourcePage test", () => {
        it("toon correcte datasourcePage", () => {
            cy.intercept(
                "GET",
                `${Cypress.env("api_url")}/data/datasource/1`,
                {fixture: 'datasourceCorrect.json'}
            );

            cy.visit("/datasource/1");

            cy.get("[data-cy=datasource_naam]")
                .should("be.visible")
                .eq(0).contains("Partnerships in Amerika 2022");
            cy.get("[data-cy=datasource_grootte]").should("be.visible");
            cy.get("[data-cy=datasource_preview]").should("be.visible");
            cy.get("[data-cy=datasource_waarden]").should("be.visible");

        });

        it("toon foutieve datasourcePage", () => {
            cy.intercept(
                "GET",
                `${Cypress.env("api_url")}/data/datasource/1`,
                {fixture: 'datasourceFoutief.json'}
            );

            cy.visit("/datasource/1");

            cy.get("[data-cy=datasource_naam]")
                .should("be.visible")
                .eq(0).contains("Partnerships in Europa 2022");
            cy.get("[data-cy=datasource_foutbox]").should("be.visible");
            cy.get("[data-cy=datasource_foutboodschap]")
                .should("be.visible")
                .eq(0).contains("Foutieve waarden");
            cy.get("[data-cy=datasource_grootte]").should("be.visible");
            cy.get("[data-cy=datasource_preview]").should("be.visible");
            cy.get("[data-cy=datasource_waarden]").should("be.visible");
        });

        it("toon loading DatasourcePage na slowResponse", () => {
            cy.intercept(
            "GET",
            `${Cypress.env("api_url")}/data/datasource/1`,
            (req) => {
                    req.on("response", (res) => {
                        res.setDelay(1000);
                    });
                }
            ).as("slowResponse");

            cy.visit("/datasource/1");

            cy.get("[data-cy=loading]").should("be.visible");
            cy.wait("@slowResponse");
            cy.get("[data-cy=loading]").should("not.exist");
        });

        it("toon errorbericht", () => {
            cy.intercept(
                "GET",
                `${Cypress.env("api_url")}/data/datasource/1`,
                {statusCode: 404, body: {message: "Not found"}}
            );

            cy.visit("/datasource/1");

            cy.get("[data-cy=error_message]").should("be.visible");
            cy.get("[data-cy=error_message]").contains("Not found");
        });

    });
});