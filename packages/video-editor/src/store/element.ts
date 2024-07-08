import { timeGap } from '@/components/TimeLine/utils/timeLineCanvas';
import { ElementItem } from '@/interfaces/element';
import { MOCK_ELEMENETS } from '@/mocks/element';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const elementStore = defineStore('element', () => {
  const nodes = ref<ElementItem[]>(MOCK_ELEMENETS);
  const duration = ref(100);
  const curTime = ref(0);

  const lineGapTime = ref(1); // 单个代表多少秒
  const perSecGapWidth = computed(() => timeGap / lineGapTime.value); // 每秒的间隔

  return { nodes, duration, curTime, perSecGapWidth, lineGapTime };
});
