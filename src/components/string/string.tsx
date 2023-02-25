import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} >
        <input />
        <Button />
      </form>
      <ul className={styles.list}>
        {/* {reversArray.map((letter: string, index: number) => {
          return (
            <Circle
              key={index}
              letter={letter}
              index={index + 1}
              // state={stateCircle(currentIndex, index, reversArray)}
            />)
        })} */}
      </ul>
    </SolutionLayout>
  );
};
