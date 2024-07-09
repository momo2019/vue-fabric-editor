import { ElementItem } from '@/interfaces/element';
import { ComputedRef, Ref } from 'vue';
const minDuration = 1;

export const useOperate = (
  activeNode: Ref<ElementItem | null>,
  activeNodeStartTime: ComputedRef<number>,
  activeNodeEndTime: ComputedRef<number>,
  duration: Ref<number>
) => {
  const setStartTime = (time: number) => {
    if (activeNode.value) {
      activeNode.value.startTime = Math.max(time, 0);
      if (activeNodeStartTime.value + minDuration > activeNodeEndTime.value) {
        activeNode.value.startTime = activeNodeEndTime.value - minDuration;
      }
    }
  };

  const setEndTime = (time: number) => {
    if (activeNode.value) {
      activeNode.value.endTime = time;
      if (activeNodeStartTime.value + minDuration > activeNodeEndTime.value) {
        activeNode.value.endTime = activeNodeStartTime.value + minDuration;
      }
      if (activeNodeEndTime.value >= duration.value) {
        activeNode.value.endTime = undefined;
      }
    }
  };

  return {
    setStartTime,
    setEndTime,
  };
};
