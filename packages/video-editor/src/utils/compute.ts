export const isEqual = (a: number, b: number) => {
  return Math.abs(a - b) < 0.00001;
};
