import { MaterialType } from './material';

export type BaseNode = {
  width: number;
  height: number;
  startTime?: number;
  endTime?: number;
  x?: number;
  y?: number;
  rotation?: number;
  clip?: string;
};

export type TextNode = {
  type: MaterialType.text;
  data: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
};

export type ImageNode = {
  type: MaterialType.image;
  data: string;
};

export type VideoNode = {
  type: MaterialType.video;
  data: string;
  loop?: boolean;
  vol?: number;
};

export type ElementItem = {
  uid: string;
} & BaseNode &
  (TextNode | ImageNode | VideoNode);
