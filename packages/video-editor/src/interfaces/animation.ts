export enum WipeType {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type AnimationStep = {
  opacity?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  scale?: number;
  wipe?: WipeType;
  isWipeOut?: boolean;
};

export type AnimationCore = {
  from: AnimationStep;
  to: AnimationStep;
  ease?: string;
};
