import { ref, nextTick } from 'vue';
import { EditorReturnType } from './useEditor';
import { BackgoundType } from '@/interfaces/common';
import { BACKGROUND_COLOR } from '@/utils/config';
import { IMAGE_LIST, VIDEO_LIST } from '@/mocks/material';

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
    editor.setWorkspaseSize(global.value.width, global.value.height);
  };

  const setGlobalHeight = (height: number) => {
    if (global.value.height === height) {
      return;
    }
    global.value.height = height;
    editor.setWorkspaseSize(global.value.width, global.value.height);
  };

  const setGlobalWidhtAndHeight = (width: number, height: number) => {
    if (global.value.height !== height) {
      global.value.height = height;
    }
    if (global.value.width !== width) {
      global.value.width = width;
    }
    editor.setWorkspaseSize(global.value.width, global.value.height);
  };

  nextTick(() => {
    editor.setWorkspaseSize(global.value.width, global.value.height);
  });

  const background = ref({
    type: BackgoundType.color,
    data: BACKGROUND_COLOR,
  });

  const backgroundImageList = ref(IMAGE_LIST);
  const backgroundVideoList = ref(VIDEO_LIST);

  const setBackground = ({ type, data }: { type?: BackgoundType; data?: string }) => {
    background.value.type = type ?? background.value.type;
    background.value.data = data ?? background.value.data;
    switch (type) {
      case BackgoundType.video:
        background.value.data = backgroundVideoList.value[0].value;
        break;
      case BackgoundType.image:
        background.value.data = backgroundImageList.value[0].value;
        break;
      case BackgoundType.color:
        background.value.data = BACKGROUND_COLOR;
        editor.changeBackgroundColor(background.value.data);
        break;
    }
    if (background.value.type === BackgoundType.color) {
      editor.changeBackgroundColor(background.value.data);
    } else {
      editor.addMediaBackground(
        background.value.data,
        background.value.type === BackgoundType.video
      );
    }
  };

  return {
    global,
    setGlobalWidth,
    setGlobalHeight,
    setGlobalWidhtAndHeight,
    background,
    setBackground,
    backgroundImageList,
    backgroundVideoList,
  };
};

export type GlobalReturnType = ReturnType<typeof useGlobal>;
