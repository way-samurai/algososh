import React, { FormEvent, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAXLENGTH } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value;
    setInputValue(string);
  };

  const onClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    //вызываем функцию, которая находит и отрисовывает числа фибоначи
    setInputValue("");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
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
          //onClick={onClick}
          disabled={!inputValue}
          isLoader={isLoader}
          text="Развернуть"
        />
      </form>
    </SolutionLayout>
  );
};
