import { ElementStates } from "../../types/element-states";

export function getCircleState(
  index: number,
  maxIndex: number,
  currentStep: number,
  isFinished: boolean
): ElementStates {
  if (index < currentStep || index > maxIndex - currentStep || isFinished) {
    return ElementStates.Modified;
  }
  if (index === currentStep || index === maxIndex - currentStep) {
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

    //меняем местами элементы
    swap(inputStringLetters, leftItemCurr, rightItemCurr);

    //добавляем в массив с переворотными шагами состояние на шаге
    reversingSteps.push([...inputStringLetters]);
  }
  return reversingSteps;
}
