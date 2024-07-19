import { ElementItem, ShowElementItem } from '@/interfaces/element';
import { CLIP_LIST } from '@/mocks/clip';
import { ComputedRef, ref, Ref } from 'vue';
import { EditorReturnType } from './useEditor';
import { OptionItem } from '@/interfaces/common';
const minDuration = 1;

export const useOperate = (
  activeNode: Ref<ElementItem | null>,
  activeNodeShowValue: ComputedRef<ShowElementItem | null>,
  duration: Ref<number>,
  editor: EditorReturnType
) => {
  const clipList = ref<OptionItem[]>(CLIP_LIST);

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

  const setX = (x: number) => {
    if (editor.setFbNodeInfo('left', x) && activeNode.value) {
      activeNode.value.x = x;
    }
  };

  const setY = (y: number) => {
    if (editor.setFbNodeInfo('top', y) && activeNode.value) {
      activeNode.value.y = y;
    }
  };

  const setWidth = (width: number) => {
    if (editor.setFbNodeInfo('width', width) && activeNode.value) {
      activeNode.value.width = width;
    }
  };

  const setHeight = (height: number) => {
    if (editor.setFbNodeInfo('height', height) && activeNode.value) {
      activeNode.value.height = height;
    }
  };

  const setRotation = (rotation: number) => {
    rotation = Math.min(rotation, 360);
    rotation = Math.max(rotation, 0);
    if (editor.setFbNodeInfo('angle', rotation) && activeNode.value) {
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
