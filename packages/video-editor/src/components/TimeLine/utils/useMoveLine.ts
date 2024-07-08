import { ElementItem } from '@/interfaces/element';
import { elementStore } from '@/store/element';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const minDuration = 2;

export const useMoveLine = () => {
  const store = elementStore();

  const boxRef = ref<HTMLDivElement>();

  let activeItem: ElementItem | null = null;
  let isStart = true;

  let startX = 0;

  const startMove = (ev: MouseEvent, item: ElementItem, pos: 'left' | 'right') => {
    activeItem = item;
    isStart = pos === 'left';
    startX = ev.pageX;
    ev.stopPropagation();
    ev.preventDefault();
  };

  const setBoxScrollX = (pageX: number, xGap: number) => {
    if (boxRef.value) {
      const { right, left } = boxRef.value.getBoundingClientRect();
      if (pageX < left && xGap < 0) {
        boxRef.value.scrollLeft += xGap;
      }
      if (pageX > right && xGap > 0) {
        boxRef.value.scrollLeft += xGap;
      }
    }
  };

  const moving = (ev: MouseEvent) => {
    if (!activeItem) {
      return;
    }
    const { pageX } = ev;

    ev.stopPropagation();
    ev.preventDefault();
    const xGap = pageX - startX;
    const lastStartTime = activeItem.startTime || 0;
    const lastEndTime = activeItem.endTime || store.duration;
    if (isStart) {
      activeItem.startTime = Math.max(0, lastStartTime + xGap / store.perSecGapWidth);
    } else {
      activeItem.endTime = lastEndTime + xGap / store.perSecGapWidth;
      if (activeItem.endTime >= store.duration) {
        activeItem.endTime = undefined;
      }
    }
    if ((activeItem.startTime || 0) > (activeItem.endTime || store.duration) - minDuration) {
      activeItem.startTime = lastStartTime;
      activeItem.endTime = lastEndTime;
    }
    setBoxScrollX(pageX, xGap);
    startX = pageX;
  };

  const endMove = (ev: MouseEvent) => {
    activeItem = null;
    ev.stopPropagation();
    ev.preventDefault();
  };

  const documentFuncs = [
    ['mouseup', endMove],
    ['mousemove', moving],
    ['mouseleave', endMove],
  ] as const;

  const addOrRemoveEvents = (isRemove = false) => {
    const func = [
      document.documentElement.addEventListener,
      document.documentElement.removeEventListener,
    ][Number(isRemove)];
    documentFuncs.forEach((item) => func(item[0], item[1]));
  };

  onMounted(() => {
    addOrRemoveEvents();
  });

  onBeforeUnmount(() => {
    addOrRemoveEvents(true);
  });

  return {
    startMove,
    boxRef,
  };
};
