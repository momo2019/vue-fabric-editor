import { ElementItem, TextNode } from '@/interfaces/element';
import { Ref } from 'vue';
import { EditorReturnType } from './useEditor';

export const useTextOperate = (
  activeNode: Ref<ElementItem<TextNode>>,
  editor: EditorReturnType
) => {
  const setFontSize = (size: number) => {
    activeNode.value.fontSize = size;
    editor.setFbNodeInfo('fontSize', size);
  };

  const setFontText = (text: string) => {
    activeNode.value.data = text;
    editor.setFbNodeInfo('text', text);
  };

  return {
    setFontSize,
    setFontText,
  };
};
