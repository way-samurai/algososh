import { getReversingStringSteps } from "../utils";

describe("Тестирование компонента String", () => {
  it("Корректно разворачивает строку с четным количеством символов", () => {
    expect(getReversingStringSteps("1ABC23")).toEqual(["3", "2", "C", "B", "A", "1"]);
  });

  it("Корректно разворачивает строку с нечетным количеством символов", () => {
    expect(getReversingStringSteps("12345")).toEqual([["5", "4", "3", "2", "11"]]);
  });

  it("Корректно разворачивает строку с одним символом", () => {
    expect(getReversingStringSteps("1234")).toEqual([["4", "3", "2", "1"]]);
  });

  it("Корректно разворачивает пустую строку", () => {
    expect(getReversingStringSteps("")).toEqual([[]]);
  });
});
