import { ElementItem } from '@/interfaces/element';
import { useEditor } from '@/utils/useEditor';
import { defineStore } from 'pinia';
import { v4 } from 'uuid';
import { ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/utils/useTimeLine';

export const elementStore = defineStore('element', () => {
  const nodes = ref<ElementItem[]>([]);

  const timeLine = useTimeLine();

  const editor = useEditor<MaterialItem>({
    afterAdd: (data) => {
      nodes.value.push({
        ...data,
        uid: v4(),
      });
    },
  });

  return {
    nodes,
    ...timeLine,
    ...editor,
  };
});
