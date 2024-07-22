import { nextTick } from 'process';
import { ref } from 'vue';
import { EditorReturnType } from './useEditor';

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

  return {
    global,
    setGlobalWidth,
    setGlobalHeight,
  };
};
