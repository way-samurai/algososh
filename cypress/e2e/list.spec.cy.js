import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("List page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="/list"]').click();
  });

  it("Входные данные должны быть пустыми.", () => {
    cy.get('[data-cy="inputSymbols"]').each((el) =>
      cy.wrap(el).should("have.value", "")
    );
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже", () => {
    cy.get('[data-cy="addToHeadButton"]').should("be.disabled");
    cy.get('[data-cy="addToTailButton"]').should("be.disabled");
    cy.get('[data-cy="addToIndexButton"]').should("be.disabled");
    cy.get('[data-cy="deleteOfIndexButton"]').should("be.disabled");
  });

  it("Корректная отрисовка дефолтного списка", () => {
    cy.get("div[class*=circle_content]").should(($div) => {
      if ($div.length <= 0 || $div.length > 4) {
        throw new Error("Ожидается, что длина будет от 1 до 4");
      }
    });
    cy.get("div[class*=circle_content] div[class*=text]:first-of-type").should(
      "have.text",
      "head"
    );
    cy.get("div[class*=circle_content] div[class*=text]:last-of-type").should(
      "have.text",
      "tail"
    );
    cy.get("div[class*=circle_content] p[class*=text_type_circle]").each((el) =>
      cy.wrap(el).should(($el) => {
        if ($el.length <= 0 || $el.length > 4) {
          throw new Error("Expected to have length from 1 to 4");
        }
      })
    );
  });

  it("Входящее значение не должно быть больше 4 символов", () => {
    cy.get('[data-cy="inputSymbols"]')
      .eq(0)
      .type(11111)
      .should("have.value", "1111");
  });

  it("Корректное добавление заголовка head", () => {
    cy.get('[data-cy="inputSymbols"]').type("qwe").should("have.value", "qwe");
    cy.get('[data-cy="addToHeadButton"]').click();
    cy.get("div[class*=circle_content] div[class*=text]:first-of-type").should(
      "have.text",
      "qwe"
    );
    cy.get("div[class*=circle_changing]").should("be.visible");
    cy.get("div[class*=circle_modified]").eq(0).should("be.visible");
    cy.wait(SHORT_DELAY_IN_MS);
  });

  it("Корректное добавление в хвост списка tail", () => {
    cy.get('[data-cy="inputSymbols"]').type("qwe").should("have.value", "qwe");
    cy.get('[data-cy="addToTailButton"]').click();
    cy.get("div[class*=circle_changing]")
      .should("be.visible")
      .should("have.text", "qwe");
    cy.get("div[class*=circle_modified]")
      .should("be.visible")
      .should("have.text", "qwe");
    cy.get("div[class*=circle_content] div[class*=text]:first-of-type").should(
      "have.text",
      "head"
    );
    cy.get("div[class*=circle_content] div[class*=text]:last-of-type").should(
      "have.text",
      "tail"
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("p[class*=text_type_circle]").eq(-1).should("have.text", "qwe");
  });

  it("Корректное удаление из заголовка head", () => {
    cy.get('[data-cy="inputSymbols"]').type("rty").should("have.value", "rty");
    cy.get('[data-cy="addToHeadButton"]').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="deleteOfHeadButton"]').click();
    cy.get("div[class*=circle_changing]")
      .should("be.visible")
      .should("have.text", "rty");
    cy.get("p[class*=text_type_circle]").eq(0).should("have.text", "");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("p[class*=text_type_circle]").eq(0).should("have.text", "0");
    cy.get("div[class*=text]:first-of-type").eq(0).should("have.text", "head");
    cy.get("div[class*=text]:last-of-type").eq(-1).should("have.text", "tail");
  });

  it("Корректное удаление из хвоста списка tail", () => {
    cy.get('[data-cy="inputSymbols"]').type("123").should("have.value", "123");
    cy.get('[data-cy="addToTailButton"]').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="deleteOfTailButton"]').click();
    cy.get("div[class*=circle_changing]")
      .should("be.visible")
      .should("have.text", "123");
    cy.get("p[class*=text_type_circle]").eq(-2).should("have.text", "");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("p[class*=text_type_circle]").eq(-1).should("have.text", "1");
    cy.get("div[class*=text]:first-of-type").eq(0).should("have.text", "head");
    cy.get("div[class*=text]:last-of-type").eq(-1).should("have.text", "tail");
  });

  it("Корректное добавление по индексу", () => {
    cy.get('[data-cy="inputSymbols"]').type("ggg").should("have.value", "ggg");
    cy.get('[data-cy="addToHeadButton"]').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="inputSymbols"]').type("x");
    cy.get('[data-cy="inputIndex"]').type("2");
    cy.get("button").eq(5).click();
    cy.get("div[class*=circle_changing]").should("be.visible");
    cy.get("p[class*=text_type_circle]").eq(0).should("have.text", "x");
    cy.get("div[class*=circle_modified] p[class*=text_type_circle]").should(
      "have.text",
      "x"
    );
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("p[class*=text_type_circle]").eq(1).should("have.text", "0");
    cy.get("div[class*=circle_modified]").should("not.exist");
  });

  it("Корректное удаление по индексу", () => {
    cy.get('[data-cy="inputIndex"]').type("2");
    cy.get('[data-cy="deleteOfIndexButton"]').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("div[class*=circle_changing]").should("have.length", 2);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("div[class*=circle_changing]").should("have.length", 4);
    cy.get("p[class*=text_type_circle]").eq(1).should("have.text", "34");
    cy.get("div[class*=circle_modified]").should("not.exist");
  });
});
