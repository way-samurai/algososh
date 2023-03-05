import { ElementStates } from "./element-states";
import { ReactElement } from 'react';

export type TListElement = {
  value: string;
  state: ElementStates;
  head: string | ReactElement;
  tail: string | ReactElement;
  extraClass: boolean;
};

export type LinkedArrItem = { value: string; state: ElementStates };

export interface ILinkedList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  addByIndex: (index: number, item: T ) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteByIndex: (index: number) => void;
  changeState: (index: number, state: ElementStates) => void;
  changeValue: (index: number, value: string) => void;
}
