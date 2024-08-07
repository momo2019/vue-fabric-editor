import { ref, nextTick } from 'vue';
import { EditorReturnType } from './useEditor';
import { BackgoundType } from '@/interfaces/common';
import { BACKGROUND_COLOR } from '@/utils/config';
import { IMAGE_LIST, VIDEO_LIST } from '@/mocks/material';

export type GlobalInfo = {
  height: number;
  width: number;
  zoom: number;
  top: number;
  left: number;
};

export const useGlobal = (editor: EditorReturnType) => {
  const global = ref<GlobalInfo>({
    height: 1920,
    width: 1080,
    zoom: 1,
    top: 0,
    left: 0,
  });

  const setGlobalInfo = (data: Partial<GlobalInfo>) => {
    if (typeof data.zoom === 'number' && global.value.zoom !== data.zoom) {
      global.value.zoom = data.zoom;
    }
    if (typeof data.top === 'number' && global.value.top !== data.top) {
      global.value.top = data.top;
    }
    if (typeof data.left === 'number' && global.value.left !== data.left) {
      global.value.left = data.left;
    }
    (data.width || data.height) && setGlobalWidhtAndHeight(data.width, data.height);
  };

  const setGlobalWidhtAndHeight = (width?: number, height?: number) => {
    if (global.value.height !== height || global.value.width !== width) {
      global.value.height = height || global.value.height;
      global.value.width = width || global.value.width;
      editor.setWorkspaseSize(global.value.width, global.value.height);
    }
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
      // TODO
    }
  };

  return {
    global,
    setGlobalInfo,
    setGlobalWidhtAndHeight,
    background,
    setBackground,
    backgroundImageList,
    backgroundVideoList,
  };
};

export type GlobalReturnType = ReturnType<typeof useGlobal>;
