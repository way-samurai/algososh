import React, { FormEvent, useEffect, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getFibonacciNumbers} from "./utils";
import { MAXLENGTH, MAXVALUE, MINVALUE } from "./constants"
import { Circle } from "../ui/circle/circle";
import { pause } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const {inputValue, setInputValue} = useForm('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [fibArr, setFibArr] = useState<number[]>([]);

  const buttonValidation = MINVALUE <= parseInt(inputValue, 10) ? false : true;

  const renderFibArr = async (inputValues: string) => {
    const fibArr = getFibonacciNumbers(inputValues);
    const renderFibArr = [];
    for (let i = 0; i <= fibArr.length - 1; i++) {
      await pause(SHORT_DELAY_IN_MS);
      renderFibArr.push(fibArr[i]);
      setFibArr([...renderFibArr]);
    }
    setIsLoader(false);
  };

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    let string = e.currentTarget.value.replace(/[^0-9]/g, "");
    const parseString = parseInt(string, 10);
    if (parseString > 19) {
      string = "19";
    } else if (parseString <= 0) {
      string = "";
    }
    setInputValue(string);
  };

  const onClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoader(true);
    setFibArr([]);
    renderFibArr(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    return () => {
      setFibArr([])
    }
  }, [])
  

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()} data-cy="form">
        <Input
          onChange={onChange}
          disabled={isLoader}
          isLimitText={true}
          maxLength={MAXLENGTH}
          max={MAXVALUE}
          value={inputValue}
          type='number'
          extraClass="mr-6"
          data-cy="input"
        />
        <Button
          onClick={onClick}
          disabled={buttonValidation}
          isLoader={isLoader}
          text="Развернуть"
          data-cy="submit"
        />
      </form>
      <ul className={styles.list}>
        {fibArr &&
          fibArr.map((item, index) => {
            return <Circle key={index} letter={`${item}`} index={index} />;
          })}
      </ul>
    </SolutionLayout>
  );
};
