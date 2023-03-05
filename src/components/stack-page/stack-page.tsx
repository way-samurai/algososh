import React, { useState, useEffect, FormEvent } from "react";
import { TProcess } from "../../types/stack";
import { MAXLENGTH, MAXSIZE, stack } from "./constants";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { TStackElement } from "../../types/stack";
import { pause } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

export const StackPage: React.FC = () => {
  const {inputValue, setInputValue} = useForm('');
  const [isProgress, setIsProgress] = useState<TProcess>({
    isAdding: false,
    isRemoving: false,
  });
  const [stackArr, setStackArr] = useState<TStackElement[]>([]);

  const resetForm = (): void => {
    setIsProgress({ isAdding: false, isRemoving: false });
    setInputValue("");
    setStackArr([]);
    stack.clear();
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleAdd = async () => {
    setIsProgress({ ...isProgress, isAdding: true });
    stack.push({ value: inputValue, state: ElementStates.Changing });
    setStackArr(stack.getElements());
    setInputValue("");
    await pause(SHORT_DELAY_IN_MS);
    const stackPeak = stack.peak();

    if (stackPeak) {
      stackPeak.state = ElementStates.Default;
      setStackArr(stack.getElements());
      setIsProgress({ ...isProgress, isAdding: false });
    }
  };

  const handleRemove = async () => {
    setIsProgress({ ...isProgress, isRemoving: true });
    const stackPeak = stack.peak();
    if (stackPeak) {
      stackPeak.state = ElementStates.Changing;
    }
    await pause(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr(stack.getElements());
    setIsProgress({ ...isProgress, isRemoving: false });
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.input_group}>
          <Input
            isLimitText
            maxLength={MAXLENGTH}
            value={inputValue}
            onChange={onChange}
            placeholder="Введите текст"
            disabled={stack.getSize() >= MAXSIZE}
            extraClass="mr-6"
          />
          <Button
            type="button"
            text="Добавить"
            onClick={() => handleAdd()}
            isLoader={isProgress.isAdding}
            disabled={
              isProgress.isRemoving || stack.getSize() >= MAXSIZE || !inputValue
            }
            extraClass="mr-6"
          />
          <Button
            type="button"
            text="Удалить"
            onClick={() => handleRemove()}
            isLoader={isProgress.isRemoving}
            disabled={stackArr.length < 1 || isProgress.isAdding}
            extraClass="mr-6"
          />
        </div>
        <Button
          type="button"
          text="Очистить"
          onClick={() => resetForm()}
          disabled={
            isProgress.isAdding ||
            isProgress.isRemoving ||
            (!inputValue && stack.getSize() === 0)
          }
        />
      </form>
      <ul className={styles.list}>
        {stackArr.length > 0 &&
          stackArr.map((item, index: number) => {
            return (
              <Circle
                key={index}
                letter={item.value || ""}
                index={index}
                head={stack.getSize() - 1 === index ? "top" : ""}
                state={item.state}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
