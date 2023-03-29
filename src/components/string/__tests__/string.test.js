import { getReversingStringSteps } from "../utils";

const resultForEvenSymbols = [
  ["1", "2", "3", "4"],
  ["4", "2", "3", "1"],
  ["4", "3", "2", "1"],
];

const resultForOddSymbols = [
  ["1", "2", "3", "4", "5"],
  ["5", "2", "3", "4", "1"],
  ["5", "4", "3", "2", "1"],
];

describe("Тестирование компонента String", () => {
  it("Корректно разворачивает строку с четным количеством символов", () => {
    expect(getReversingStringSteps("1234")).toEqual(resultForEvenSymbols);
  });

  it("Корректно разворачивает строку с нечетным количеством символов", () => {
    expect(getReversingStringSteps("12345")).toEqual(resultForOddSymbols);
  });

  it("Корректно разворачивает строку с одним символом", () => {
    expect(getReversingStringSteps("1")).toEqual([["1"]]);
  });

  it("Корректно разворачивает пустую строку", () => {
    expect(getReversingStringSteps("")).toEqual([[]]);
  });
});
