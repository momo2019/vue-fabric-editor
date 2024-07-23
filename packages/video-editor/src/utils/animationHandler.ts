import { AnimationCore } from '@/interfaces/animation';
import { ElementItem } from '@/interfaces/element';
import { fabric } from 'fabric';
import { getKeys } from '.';
import { getDefaultAnimation } from './defaultAnimation';

const startAnimationCore = (
  item: {
    fbNode: fabric.Object;
  },
  animation: AnimationCore,
  proportion: number
) => {
  const { fbNode } = item;
  const keys = getKeys(animation.from);
  for (const key of keys) {
    const allValue = animation.to[key]! - animation.from[key]!;
    if (!allValue) {
      return;
    }
    const curValue = allValue * proportion;
    switch (key) {
      case 'opacity':
        fbNode.opacity = curValue;
        break;
      case 'height':
        fbNode.scaleY = fbNode.height ? curValue / fbNode.height : 1;
        break;
      case 'width':
        fbNode.scaleX = fbNode.width ? curValue / fbNode.width : 1;
        break;
      case 'x':
        fbNode.left = curValue;
        break;
      case 'y':
        fbNode.top = curValue;
        break;
    }
  }
};

export const clearAnimation = (item: { node: ElementItem; fbNode: fabric.Object }) => {
  const { node, fbNode } = item;
  fbNode.opacity = node.opacity;
  fbNode.left = node.x;
  fbNode.top = node.y;
  fbNode.scaleX = fbNode.width ? node.width / fbNode.width : 1;
  fbNode.scaleY = fbNode.height ? node.height / fbNode.height : 1;
};

const handleStartAnimation = (
  curTime: number,
  item: {
    node: ElementItem;
    fbNode: fabric.Object;
  }
) => {
  const { node } = item;
  const startTime = node.startTime || 0;
  if (curTime >= startTime && curTime <= startTime + node.startAnimationTime!) {
    const defaultAnimation = getDefaultAnimation(node.startAnimation!);
    defaultAnimation &&
      startAnimationCore(item, defaultAnimation, (curTime - startTime) / node.startAnimationTime!);
    return true;
  } else {
    clearAnimation(item);
    return false;
  }
};

const handleEndAnimation = (
  curTime: number,
  item: {
    node: ElementItem;
    fbNode: fabric.Object;
  },
  duration: number
) => {
  const { node } = item;
  const endTime = node.endTime || duration;
  if (curTime <= endTime && curTime >= endTime - node.endAnimationTime!) {
    const defaultAnimation = getDefaultAnimation(node.endAnimation!);
    defaultAnimation &&
      startAnimationCore(item, defaultAnimation, (curTime - endTime) / node.endAnimationTime!);
  } else {
    clearAnimation(item);
  }
};

export const handleAnimation = (
  curTime: number,
  item: {
    node: ElementItem;
    fbNode: fabric.Object;
  },
  duration: number
) => {
  const { node } = item;
  let isOnStartAnimation = false;
  if (node.startAnimation && node.startAnimationTime) {
    isOnStartAnimation = handleStartAnimation(curTime, item);
  }

  if (!isOnStartAnimation && node.endAnimation && node.endAnimationTime) {
    handleEndAnimation(curTime, item, duration);
  }
};
