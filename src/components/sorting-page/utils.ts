import { ElementStates } from "../../types/element-states";
import { TRandomArr } from "../../types/sorting";

export const generateRandomArray = (
  MAXLENGTH: number,
  MINLENGTH: number,
  MAXVALUE: number
) => {
  const arrLength = Math.floor(
    Math.random() * (MAXLENGTH - MINLENGTH) + MINLENGTH
  );
  const arr = [...new Array(arrLength)].map(() =>
    Math.round(Math.random() * MAXVALUE)
  );
  const arrColumns = arr.map((num) => ({ num, state: ElementStates.Default }));

  return arrColumns;
};

export const swap = (
  arr: TRandomArr[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const selectionSort = (
  array: TRandomArr[],
  directionAsc: boolean
): TRandomArr[] => {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    let currentInd = i;

    for (let j = i + 1; j < length; j++) {
      if (
        directionAsc
          ? array[j].num < array[currentInd].num
          : array[j].num > array[currentInd].num
      ) {
        currentInd = j;
      }
    }
    swap(array, i, currentInd);
  }
  return array;
};

export const bubbleSort = (
  array: TRandomArr[],
  directionAsc: string
): TRandomArr[] => {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      const left = array[j].num;
      const right = array[j + 1].num;
      if (directionAsc ? left > right : left < right) {
        array[j].num = right;
        array[j + 1].num = left;
      }
    }
  }
  return array;
};
