import { ElementItem } from '@/interfaces/element';
import { CLIP_LIST } from '@/mocks/clip';
import { ComputedRef, ref, Ref } from 'vue';
import { EditorReturnType } from './useEditor';
const minDuration = 1;

export const useOperate = (
  activeNode: Ref<ElementItem | null>,
  activeNodeShowValue: ComputedRef<Required<ElementItem> | null>,
  duration: Ref<number>,
  editor: EditorReturnType
) => {
  const clipList = ref<
    {
      value: string;
      label: string;
    }[]
  >(CLIP_LIST);

  const setStartTime = (time: number) => {
    if (activeNodeShowValue.value && activeNode.value) {
      activeNode.value.startTime = Math.max(time, 0);
      if (activeNodeShowValue.value.startTime + minDuration > activeNodeShowValue.value.endTime) {
        activeNode.value.startTime = activeNodeShowValue.value.endTime - minDuration;
      }
    }
  };

  const setEndTime = (time: number) => {
    if (activeNodeShowValue.value && activeNode.value) {
      activeNode.value.endTime = time;
      if (activeNodeShowValue.value.startTime + minDuration > activeNodeShowValue.value.endTime) {
        activeNode.value.endTime = activeNodeShowValue.value.startTime + minDuration;
      }
      if (activeNodeShowValue.value.endTime >= duration.value) {
        activeNode.value.endTime = undefined;
      }
    }
  };

  const setFbNodeInfo = <T extends keyof fabric.Object>(key: T, value: fabric.Object[T]) => {
    const activeFbNode = editor.getActiveObject();
    if (activeFbNode) {
      switch (key) {
        case 'width':
          activeFbNode.scaleX = activeFbNode.width ? value / activeFbNode.width : 1;
          break;
        case 'height':
          activeFbNode.scaleY = activeFbNode.height ? value / activeFbNode.height : 1;
          break;
        default:
          activeFbNode[key] = value;
          break;
      }

      editor.requestRenderAll();
      return true;
    }
    return false;
  };

  const setX = (x: number) => {
    // TODO 需要根据分辨率限制一下
    if (setFbNodeInfo('left', x) && activeNode.value) {
      activeNode.value.x = x;
    }
  };

  const setY = (y: number) => {
    // TODO 需要根据分辨率限制一下
    if (setFbNodeInfo('top', y) && activeNode.value) {
      activeNode.value.y = y;
    }
  };

  const setWidth = (width: number) => {
    if (setFbNodeInfo('width', width) && activeNode.value) {
      activeNode.value.width = width;
    }
  };

  const setHeight = (height: number) => {
    if (setFbNodeInfo('height', height) && activeNode.value) {
      activeNode.value.height = height;
    }
  };

  const setRotation = (rotation: number) => {
    rotation = Math.min(rotation, 360);
    rotation = Math.max(rotation, 0);
    if (setFbNodeInfo('angle', rotation) && activeNode.value) {
      activeNode.value.rotation = rotation;
    }
  };

  const setClip = (clip?: string) => {
    editor.removeClip();
    if (activeNode.value) {
      activeNode.value.clip = clip;
    }
    clip && editor.addClipPathToImage(clip);
  };

  return {
    setStartTime,
    setEndTime,
    setX,
    setY,
    setWidth,
    setHeight,
    setRotation,
    clipList,
    setClip,
  };
};
