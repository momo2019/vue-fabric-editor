import { formatDuration } from '@/utils/format';

export const cvsHeight = 24;
export const timeGap = 10; // 每格之间的距离

const getCanvasSize = (number: number) => number * window.devicePixelRatio;

const lineGap = getCanvasSize(timeGap);
const lineWidth = getCanvasSize(1);
const smallLineHeight = getCanvasSize(cvsHeight * 0.3);
const bigLineHeight = getCanvasSize(cvsHeight * 0.6);
const fontGap = getCanvasSize(8);
const fontSize = getCanvasSize(10);
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
  const start = lineWidth / 2;

  const linNum = duration / gap;
  const width = linNum * lineGap + start * 3;

  cvs.style.width = `${width / window.devicePixelRatio}px`;

  cvs.width = width;
  cvs.height = getCanvasSize(cvsHeight);
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();

  ctx.textAlign = 'center';
  ctx.font = `${fontSize}px serif`;

  for (let i = 0; i <= linNum; i++) {
    const isBig = i % 5 === 0;
    const x = start + i * lineGap;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, isBig ? bigLineHeight : smallLineHeight);
    ctx.stroke();

    if (isBig && i > 0) {
      ctx.fillText(`${formatDuration(i * gap)}`, x, bigLineHeight + fontGap);
    }
  }
};
