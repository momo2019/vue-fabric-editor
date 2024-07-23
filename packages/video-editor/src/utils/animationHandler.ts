import { AnimationCore, AnimationStep } from '@/interfaces/animation';
import { ElementItem } from '@/interfaces/element';
import { fabric } from 'fabric';
import { getKeys } from '.';
import { getDefaultAnimation } from './defaultAnimation';
import * as TWEEN from '@tweenjs/tween.js';

const startAnimationCore = (
  item: {
    fbNode: fabric.Object;
  },
  animation: AnimationCore,
  animationTime: number,
  startTime: number
) => {
  const { fbNode } = item;
  const coords = { ...animation.from };
  const keys = getKeys(coords);
  return new TWEEN.Tween(coords)
    .to({ ...animation.to }, animationTime * 1000)
    .delay(startTime * 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      for (const key of keys) {
        const allValue = animation.to[key]! - animation.from[key]!;
        if (!allValue) {
          return;
        }
        const curValue = coords[key];
        switch (key) {
          case 'opacity':
            fbNode.opacity = curValue;
            break;
          case 'height':
            fbNode.scaleY = fbNode.height ? curValue! / fbNode.height : 1;
            break;
          case 'width':
            fbNode.scaleX = fbNode.width ? curValue! / fbNode.width : 1;
            break;
          case 'x':
            fbNode.left = curValue;
            break;
          case 'y':
            fbNode.top = curValue;
            break;
        }
      }
    });
};

export const clearAnimation = (item: { node: ElementItem; fbNode: fabric.Object }) => {
  const { node, fbNode } = item;
  fbNode.opacity = node.opacity;
  fbNode.left = node.x;
  fbNode.top = node.y;
  fbNode.scaleX = fbNode.width ? node.width / fbNode.width : 1;
  fbNode.scaleY = fbNode.height ? node.height / fbNode.height : 1;
};

export const handleAnimation = (
  item: {
    node: ElementItem;
    fbNode: fabric.Object;
  },
  duration: number
) => {
  const { node } = item;
  const tweens: TWEEN.Tween<AnimationStep>[] = [];
  if (node.startAnimation && node.startAnimationTime) {
    const startTime = node.startTime || 0;
    const defaultAnimation = getDefaultAnimation(node.startAnimation);

    defaultAnimation &&
      tweens.push(startAnimationCore(item, defaultAnimation, node.startAnimationTime, startTime));
  }

  if (node.endAnimation && node.endAnimationTime) {
    const endTime = node.endTime || duration;
    const defaultAnimation = getDefaultAnimation(node.endAnimation!);
    defaultAnimation &&
      tweens.push(
        startAnimationCore(
          item,
          defaultAnimation,
          node.endAnimationTime!,
          endTime - node.endAnimationTime!
        )
      );
  }
  return tweens;
};
