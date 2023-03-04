import { TQueueElement } from "../../types/queue";
import { Queue } from "./class/queue-page";

export const MAXLENGTH: number = 4;
export const MAXSIZE: number = 7;

export const queue = new Queue<TQueueElement>(MAXLENGTH);