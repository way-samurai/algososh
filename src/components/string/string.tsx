import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { getCircleState, getReversingStringSteps } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { MAXLENGTH } from "./constants";
import { useForm } from "../../hooks/useForm";

export const StringComponent: React.FC = () => {
  const { inputValue, setInputValue } = useForm("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [reversingAlgoSteps, setReversingAlgoSteps] = useState<string[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startReversingStringAlgoritm = () => {
    setIsLoader(true);
    const steps = getReversingStringSteps(inputValue);
    setReversingAlgoSteps(steps);

    setCurrentStep(0);

    if (steps.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep >= steps.length - 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return nextStep;
        });
      }, DELAY_IN_MS);
    }

    setIsLoader(false);
  };

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const string = e.currentTarget.value;
    setInputValue(string);
  };

  const onClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    startReversingStringAlgoritm();
    setInputValue("");
  };

  useEffect(() => {
    return () => {
      setReversingAlgoSteps([]);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          startReversingStringAlgoritm();
        }}
      >
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
        {reversingAlgoSteps.length > 0 &&
          reversingAlgoSteps[currentStep].map((letter, index) => (
            <Circle
              key={index}
              letter={letter}
              index={index}
              state={getCircleState(
                index,
                reversingAlgoSteps[currentStep].length - 1,
                currentStep,
                currentStep === reversingAlgoSteps.length - 1
              )}
            />
          ))}
      </ul>
    </SolutionLayout>
  );
};
