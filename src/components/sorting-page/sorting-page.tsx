import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import {
  generateRandomArray,
  getBubbleSortSteps,
  getColumnState,
  getSelectionSortSteps,
} from "./utils";
import { Column } from "../ui/column/column";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import {
  asc,
  desc,
  initial,
  radioBubbleSort,
  radioSelectionSort,
} from "./constants";
import { Step } from "../../types/sorting";

export const SortingPage: React.FC = () => {
  const randomArr = useRef<number[]>(generateRandomArray());
  const intervalRef = useRef<NodeJS.Timeout>();

  const [isLoader, setIsLoader] = useState<string>(initial);
  const [sortingMethod, setSortingMethod] =
    useState<string>(radioSelectionSort);
  const [algoSortingSteps, setAlgoSortingSteps] = useState<Step[]>([
    { currantArray: randomArr.current, sortedIndsArray: [] },
  ]);
  const [currentAlgoStep, setCurrentAlgoStep] = useState<number>(0);

  const renderNewRandomArr = () => {
    randomArr.current = generateRandomArray();
    setAlgoSortingSteps([
      { currantArray: randomArr.current, sortedIndsArray: [] },
    ]);
    setCurrentAlgoStep(0);
  };

  const startSortAlgoritm = (direction: string): void => {
    const directionAsc = direction === Direction.Ascending ? true : false;

    const steps = (
      sortingMethod === radioSelectionSort
        ? getSelectionSortSteps
        : getBubbleSortSteps
    )(randomArr.current, directionAsc);

    setAlgoSortingSteps(steps);
    setCurrentAlgoStep(0);

    if (steps.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentAlgoStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep >= steps.length - 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsLoader(initial);
          }
          return nextStep;
        });
      }, SHORT_DELAY_IN_MS);
    }
  };

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setSortingMethod((e.target as HTMLInputElement).value);
  };

  const onClickCreateArr = () => {
    renderNewRandomArr();
  };

  const onClickSortArr = async (direction: string): Promise<void> => {
    startSortAlgoritm(direction);
    setIsLoader(direction);
  };

  useEffect(() => {
    renderNewRandomArr();
    return () => setAlgoSortingSteps([]);
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
            disabled={isLoader !== initial}
            text="Новый массив"
            onClick={onClickCreateArr}
          />
        </div>
      </form>
      <ul className={styles.list}>
        {algoSortingSteps.length !== 0 &&
          algoSortingSteps[currentAlgoStep] &&
          algoSortingSteps[currentAlgoStep].currantArray.map(
            (column, index) => {
              return (
                <Column
                  key={index}
                  index={column}
                  state={getColumnState(
                    index,
                    algoSortingSteps.length - 1,
                    currentAlgoStep,
                    algoSortingSteps[currentAlgoStep]
                  )}
                />
              );
            }
          )}
      </ul>
    </SolutionLayout>
  );
};
