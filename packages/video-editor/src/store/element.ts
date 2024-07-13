import { ElementItem } from '@/interfaces/element';
import { useEditor } from '@/utils/useEditor';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/utils/useTimeLine';
import { useOperate } from '@/utils/useOperate';

export const elementStore = defineStore('element', () => {
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
        } as Required<ElementItem>)
      : null
  );

  const editor = useEditor<MaterialItem>({
    afterAdd: (data, uid) => {
      nodes.value.push({
        ...data,
        uid,
        width: 0,
        height: 0,
      });
    },
    chooseOne: (uid: string) => {
      activeNode.value = nodes.value.find((item) => item.uid === uid) || null;
    },
    clearChoose: () => {
      activeNode.value = null;
    },
    updateActiveInfo: (data) => updateActiveInfo(data),
  });

  const operate = useOperate(
    activeNode,
    activeNodeShowValue,
    timeLine.duration,
    editor.requestRenderAll,
    editor.getActiveObject
  );

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

  return {
    nodes,
    activeNode,
    setActiveNode,
    clearActiveNode,
    activeNodeShowValue,
    ...operate,
    ...timeLine,
    ...editor,
  };
});
