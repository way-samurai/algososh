import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { array, asc, desc, initial } from "./utils";
import { Column } from "../ui/column/column";
import { TRandomArr } from "../../types/sorting-page";

export const SortingPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<string>(initial);
  const [radioOption, setRadioOption] = useState<string>("selection-sort");
  const [randomArr, setRandomArr] = useState<TRandomArr[]>();

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setRadioOption((e.target as HTMLInputElement).value);
  };

  const onClickCreateArr = () => {};

  const onClickSortArr = (direction: string) => {};

  useEffect(() => {
    //
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radioInputs}>
          <RadioInput
            disabled={isLoader === desc || isLoader === asc}
            label="Выбор"
            name={"sorting-type"}
            value={"selection-sort"}
            defaultChecked
            extraClass="mr-20"
            onChange={onChangeRadio}
          />
          <RadioInput
            disabled={isLoader === desc || isLoader === asc}
            label="Пузырек"
            name={"sorting-type"}
            value={"bubble-sort"}
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
