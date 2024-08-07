import { computed, ref } from 'vue';

export const timeGap = 10; // 每格之间的距离

type StartCallback = {
  process: (curTime: number, delta: number) => void;
  end: () => void;
  start: () => void;
};

export const useTimeLine = () => {
  const duration = ref(100);
  const curTime = ref(0);
  const lineGapTime = ref(1); // 单个代表多少秒
  const perSecGapWidth = computed(() => timeGap / lineGapTime.value); // 每秒的间隔

  const widthToTime = (width: number) => {
    return width / perSecGapWidth.value;
  };

  const timeToWidth = (time: number) => {
    return time * perSecGapWidth.value;
  };

  const isPreviewing = ref(false);

  const changeDuration = (time: number) => {
    duration.value = time;
    if (duration.value < curTime.value) {
      curTime.value = 0;
    }
    isPreviewing.value = false;
  };

  const stopPreview = () => {
    isPreviewing.value = false;
  };

  const next = (delta: number, lastTime: number, cb: StartCallback) => {
    if (curTime.value >= duration.value) {
      curTime.value = duration.value;
    }
    curTime.value = Number((curTime.value + delta).toFixed(2));
    cb.process(curTime.value, delta);
    if (curTime.value === duration.value || !isPreviewing.value) {
      stopPreview();
      cb.end();
      return;
    }
    const nowTime = performance.now() / 1000;
    requestAnimationFrame(() => next(nowTime - lastTime, nowTime, cb));
  };

  const start = (cb: StartCallback) => {
    if (isPreviewing.value) {
      return;
    }
    isPreviewing.value = true;
    cb.start();
    next(0, performance.now() / 1000, cb);
  };

  return {
    duration,
    curTime,
    lineGapTime,
    perSecGapWidth,
    changeDuration,
    start,
    isPreviewing,
    stopPreview,
    widthToTime,
    timeToWidth,
  };
};

export type TimeLineReturnType = ReturnType<typeof useTimeLine>;
