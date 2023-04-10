import { getBubbleSortSteps, getSelectionSortSteps } from "../utils";

describe("Тестирование алгоритма сортировки выбором внутри компонета SotingPage", () => {
  let testingArr = [];

  beforeEach(() => {
    testingArr = [3, 4, 2];
  });

  it("Корректно сортирует пустой массив", () => {
    testingArr = [];
    const resultArrSteps = [{ currantArray: [], sortedIndsArray: [] }];
    expect(getSelectionSortSteps(testingArr, true)).toStrictEqual(
      resultArrSteps
    );
  });

  it("Корректно сортирует массив состоящий из одного элемента", () => {
    testingArr = [1];
    const resultArrSteps = [{ currantArray: [1], sortedIndsArray: [] }];
    expect(getSelectionSortSteps(testingArr, true)).toStrictEqual(
      resultArrSteps
    );
  });

  it("Корректно сортирует массив состоящий из нескольких элементов", () => {
    const resultArrSteps = [
      {
        currantArray: [3, 4, 2],
        leftIndex: 0,
        rightIndex: 1,
        sortedIndsArray: [],
      },
      {
        currantArray: [3, 4, 2],
        leftIndex: 0,
        rightIndex: 2,
        sortedIndsArray: [0],
      },
      {
        currantArray: [2, 4, 3],
        leftIndex: 1,
        rightIndex: 2,
        sortedIndsArray: [0, 1],
      },
      {
        currantArray: [2, 3, 4],
        sortedIndsArray: [0, 1],
      },
    ];
    expect(getSelectionSortSteps(testingArr, true)).toStrictEqual(
      resultArrSteps
    );
  });
});

describe("Тестирование алгоритма сортировки пузырьком внутри компонета SotingPage", () => {
  let testingArr = [];

  beforeEach(() => {
    testingArr = [3, 4, 2];
  });

  it("Корректно сортирует пустой массив", () => {
    testingArr = [];
    const resultArrSteps = [{ currantArray: [], sortedIndsArray: [] }];
    expect(getBubbleSortSteps(testingArr, true)).toStrictEqual(
      resultArrSteps
    );
  });

  it("Корректно сортирует массив состоящий из одного элемента", () => {
    testingArr = [1];
    const resultArrSteps = [{ currantArray: [1], sortedIndsArray: [] }];
    expect(getBubbleSortSteps(testingArr, true)).toStrictEqual(
      resultArrSteps
    );
  });

  it("Корректно сортирует массив состоящий из нескольких элементов", () => {
    const resultArrSteps = [
      {
        currantArray: [3, 4, 2],
        leftIndex: 0,
        rightIndex: 1,
        sortedIndsArray: [],
      },
      {
        currantArray: [3, 4, 2],
        leftIndex: 1,
        rightIndex: 2,
        sortedIndsArray: [2],
      },
      {
        currantArray: [3, 2, 4],
        leftIndex: 0,
        rightIndex: 1,
        sortedIndsArray: [2, 1],
      },
      {
        currantArray: [2, 3, 4],
        sortedIndsArray: [2, 1],
      },
    ];
    expect(getBubbleSortSteps(testingArr, true)).toStrictEqual(
      resultArrSteps
    );
  });
});
