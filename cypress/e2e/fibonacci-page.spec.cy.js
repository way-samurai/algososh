import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа Фибоначчи", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="/fibonacci"]').click()
  });
  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="submit"]').should("be.disabled");
    });
  });
  it("Числа генерируются корректно", function () {
    cy.clock();
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').type("5");
      cy.get('[data-cy="submit"]').click();
      cy.get('[data-cy="input"]').should("be.disabled");
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "1")
      .should("have.text", "1");

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "2")
      .should("have.text", "11");

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "3")
      .should("have.text", "112");

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "4")
      .should("have.text", "1123");

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "5")
      .should("have.text", "11235");

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "6")
      .should("have.text", "112358");

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="submit"]').should("be.disabled");
    });
  });
});
