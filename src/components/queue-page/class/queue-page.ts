import { IQueue } from "../../../types/queue";

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  init = (arr: T[]) => {
    this.container = [...arr];
  };

  //Все эти условия помогают отслеживать пустые ячейки в начале
  //очереди и перезаписывать освободившиеся ячейки
  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else if (
      (this.tail === this.size || this.head === this.size) &&
      this.isEmpty()
    ) {
      this.tail = 0;
      this.head = 0;
      this.length = 0;
    } else if (
      (this.tail === this.size || this.head === this.size) &&
      !this.isEmpty()
    ) {
      this.tail = 0;
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    } else {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.tail === this.size && this.head === this.size && this.isEmpty()) {
      this.tail = 0;
      this.head = 0;
      this.length = 0;
      return null;
    } else if (this.tail === this.size + 1 && !this.isEmpty()) {
      this.tail = 0;
      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    } else if (this.head === this.size - 1 && !this.isEmpty()) {
      this.head = 0;
      this.container[this.size - 1] = null;
      this.length--;
    } else {
      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) return null;
    return this.container[this.head % this.size];
  };

  getElements = () => {
    return this.container;
  };

  getSize = () => {
    return this.size;
  };

  getLength = () => {
    return this.length;
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}
