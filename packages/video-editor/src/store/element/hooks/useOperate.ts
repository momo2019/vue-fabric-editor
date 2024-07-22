import { CLIP_LIST } from '@/mocks/clip';
import { ref } from 'vue';
import { EditorReturnType } from './useEditor';
import { OptionItem } from '@/interfaces/common';
import { NodeReturnType } from './useNode';
import { TimeLineReturnType } from './useTimeLine';
const minDuration = 1;

export const useOperate = (
  node: NodeReturnType,
  timeLine: TimeLineReturnType,
  editor: EditorReturnType
) => {
  const clipList = ref<OptionItem[]>(CLIP_LIST);

  const setStartTime = (time: number) => {
    if (node.activeNodeShowValue.value && node.activeNode.value) {
      node.activeNode.value.startTime = Math.max(time, 0);
      if (
        node.activeNodeShowValue.value.startTime + minDuration >
        node.activeNodeShowValue.value.endTime
      ) {
        node.activeNode.value.startTime = node.activeNodeShowValue.value.endTime - minDuration;
      }
    }
  };

  const setEndTime = (time: number) => {
    if (node.activeNodeShowValue.value && node.activeNode.value) {
      node.activeNode.value.endTime = time;
      if (
        node.activeNodeShowValue.value.startTime + minDuration >
        node.activeNodeShowValue.value.endTime
      ) {
        node.activeNode.value.endTime = node.activeNodeShowValue.value.startTime + minDuration;
      }
      if (node.activeNodeShowValue.value.endTime >= timeLine.duration.value) {
        node.activeNode.value.endTime = undefined;
      }
    }
  };

  const setX = (x: number) => {
    if (editor.setFbNodeInfo('left', x) && node.activeNode.value) {
      node.activeNode.value.x = x;
    }
  };

  const setY = (y: number) => {
    if (editor.setFbNodeInfo('top', y) && node.activeNode.value) {
      node.activeNode.value.y = y;
    }
  };

  const setWidth = (width: number) => {
    if (editor.setFbNodeInfo('width', width) && node.activeNode.value) {
      node.activeNode.value.width = width;
    }
  };

  const setHeight = (height: number) => {
    if (editor.setFbNodeInfo('height', height) && node.activeNode.value) {
      node.activeNode.value.height = height;
    }
  };

  const setRotation = (rotation: number) => {
    rotation = Math.min(rotation, 360);
    rotation = Math.max(rotation, 0);
    if (editor.setFbNodeInfo('angle', rotation) && node.activeNode.value) {
      node.activeNode.value.rotation = rotation;
    }
  };

  const setClip = (clip?: string) => {
    editor.removeClip();
    if (node.activeNode.value) {
      node.activeNode.value.clip = clip;
    }
    clip && editor.addClipPathToImage(clip);
  };

  const setOpacity = (opacity: number) => {
    if (editor.setFbNodeInfo('opacity', opacity) && node.activeNode.value) {
      node.activeNode.value.opacity = opacity;
    }
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
    setOpacity,
  };
};
