import { ref, nextTick } from 'vue';
import { EditorReturnType } from './useEditor';
import { BackgoundType } from '@/interfaces/common';
import { CLIP_LIST } from '@/mocks/clip';
import { BACKGROUND_COLOR } from '@/utils/config';

export const useGlobal = (editor: EditorReturnType) => {
  const global = ref({
    height: 1920,
    width: 1080,
  });

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

  nextTick(() => {
    editor.setWorkspaseSize(global.value.width, global.value.height);
  });

  const background = ref({
    type: BackgoundType.color,
    data: BACKGROUND_COLOR,
  });

  const backgroundImageList = ref(CLIP_LIST);

  const setBackground = ({ type, data }: { type?: BackgoundType; data?: string }) => {
    background.value.type = type ?? background.value.type;
    background.value.data = data ?? background.value.data;
    switch (type) {
      case BackgoundType.image:
        background.value.data = backgroundImageList.value[0].value;
        break;
      case BackgoundType.color:
        background.value.data = BACKGROUND_COLOR;
        editor.changeBackgroundColor(background.value.data);
        break;
    }
  };

  return {
    global,
    setGlobalWidth,
    setGlobalHeight,
    background,
    setBackground,
    backgroundImageList,
  };
};

export type GlobalReturnType = ReturnType<typeof useGlobal>;
