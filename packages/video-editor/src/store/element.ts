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
  const activeNodeStartTime = computed(() => activeNode.value?.startTime || 0);
  const activeNodeEndTime = computed(() => activeNode.value?.endTime || timeLine.duration.value);

  const operate = useOperate(activeNode, activeNodeStartTime, activeNodeEndTime, timeLine.duration);

  const editor = useEditor<MaterialItem>({
    afterAdd: (data, uid) => {
      nodes.value.push({
        ...data,
        uid,
      });
    },
    chooseOne: (uid: string) => {
      activeNode.value = nodes.value.find((item) => item.uid === uid) || null;
    },
  });

  const setActiveNode = (item: ElementItem) => {
    activeNode.value = item;
    editor.setSelect(item.uid);
  };

  const clearActiveNode = () => {
    activeNode.value = null;
    editor.clearSelect();
  };

  return {
    nodes,
    activeNode,
    setActiveNode,
    clearActiveNode,
    activeNodeStartTime,
    activeNodeEndTime,
    ...operate,
    ...timeLine,
    ...editor,
  };
});
