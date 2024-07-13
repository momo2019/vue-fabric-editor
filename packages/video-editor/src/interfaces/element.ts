import { MaterialItem } from './material';

export type ElementItem = {
  uid: string;
  startTime?: number;
  endTime?: number;
  x?: number;
  y?: number;
} & MaterialItem;
