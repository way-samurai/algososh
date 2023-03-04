import { ElementStates } from './element-states';

export type TQueueElement = {
  value: string;
  state: ElementStates;
};

export type TProcess = { isAdding: boolean; isRemoving: boolean };

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getElements: () => (T | null)[];
  getSize: () => number;
  getLength: () => number;
  getHead: () => number;
  getTail: () => number;
  clear: () => void;
  isEmpty: () => boolean;
}