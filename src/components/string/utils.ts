import { ElementStates } from "../../types/element-states";

export function getCircleState(
  index: number,
  maxIndex: number,
  currentStepInd: number,
  isFinished: boolean
): ElementStates {
  if (index < currentStepInd || index > maxIndex - currentStepInd || isFinished) {
    return ElementStates.Modified;
  }
  if (index === currentStepInd || index === maxIndex - currentStepInd) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
}

export const swap = (
  arr: string[],
  leftIndex: number,
  rightIndex: number
): void => {
  [arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]];
};

//возвращает массив с переворот по шагам
export function getReversingStringSteps(inputString: string): string[][] {
  const inputStringLetters = inputString.split("");
  const reversingSteps: string[][] = [[...inputStringLetters]];
  const end = inputStringLetters.length;

  if (inputString.length <= 1) {
    return [[...inputStringLetters]];
  }

  const maxAlgoCurr = Math.floor(end / 2);

  //метод двух указателей
  for (let leftItemCurr = 0; leftItemCurr < maxAlgoCurr; ++leftItemCurr) {
    const rightItemCurr = inputString.length - 1 - leftItemCurr;
    swap(inputStringLetters, leftItemCurr, rightItemCurr);
    reversingSteps.push([...inputStringLetters]);
  }
  return reversingSteps;
}
