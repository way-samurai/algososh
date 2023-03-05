import { useState, ChangeEvent } from "react";

export function useForm(value: string) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };
  return { inputValue, handleChange, setInputValue };
}