import { AnimationCore, AnimationStep, WipeType } from '@/interfaces/animation';
import { ElementItem } from '@/interfaces/element';
import { fabric } from 'fabric';
import { getKeys } from '.';
import { getDefaultAnimation } from './defaultAnimation';
import * as TWEEN from '@tweenjs/tween.js';
import { get } from 'lodash-es';

const setClipPath = (obj: fabric.Object, type: WipeType, isWipeOut?: boolean) => {
  const width = obj.getScaledWidth();
  const height = obj.getScaledHeight();
  const proportion = isWipeOut ? 1.5 : 0.5;
  const left = type === WipeType.right || type === WipeType.left ? width * proportion : width / 2;
  const top = type === WipeType.bottom || type === WipeType.top ? height * proportion : height / 2;

  const wipeClip = new fabric.Rect({
    absolutePositioned: true,
    left: type === WipeType.right ? left : -left,
    top: type === WipeType.bottom ? top : -top,
    width,
    height,
    originX: type === WipeType.right ? 'right' : 'left',
    originY: type === WipeType.bottom ? 'bottom' : 'top',
    inverted: true,
    data: 'wipe',
  });

  const tempClipPath = obj.clipPath;

  obj.clipPath = wipeClip;

  if (tempClipPath) {
    if (tempClipPath instanceof fabric.Group) {
      tempClipPath.add(wipeClip);
      obj.clipPath = tempClipPath;
    } else {
      // TODO 擦除动画多个clipPath的问题
      const tempGroup = new fabric.Group([tempClipPath, wipeClip]);
      obj.clipPath = tempGroup;
    }
  } else {
    obj.clipPath = wipeClip;
  }

  return wipeClip;
};

const clearClipPath = (obj: fabric.Object) => {
  if (obj.clipPath instanceof fabric.Group) {
    const node = obj.clipPath.getObjects().find((node) => node.data !== 'wipe');
    obj.clipPath = node;
  } else if (obj.clipPath?.data === 'wipe') {
    obj.clipPath = undefined;
  }
};

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
  const wipe = animation.from.wipe;
  const isWipeOut = animation.from.isWipeOut;
  const clipPath = wipe && setClipPath(fbNode, wipe, isWipeOut);
  const keys = getKeys(coords, ['wipe', 'isWipeOut'] as const);
  const width = fbNode.getScaledWidth();
  const height = fbNode.getScaledHeight();

  return new TWEEN.Tween(coords)
    .to({ ...animation.to }, animationTime * 1000)
    .delay(startTime * 1000)
    .easing(get(TWEEN.Easing, animation.ease || 'Linear'))
    .onUpdate((_, elapsed) => {
      const tempElapsed = isWipeOut ? 1 - elapsed : elapsed;
      const proportion = tempElapsed + 0.5;
      switch (wipe) {
        case WipeType.left:
          clipPath?.set('left', -width * proportion);
          break;
        case WipeType.right:
          clipPath?.set('left', width * proportion);
          break;
        case WipeType.top:
          clipPath?.set('top', -height * proportion);
          break;
        case WipeType.bottom:
          clipPath?.set('top', height * proportion);
          break;
      }

      for (const key of keys) {
        const allValue = animation.to[key as any]! - animation.from[key as any]!;
        if (!allValue) {
          return;
        }
        const curValue = coords[key as any];
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
  clearClipPath(fbNode);
};

export const handleAnimation = (
  item: {
    node: ElementItem;
    fbNode: fabric.Object;
  },
  duration: number,
  global: {
    width: number;
    height: number;
  }
) => {
  const { node } = item;
  const tweens: TWEEN.Tween<AnimationStep>[] = [];
  if (node.startAnimation && node.startAnimationTime) {
    const startTime = node.startTime || 0;
    const defaultAnimation = getDefaultAnimation(node.startAnimation, item.node, global);

    defaultAnimation &&
      tweens.push(startAnimationCore(item, defaultAnimation, node.startAnimationTime, startTime));
  }

  if (node.endAnimation && node.endAnimationTime) {
    const endTime = node.endTime || duration;
    const defaultAnimation = getDefaultAnimation(node.endAnimation!, item.node, global);
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
