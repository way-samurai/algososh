import { ElementStates } from "../../types/element-states";
import { Step } from "../../types/sorting";
import { MAXLENGTH, MAXVALUE, MINLENGTH } from "./constants";

export function getColumnState(
  index: number,
  maxIndex: number,
  currentStepInd: number,
  currentStep: Step
): ElementStates {
  if ([currentStep.leftIndex, currentStep.rightIndex].includes(index)) {
    return ElementStates.Changing;
  }
  if (
    currentStep.sortedIndsArray.includes(index) ||
    (currentStepInd === maxIndex && maxIndex > 0)
  ) {
    return ElementStates.Modified;
  }
  return ElementStates.Default;
}

export const generateRandomArray = () => {
  const arrLength = Math.floor(
    Math.random() * (MAXLENGTH - MINLENGTH) + MINLENGTH
  );
  const arr = [...new Array(arrLength)].map(() =>
    Math.round(Math.random() * MAXVALUE)
  );
  const result = arr.map((num) => num);
  return result;
};

export const swap = (
  arr: number[],
  leftIndex: number,
  rightIndex: number
): void => {
  const temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
};

export const getSelectionSortSteps = (
  array: number[],
  directionAsc: boolean
): Step[] => {
  const { length } = array;
  const resultSteps: Step[] = [];

  for (let i = 0; i < length - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < length; j++) {
      resultSteps.push({
        currantArray: [...array],
        leftIndex: i,
        rightIndex: j,
        sortedIndsArray: [
          ...(resultSteps[resultSteps.length - 1]?.sortedIndsArray || []),
        ],
      });

      if (directionAsc ? array[j] < array[minInd] : array[j] > array[minInd]) {
        minInd = j;
      }
    }
    if (minInd !== i) {
      swap(array, i, minInd);
    }
    resultSteps[resultSteps.length - 1].sortedIndsArray.push(i);
  }

  resultSteps.push({
    currantArray: [...array],
    sortedIndsArray: resultSteps[resultSteps.length - 1]?.sortedIndsArray || [],
  });
  return resultSteps;
};


export const getBubbleSortSteps = (
  array: number[],
  directionAsc: boolean
): Step[] => {
  const { length } = array;
  const resultSteps: Step[] = [];

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      resultSteps.push({
        currantArray: [...array],
        leftIndex: j,
        rightIndex: j + 1,
        sortedIndsArray: [
          ...(resultSteps[resultSteps.length - 1]?.sortedIndsArray || []),
        ],
      });

      const needSwap = directionAsc
        ? array[j] > array[j + 1]
        : array[j] < array[j + 1];
      if (needSwap) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    resultSteps[resultSteps.length - 1].sortedIndsArray.push(length - i - 1);
  }

  resultSteps.push({
    currantArray: [...array],
    sortedIndsArray: resultSteps[resultSteps.length - 1]?.sortedIndsArray || [],
  });
  return resultSteps;
};

