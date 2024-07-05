export const cvsHeight = 20;

const lineGap = 10;
const lineWidth = 2;
const smallLineHeight = cvsHeight * 0.5;
const bigLineHeight = cvsHeight * 0.8;
const lineColor = '#a1a1a1';

export const timeLineCanvas = (options: {
  cvs: HTMLCanvasElement;
  duration: number;
  gap?: number;
}) => {
  const { cvs, duration, gap = 1 } = options;
  const ctx = cvs.getContext('2d');
  if (!ctx) {
    return;
  }

  const linNum = 1 + duration / gap; // 1为00:00

  const height = cvs.height;
  const width = linNum * lineGap;
  cvs.width = width;
  cvs.style.width = `${width}px`;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;

  const start = lineWidth / 2;

  for (let i = 0; i < linNum; i++) {
    ctx.beginPath();
    ctx.moveTo(start + i * lineGap, 0);
    ctx.lineTo(start + i * lineGap, i % 5 ? smallLineHeight : bigLineHeight);
    ctx.stroke();
  }
};
