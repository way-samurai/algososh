import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import {
  generateRandomArray,
  swap,
} from "./utils";
import { Column } from "../ui/column/column";
import { TRandomArr } from "../../types/sorting-page";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { array, asc, desc, initial, MAXLENGTH, MAXVALUE, MINLENGTH, radioBubbleSort, radioSelectionSort } from "./constants";

export const SortingPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<string>(initial);
  const [sortingMethod, setSortingMethod] =
    useState<string>(radioSelectionSort);
  const [randomArr, setRandomArr] = useState<TRandomArr[]>([]);

  function renderRandomArr(): void {
    const arrColumns = generateRandomArray(MAXLENGTH, MINLENGTH, MAXVALUE);
    setRandomArr(arrColumns);
  }

  const selectionSort = async (
    array: TRandomArr[],
    direction: string
  ): Promise<TRandomArr[]> => {
    const { length } = array;
    const directionAsc = direction === Direction.Ascending ? true : false;
    for (let i = 0; i < length; i++) {
      let currentInd = i;
      array[currentInd].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        array[j].state = ElementStates.Changing;
        setRandomArr([...array]);
        await pause(SHORT_DELAY_IN_MS);
        if (
          directionAsc
            ? array[j].num < array[currentInd].num
            : array[j].num > array[currentInd].num
        ) {
          currentInd = j;
          array[currentInd].state = ElementStates.Default;
        }
        if (j !== currentInd) {
          array[j].state = ElementStates.Default;
        }
        setRandomArr([...array]);
      }
      swap(array, i, currentInd);
      array[currentInd].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setRandomArr([...array]);
    }
    setIsLoader(initial);
    return array;
  };

  const bubbleSort = async (
    array: TRandomArr[],
    direction: string
  ): Promise<TRandomArr[]> => {
    const { length } = array;
    const directionAsc = direction === Direction.Ascending ? true : false;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        const left = array[j].num;
        const right = array[j + 1].num;
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setRandomArr([...array]);
        await pause(DELAY_IN_MS);
        if (directionAsc ? left > right : left < right) {
          array[j].num = right;
          array[j + 1].num = left;
        }
        array[j].state = ElementStates.Default;
        setRandomArr([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setRandomArr([...array]);
    }
    setIsLoader(initial);
    return array;
  };

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setSortingMethod((e.target as HTMLInputElement).value);
  };

  const onClickCreateArr = () => {
    renderRandomArr();
  };

  const onClickSortArr = async (direction: string): Promise<void> => {
    setIsLoader(direction);
    if (sortingMethod === radioSelectionSort) {
      setRandomArr([...(await selectionSort(randomArr, direction))]);
    } else if (sortingMethod === radioBubbleSort) {
      setRandomArr([...(await bubbleSort(randomArr, direction))]);
    }
    return;
  };

  useEffect(() => {
    renderRandomArr();
    return () => setRandomArr([])
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radioInputs}>
          <RadioInput
            disabled={isLoader === desc || isLoader === asc}
            label="Выбор"
            name={"sorting-type"}
            value={radioSelectionSort}
            defaultChecked
            extraClass="mr-20"
            onChange={onChangeRadio}
          />
          <RadioInput
            disabled={isLoader === desc || isLoader === asc}
            label="Пузырек"
            name={"sorting-type"}
            value={radioBubbleSort}
            onChange={onChangeRadio}
          />
        </div>
        <div className={styles.group}>
          <Button
            isLoader={isLoader === asc}
            disabled={isLoader === desc}
            text="По возрастанию"
            onClick={() => onClickSortArr(asc)}
            sorting={Direction.Ascending}
            extraClass="mr-6"
          />
          <Button
            isLoader={isLoader === desc}
            disabled={isLoader === asc}
            text="По убыванию"
            onClick={() => onClickSortArr(desc)}
            sorting={Direction.Descending}
            extraClass="mr-40"
          />
          <Button
            disabled={isLoader !== array && isLoader !== initial}
            text="Новый массив"
            onClick={onClickCreateArr}
          />
        </div>
      </form>
      <ul className={styles.list}>
        {randomArr &&
          randomArr.length > 0 &&
          randomArr.map(
            (element: TRandomArr, index: number, state: TRandomArr[]) => {
              return (
                <Column key={index} index={element.num} state={element.state} />
              );
            }
          )}
      </ul>
    </SolutionLayout>
  );
};
