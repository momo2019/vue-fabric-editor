import { ElementItem, VideoNode } from '@/interfaces/element';
import { Ref } from 'vue';

export const useVideoAudioOperate = (activeNode: Ref<ElementItem<VideoNode> | null>) => {
  const setLoop = (loop: boolean) => {
    activeNode.value!.isLoop = loop;
  };

  const setVol = (vol: number) => {
    activeNode.value!.vol = vol;
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
