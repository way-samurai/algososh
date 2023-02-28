import React, { FormEvent, useState } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput label="x"/>
        {/* <Button
          onClick={onClick}
          disabled={buttonValidation}
          isLoader={isLoader}
          text="Развернуть"
        /> */}
      </form>
    </SolutionLayout>
  );
};
