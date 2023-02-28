import { ElementStates } from "../../types/element-states";

export const MAXLENGTH: number = 3;
export const MINLENGTH: number = 17;
export const MAXVALUE: number = 100;

export const asc: string = 'Direction.Ascending';
export const desc: string = 'Direction.Descending';
export const initial: string = 'default';
export const array: string = 'array';

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