import React, { FormEvent, useState } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { array, asc, desc, initial } from "./utils";

export const SortingPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<string>(initial);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radioInputs}>
          <RadioInput
            //disabled={isLoader === desc || isLoader === asc}
            label="Выбор"
            name={"sorting-type"}
            value={"selection-sort"}
            defaultChecked
            extraClass="mr-20"
            //onChange={onChangeRadio}
          />
          <RadioInput
            //disabled={isLoader === desc || isLoader === asc}
            label="Пузырек"
            name={"sorting-type"}
            value={"bubble-sort"}
            //onChange={onChangeRadio}
          />
        </div>
        <div className={styles.group}>
          <Button
            isLoader={isLoader === asc}
            disabled={isLoader === desc}
            text="По возрастанию"
            //onClick={() => onClickSort(asc)}
            sorting={Direction.Ascending}
            extraClass="mr-6"
          />
          <Button
            isLoader={isLoader === desc}
            disabled={isLoader === asc}
            text="По убыванию"
            //onClick={() => onClickSort(desc)}
            sorting={Direction.Descending}
            extraClass="mr-40"
          />
          <Button
            disabled={isLoader !== array && isLoader !== initial}
            text="Новый массив"
            //onClick={onClickNewArr}
          />
        </div>
      </form>
      <ul className={styles.list}>
        {/* {randomArray.map(
          (element: IRandomArr, index: number, state: IRandomArr[]) => {
            return (
              <Column key={index} index={element.num} state={element.state} />
            );
          }
        )} */}
      </ul>
    </SolutionLayout>
  );
};
