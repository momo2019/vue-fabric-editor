import { ElementItem } from '@/interfaces/element';
import { useEditor } from '@/store/element/hooks/useEditor';
import { defineStore } from 'pinia';
import { computed, nextTick, ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/store/element/hooks/useTimeLine';
import { useOperate } from '@/store/element/hooks/useOperate';

export const elementStore = defineStore('element', () => {
  const global = ref({
    height: 1920,
    width: 1080,
  });
  const nodes = ref<ElementItem[]>([]);
  const activeNode = ref<ElementItem | null>(null);

  const timeLine = useTimeLine();
  const activeNodeShowValue = computed(() =>
    activeNode.value
      ? ({
          ...activeNode.value,
          startTime: activeNode.value?.startTime || 0,
          endTime: activeNode.value?.endTime || timeLine.duration.value,
          x: activeNode.value.x || 0,
          y: activeNode.value.y || 0,
          rotation: activeNode.value.rotation || 0,
          clip: activeNode.value.clip || '',
        } as Required<ElementItem>)
      : null
  );

  const removeNode = (uid: string) => {
    const index = nodes.value.findIndex((item) => item.uid === uid);
    index !== -1 && nodes.value.splice(index, 1);
  };

  const addNode = (data: MaterialItem, uid: string) => {
    nodes.value.push({
      ...data,
      uid,
      width: 0,
      height: 0,
    });
  };

  const editor = useEditor<MaterialItem>({
    afterAdd: addNode,
    afterRemove: removeNode,
    chooseOne: (uid: string) => {
      activeNode.value = nodes.value.find((item) => item.uid === uid) || null;
    },
    clearChoose: () => {
      activeNode.value = null;
    },
    updateActiveInfo: (data) => updateActiveInfo(data),
    updateGlobelInfo: (data) => {
      setGlobalWidth(data.width);
      setGlobalHeight(data.height);
    },
  });

  nextTick(() => {
    editor.setWorkspaseSize(global.value.width, global.value.height);
  });

  const operate = useOperate(activeNode, activeNodeShowValue, timeLine.duration, editor);

  const setActiveNode = (item: ElementItem) => {
    editor.setSelect(item.uid);
  };

  const clearActiveNode = () => {
    activeNode.value = null;
    editor.clearSelect();
  };

  const updateActiveInfo = (data: fabric.Object) => {
    if (activeNode.value) {
      activeNode.value.x = data.left;
      activeNode.value.y = data.top;
      activeNode.value.width = data.getScaledWidth();
      activeNode.value.height = data.getScaledHeight();
      activeNode.value.rotation = data.angle;
    }
  };

  const setGlobalWidth = (width: number) => {
    if (global.value.width === width) {
      return;
    }
    global.value.width = width;
    editor.setWorkspaseSize(global.value.width, global.value.height, false);
  };

  const setGlobalHeight = (height: number) => {
    if (global.value.height === height) {
      return;
    }
    global.value.height = height;
    editor.setWorkspaseSize(global.value.width, global.value.height, false);
  };

  const removeActive = () => {
    activeNode.value && editor.removeObject(activeNode.value.uid);
  };

  return {
    nodes,
    activeNode,
    setActiveNode,
    clearActiveNode,
    activeNodeShowValue,
    global,
    setGlobalHeight,
    setGlobalWidth,
    removeActive,
    ...operate,
    ...timeLine,
    ...editor,
  };
});
