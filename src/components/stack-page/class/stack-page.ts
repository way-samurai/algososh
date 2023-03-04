import { IStack } from '../../../types/stack';

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  peak = (): T | null => {
    const length = this.getSize();
    if (length> 0) {
      return this.container[length - 1];
    }
    return null;
  };

  getElements = () => {
    return this.container;
  };

  getSize = (): number => this.container.length;
}