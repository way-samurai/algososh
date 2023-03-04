import { ElementStates } from "../../types/element-states";
import { TRandomArr } from "../../types/sorting-page";

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

    return arrColumns
  };

export const swap = (arr: TRandomArr[], firstIndex: number, secondIndex: number): void => {
	const temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;
};