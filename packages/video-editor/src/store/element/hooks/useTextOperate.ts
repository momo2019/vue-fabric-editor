import { ElementItem, TextNode } from '@/interfaces/element';
import { ref, Ref } from 'vue';
import { EditorReturnType } from './useEditor';
import { FONTFAMILY_LIST } from '@/mocks/text';
import { OptionItem } from '@/interfaces/common';
import { DEFAULT_FONT_CONFIG } from '@/utils/config';

export const useTextOperate = (
  activeNode: Ref<ElementItem<TextNode>>,
  editor: EditorReturnType
) => {
  const fontFamilyList = ref<OptionItem[]>([
    {
      label: DEFAULT_FONT_CONFIG.fontfamily,
      value: DEFAULT_FONT_CONFIG.fontfamily,
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

  const setFontWeight = (isBold: boolean) => {
    activeNode.value.fontWeight = isBold ? 'bold' : 'normal';
    editor.setFbNodeInfo('fontWeight', isBold ? 'bold' : 'normal');
  };

  const setFontStyle = (isItalic: boolean) => {
    activeNode.value.fontStyle = isItalic ? 'italic' : 'normal';
    editor.setFbNodeInfo('fontStyle', isItalic ? 'italic' : 'normal');
  };

  const setFontColor = (color: string) => {
    activeNode.value.color = color;
    editor.setFbNodeInfo('fill', color);
  };

  return {
    fontFamilyList,
    setFontSize,
    setFontText,
    setFontFamily,
    setFontWeight,
    setFontStyle,
    setFontColor,
  };
};
