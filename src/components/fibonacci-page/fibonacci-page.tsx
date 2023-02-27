import React, { FormEvent, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAXLENGTH, MINVALUE } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [arrFib, setArrFib] = useState<number[]>()
  
  const buttonValidation = MINVALUE <= parseInt(inputValue, 10) ? false : true;

  const fib = (n: number): number => {
    if (n <= 2) {
      return 1
    }
    return fib(n - 2) + fib(n-1);
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    let string = e.currentTarget.value.replace(/[^0-9]/g, "");
    console.log(string)
    const parseString = parseInt(string, 10);
    if (parseString > 19) {
      string = "19"
    } else if (parseString <= 0) {
      string = "1"
    }
    setInputValue(string);
  };

  const onClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const arrN = inputValue.split('');
    console.log(arrN)
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
          onClick={onClick}
          disabled={buttonValidation}
          isLoader={isLoader}
          text="Развернуть"
        />
      </form>
    </SolutionLayout>
  );
};
