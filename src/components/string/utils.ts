import { ElementStates } from "../../types/element-states";

export const swap = (
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex - firstIndex]] = [
    arr[secondIndex - firstIndex],
    arr[firstIndex],
  ];
};

export const stateCircle = (
  index: number,
  currentIndex: number,
  arr: Array<string | number>
) => {
  let arrLength = arr.length - 1;
  if (currentIndex < index || currentIndex > arrLength - index) {
    return ElementStates.Modified;
  }
  if (currentIndex === index || currentIndex === arrLength - index) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};


