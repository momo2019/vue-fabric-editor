export const formatTwoNumber = (num: number) => {
  if (num < 10) {
    return `0${Math.floor(num)}`;
  } else {
    return `${Math.floor(num)}`;
  }
};

export const formatDuration = (duration: number, hasMil = false) => {
  let result = '';
  const h = Math.floor(duration / 3600);
  if (h) {
    result += `${formatTwoNumber(h)}:`;
  }
  duration %= 3600;

  const m = Math.floor(duration / 60);

  result += `${formatTwoNumber(m)}:`;

  duration %= 60;

  result += `${formatTwoNumber(duration)}`;

  if (hasMil) {
    result += `.${(duration % 1).toFixed(2).slice(2)}`;
  }

  return result;
};
