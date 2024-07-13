import { ElementItem } from '@/interfaces/element';
import { ComputedRef, Ref } from 'vue';
const minDuration = 1;

export const useOperate = (
  activeNode: Ref<ElementItem | null>,
  activeNodeShowValue: ComputedRef<Required<ElementItem> | null>,
  duration: Ref<number>,
  requestRenderAll: () => void,
  getActiveNode: () => fabric.Object | null
) => {
  const setStartTime = (time: number) => {
    if (activeNodeShowValue.value && activeNode.value) {
      activeNode.value.startTime = Math.max(time, 0);
      if (activeNodeShowValue.value.startTime + minDuration > activeNodeShowValue.value.endTime) {
        activeNode.value.startTime = activeNodeShowValue.value.endTime - minDuration;
      }
    }
  };

  const setEndTime = (time: number) => {
    if (activeNodeShowValue.value && activeNode.value) {
      activeNode.value.endTime = time;
      if (activeNodeShowValue.value.startTime + minDuration > activeNodeShowValue.value.endTime) {
        activeNode.value.endTime = activeNodeShowValue.value.startTime + minDuration;
      }
      if (activeNodeShowValue.value.endTime >= duration.value) {
        activeNode.value.endTime = undefined;
      }
    }
  };

  const setFbNodeInfo = <T extends keyof fabric.Object>(key: T, value: fabric.Object[T]) => {
    const activeFbNode = getActiveNode();
    if (activeFbNode) {
      activeFbNode[key] = value;
      requestRenderAll();
      return true;
    }
    return false;
  };

  const setX = (x: number) => {
    // TODO 需要根据分辨率限制一下
    if (setFbNodeInfo('left', x) && activeNode.value) {
      activeNode.value.x = x;
    }
  };

  const setY = (y: number) => {
    // TODO 需要根据分辨率限制一下
    if (setFbNodeInfo('top', y) && activeNode.value) {
      activeNode.value.y = y;
    }
  };

  return {
    setStartTime,
    setEndTime,
    setX,
    setY,
  };
};
