import { ElementItem, VideoNode } from '@/interfaces/element';
import { Ref } from 'vue';
import { EditorReturnType } from './useEditor';
import { fabric } from 'fabric';

export const useVideoAudioOperate = (
  activeNode: Ref<ElementItem<VideoNode> | null>,
  editor: EditorReturnType
) => {
  const setLoop = (loop: boolean) => {
    activeNode.value!.isLoop = loop;
    const node = editor.getActiveObject();
    if (node instanceof fabric.Image) {
      const element = node.getElement();
      if (element instanceof HTMLVideoElement) {
        element.loop = loop;
      }
    }
  };

  const setVol = (vol: number) => {
    activeNode.value!.vol = vol;
    const node = editor.getActiveObject();
    if (node instanceof fabric.Image) {
      const element = node.getElement();
      if (element instanceof HTMLVideoElement) {
        element.volume = vol;
      }
    }
  };

  const setFadeIn = (fadeIn: number) => {
    activeNode.value!.fadeIn = fadeIn;
  };

  const setFadeOut = (fadeOut: number) => {
    activeNode.value!.fadeOut = fadeOut;
  };

  return {
    setLoop,
    setVol,
    setFadeIn,
    setFadeOut,
  };
};
