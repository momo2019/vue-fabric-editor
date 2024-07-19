import { ElementItem, TextNode } from '@/interfaces/element';
import { ref, Ref } from 'vue';
import { EditorReturnType } from './useEditor';
import { FONTFAMILY_LIST } from '@/mocks/text';
import { OptionItem } from '@/interfaces/common';
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_FAMILY_LABEL } from '@/utils/config';

export const useTextOperate = (
  activeNode: Ref<ElementItem<TextNode>>,
  editor: EditorReturnType
) => {
  const fontFamilyList = ref<OptionItem[]>([
    {
      label: DEFAULT_FONT_FAMILY_LABEL,
      value: DEFAULT_FONT_FAMILY,
    },
    ...FONTFAMILY_LIST,
  ]);

  const setFontSize = (size: number) => {
    activeNode.value.fontSize = size;
    editor.setFbNodeInfo('fontSize', size);
  };

  const setFontText = (text: string) => {
    activeNode.value.data = text;
    editor.setFbNodeInfo('text', text);
  };

  const setFontFamily = (fontFamily: string) => {
    activeNode.value.fontFamily = fontFamily;
    editor.setFbNodeInfo('fontFamily', fontFamily);
  };

  return {
    fontFamilyList,
    setFontSize,
    setFontText,
    setFontFamily,
  };
};
