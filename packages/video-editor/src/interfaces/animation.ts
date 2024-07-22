export type AnimationStep = {
  opacity?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type AnimationCore = {
  from: AnimationStep;
  to: AnimationStep;
};
