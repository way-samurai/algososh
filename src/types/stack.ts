import { ElementStates } from "./element-states";

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  getElements: () => T[];
  getSize: () => number;
}

export type TStackElement = {
  value: string;
  state: ElementStates;
};

export type TProcess = { isAdding: boolean; isRemoving: boolean };
