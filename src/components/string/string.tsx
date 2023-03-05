import React, { FormEvent, useEffect, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { stateCircle, swap } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { pause } from "../../utils";
import { MAXLENGTH } from "./constants";
import { useForm } from "../../hooks/useForm";

export const StringComponent: React.FC = () => {
  const {inputValue, setInputValue} = useForm('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [reverseArray, setReverseArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const reverseString = async (string: string) => {
    const arrayOfLetters = string.split("");
    const end = arrayOfLetters.length;

    setCurrentIndex(0);
    setIsLoader(true);
    setReverseArray([...arrayOfLetters]);
    await pause(DELAY_IN_MS);

    for (let i = 0; i < Math.floor(end / 2); i++) {
      swap(arrayOfLetters, i, end - 1);
      setCurrentIndex((i) => i + 1);
      setReverseArray([...arrayOfLetters]);
      await pause(DELAY_IN_MS);
    }
    setCurrentIndex((i) => i + 1);
    setIsLoader(false);
  };

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value;
    setInputValue(string);
  };

  const onClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    reverseString(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    return () => {
      setReverseArray([])
    }
  }, [])
  

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          onChange={onChange}
          disabled={isLoader}
          isLimitText={true}
          maxLength={MAXLENGTH}
          value={inputValue}
          extraClass="mr-6"
        />
        <Button
          onClick={onClick}
          disabled={!inputValue}
          isLoader={isLoader}
          text="Развернуть"
        />
      </form>
      <ul className={styles.list}>
        {reverseArray.map((letter: string, index: number) => {
          return (
            <Circle
              key={index}
              letter={letter}
              index={index + 1}
              state={stateCircle(currentIndex, index, reverseArray)}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
