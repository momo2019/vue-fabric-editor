import { computed, ref } from 'vue';

export const timeGap = 10; // 每格之间的距离

export const useTimeLine = () => {
  const duration = ref(100);
  const curTime = ref(0);
  const lineGapTime = ref(1); // 单个代表多少秒
  const perSecGapWidth = computed(() => timeGap / lineGapTime.value); // 每秒的间隔

  return {
    duration,
    curTime,
    lineGapTime,
    perSecGapWidth,
  };
};
