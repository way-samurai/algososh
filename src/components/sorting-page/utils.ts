import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TRandomArr } from "../../types/sorting-page";

export const MAXLENGTH: number = 3;
export const MINLENGTH: number = 17;
export const MAXVALUE: number = 100;

export const asc: string = Direction.Ascending;
export const desc: string = Direction.Descending;
export const initial: string = 'default';
export const array: string = 'array';

export const radioSelectionSort: string = 'selection-sort';
export const radioBubbleSort: string = 'bubble-sort';

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