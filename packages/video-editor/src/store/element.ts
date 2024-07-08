import { ElementItem } from '@/interfaces/element';
import { useEditor } from '@/utils/useEditor';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/utils/useTimeLine';

export const elementStore = defineStore('element', () => {
  const nodes = ref<ElementItem[]>([]);
  const activeNode = ref<ElementItem | null>();

  const timeLine = useTimeLine();

  const editor = useEditor<MaterialItem>({
    afterAdd: (data, uid) => {
      nodes.value.push({
        ...data,
        uid,
      });
    },
    chooseOne: (uid: string) => {
      activeNode.value = nodes.value.find((item) => item.uid === uid);
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
    ...timeLine,
    ...editor,
  };
});
