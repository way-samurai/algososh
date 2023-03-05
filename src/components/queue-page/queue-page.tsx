import React, { FormEvent, useState, useEffect } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { TProcess, TQueueElement } from "../../types/queue";
import { pause } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAXLENGTH, MAXSIZE, queue } from "./constants";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const {inputValue, setInputValue} = useForm('');
  const [isProgress, setIsProgress] = useState<TProcess>({
    isAdding: false,
    isRemoving: false,
  });
  const [queueArr, setQueueArr] = useState<(TQueueElement | null)[]>([]);

  const renderQueueArr = () => {
    const arrForRender = [];
    const queueTemp = queue.getElements();
    for (let i = 0; i < MAXSIZE; i++) {
      if (queueTemp[i]) {
        arrForRender.push(queueTemp[i]);
      } else {
        arrForRender.push({ value: "", state: ElementStates.Default });
      }
    }
    setQueueArr(arrForRender);
  };

  const resetForm = (): void => {
    setInputValue("");
    queue.clear();
    renderQueueArr();
    setIsProgress({
      isAdding: false,
      isRemoving: false,
    });
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleEnqueue = async () => {
    setIsProgress({ ...isProgress, isAdding: true });
    queue.enqueue({ value: inputValue, state: ElementStates.Changing });
    renderQueueArr();
    setInputValue("");
    await pause(SHORT_DELAY_IN_MS);
    const queueElements = queue.getElements();
    const queueTailElm = queueElements[queue.getTail() - 1];
    if (queueTailElm) {
      queueTailElm.state = ElementStates.Default;
    }
    renderQueueArr();
    setIsProgress({ ...isProgress, isAdding: false });
  };

  const handleDequeue = async () => {
    setIsProgress({ ...isProgress, isRemoving: true });
    const headItem = queue.peak();
    if (headItem) {
      headItem.state = ElementStates.Changing;
    }
    renderQueueArr();
    await pause(SHORT_DELAY_IN_MS);
    queue.dequeue();
    renderQueueArr();
    if (queue.isEmpty()) {
      queue.clear();
    }
    setIsProgress({ ...isProgress, isRemoving: false });
  };

  useEffect(() => {
    renderQueueArr();
    return () => {
      resetForm();
    };
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <div className={styles.input_group}>
          <Input
            isLimitText
            maxLength={MAXLENGTH}
            value={inputValue}
            onChange={onChange}
            placeholder="Введите текст"
            disabled={queue.getLength() >= MAXSIZE}
            extraClass="mr-6"
          />
          <Button
            type="button"
            text="Добавить"
            onClick={() => handleEnqueue()}
            isLoader={isProgress.isAdding}
            disabled={
              isProgress.isAdding ||
              isProgress.isRemoving ||
              queue.getLength() === MAXSIZE ||
              !inputValue
            }
            extraClass="mr-6"
          />
          <Button
            type="button"
            text="Удалить"
            onClick={() => handleDequeue()}
            isLoader={isProgress.isRemoving}
            disabled={
              queue.isEmpty() || isProgress.isRemoving || isProgress.isAdding
            }
            extraClass="mr-6"
          />
        </div>
        <Button
          type="button"
          text="Очистить"
          onClick={() => resetForm()}
          disabled={
            isProgress.isAdding || isProgress.isRemoving || queue.isEmpty()
          }
        />
      </form>
      <ul className={styles.list}>
        {queueArr.map((item: any, index: number) => {
          return (
            <Circle
              key={index}
              letter={item.value || ""}
              index={index}
              tail={
                queue.getTail() === index + 1 && !queue.isEmpty() ? "tail" : ""
              }
              head={
                queue.getHead() === index &&
                queueArr[queue.getHead()] &&
                !queue.isEmpty()
                  ? "head"
                  : ""
              }
              state={item.state}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
