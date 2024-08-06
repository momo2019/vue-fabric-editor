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
    store.setActiveNode(item.uid);
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
      store.setStartTime(lastStartTime + store.widthToTime(xGap));
    } else {
      store.setEndTime(lastEndTime + store.widthToTime(xGap));
    }
    setBoxScrollX(pageX, xGap);
    startX = pageX;
  };

  const endMove = (ev: MouseEvent) => {
    isMoving.value = false;
    ev.stopPropagation();
    ev.preventDefault();
  };

  const isEntering = ref(false);

  const enterBox = () => {
    isEntering.value = true;
  };

  const leaveBox = () => {
    isEntering.value = false;
  };

  const lineOffsetX = ref(0);

  const moveLine = (ev: MouseEvent) => {
    if (!isEntering.value) {
      return;
    }
    const { left } = boxRef.value?.getBoundingClientRect() || { left: 0 };
    const scrollLeft = boxRef.value?.scrollLeft || 0;
    const { pageX } = ev;
    lineOffsetX.value = pageX - left + scrollLeft;
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
    lineOffsetX,
    leaveBox,
    moveLine,
    enterBox,
    isEntering,
  };
};
