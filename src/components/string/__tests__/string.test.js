import { reverseString } from "../utils";

describe("Тестирование компонента String", () => {
  it("Корректно разворачивает строку с четным количеством символов", () => {
    expect(reverseString("1ABC23")).toEqual(["3", "2", "C", "B", "A", "1"]);
  });

  it("Корректно разворачивает строку с нечетным количеством символов", () => {
    expect(reverseString("1ABC2")).toEqual(["2", "C", "B", "A", "1"]);
  });

  it("Корректно разворачивает строку с одним символом", () => {
    expect(reverseString("1ABC2")).toEqual(["2", "C", "B", "A", "1"]);
  });

  it("Корректно разворачивает пустую строку", () => {
    expect(reverseString("")).toEqual([]);
  });
});
