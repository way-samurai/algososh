import { ElementStates } from "./element-states";

export interface  ICircle {
    tail?: string;
    head?: string;
    value: string;
    state: ElementStates;
}