import { ElementItem } from '@/interfaces/element';
import { elementStore } from '@/store/element';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export const useMoveLine = () => {
  const store = elementStore();

  const boxRef = ref<HTMLDivElement>();

  let isStart = true;
  let startX = 0;
  const isMoving = ref(false);

  const startMove = (ev: MouseEvent, item: ElementItem, pos: 'left' | 'right') => {
    store.setActiveNode(item);
    isStart = pos === 'left';
    startX = ev.pageX;
    ev.stopPropagation();
    ev.preventDefault();
    isMoving.value = true;
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
    if (!isMoving.value) {
      return;
    }
    const { pageX } = ev;

    ev.stopPropagation();
    ev.preventDefault();
    const xGap = pageX - startX;
    const lastStartTime = store.activeNodeShowValue!.startTime;
    const lastEndTime = store.activeNodeShowValue!.endTime;
    if (isStart) {
      store.setStartTime(lastStartTime + xGap / store.perSecGapWidth);
    } else {
      store.setEndTime(lastEndTime + xGap / store.perSecGapWidth);
    }
    setBoxScrollX(pageX, xGap);
    startX = pageX;
  };

  const endMove = (ev: MouseEvent) => {
    isMoving.value = false;
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
