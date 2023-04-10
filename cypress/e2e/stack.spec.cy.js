import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа Стека", () => {
  const addNextElemInStack = (value) => {
    cy.clock();
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').type(value);
      cy.get('[data-cy="addButton"]').should("be.not.disabled");
      cy.get('[data-cy="deleteButton"]').should("be.not.disabled");
      cy.get('[data-cy="clearButton"]').should("be.not.disabled");
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="addButton"]').click();
      cy.get('[data-cy="deleteButton"]').should("be.disabled");
      cy.get('[data-cy="clearButton"]').should("be.disabled");
    });
    cy.get('div[class*="circle_circle"]')
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));
    cy.tick(SHORT_DELAY_IN_MS);
  };

  const addFirstElemInStack = (value) => {
    cy.clock();
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').type(value);
      cy.get('[data-cy="addButton"]').should("be.not.disabled");
      cy.get('[data-cy="deleteButton"]').should("be.disabled");
      cy.get('[data-cy="clearButton"]').should("be.not.disabled");
    });
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="addButton"]').click();
      cy.get('[data-cy="deleteButton"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]')
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));
    cy.tick(SHORT_DELAY_IN_MS);
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="/stack"]').click();
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="addButton"]').should("be.disabled");
      cy.get('[data-cy="deleteButton"]').should("be.disabled");
    });
  });

  it("Добавление элемента в стек корректно", function () {
    cy.clock();
    addFirstElemInStack("5");

    addNextElemInStack("6");

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should("have.text", "5");
    });

    addNextElemInStack("7");

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[0]).children().should("have.text", "5");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[1]).children().should("have.text", "6");
    });
  });

  it("Корректное удаления элемента из стека", function () {
    cy.clock();
    addFirstElemInStack("5");
    cy.tick(SHORT_DELAY_IN_MS);
    addNextElemInStack("6");

    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="addButton"]').should("be.disabled");
      cy.get('[data-cy="deleteButton"]').click();
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[0]).children().should("have.text", "5");
    });
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="addButton"]').should("be.disabled");
      cy.get('[data-cy="deleteButton"]').should("be.not.disabled");
      cy.get('[data-cy="clearButton"]').should("be.not.disabled");
    });
  });

  it("Корректное поведение кнопки «Очистить»", function () {
    cy.clock();
    addFirstElemInStack("5");
    cy.tick(SHORT_DELAY_IN_MS);
    addNextElemInStack("6");
    cy.tick(SHORT_DELAY_IN_MS);
    addNextElemInStack("7");

    cy.clock();
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="addButton"]').should("be.disabled");
      cy.get('[data-cy="clearButton"]').click();
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').should("not.exist");

    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="addButton"]').should("be.disabled");
      cy.get('[data-cy="deleteButton"]').should("be.disabled");
      cy.get('[data-cy="clearButton"]').should("be.disabled");
    });
  });
});
