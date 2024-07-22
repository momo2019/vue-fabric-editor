import { ref } from 'vue';
import { OptionItem } from '@/interfaces/common';
import { END_ANIMATION_LIST, START_ANIMATION_LIST } from '@/mocks/animation';
import { NodeReturnType } from './useNode';

export const useAnimationOperate = (node: NodeReturnType) => {
  const startAnimationList = ref<OptionItem[]>(START_ANIMATION_LIST);
  const endAnimationList = ref<OptionItem[]>(END_ANIMATION_LIST);

  const setStartAnimation = (animation: string) => {
    if (node.activeNode.value) {
      node.activeNode.value.startAnimation = animation;
    }
  };

  const setEndAnimation = (animation: string) => {
    if (node.activeNode.value) {
      node.activeNode.value.endAnimation = animation;
    }
  };

  const setStartAnimationTime = (time: number) => {
    if (node.activeNode.value) {
      node.activeNode.value.startAnimationTime = time;
    }
  };

  const setEndAnimationTime = (time: number) => {
    if (node.activeNode.value) {
      node.activeNode.value.endAnimationTime = time;
    }
  };

  return {
    startAnimationList,
    endAnimationList,
    setStartAnimation,
    setEndAnimation,
    setStartAnimationTime,
    setEndAnimationTime,
  };
};
