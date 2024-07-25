export const getKeys = <T extends Record<string, any>, F extends string[]>(
  obj: T,
  filter?: F
): Omit<keyof T, F[number]>[] => {
  const temp = Object.keys(obj);
  if (filter) {
    return temp.filter((k) => !filter.includes(k)) as Omit<keyof T, F[number]>[];
  } else {
    return temp as Omit<keyof T, F[number]>[];
  }
};
