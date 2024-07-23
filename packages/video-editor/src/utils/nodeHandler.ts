import { ElementItem, VideoNode } from '@/interfaces/element';
import { fabric } from 'fabric';
import { handleVideoOrAudio } from './videoAudioHandler';
import { clearAnimation, handleAnimation } from './animationHandler';

export const handleNode = (
  curTime: number,
  item: {
    element?: HTMLVideoElement | HTMLAudioElement;
    node: ElementItem;
    fbNode?: fabric.Object;
  },
  duration: number
) => {
  const { element, node } = item;
  const startTime = node.startTime || 0;
  const endTime = node.endTime || duration;
  if (curTime >= startTime && curTime < endTime) {
    element &&
      handleVideoOrAudio(curTime, { element, node: node as ElementItem<VideoNode> }, duration);
    if (item.fbNode) {
      item.fbNode.opacity = node.opacity || 1;
      handleAnimation(
        curTime,
        item as {
          node: ElementItem;
          fbNode: fabric.Object;
        },
        duration
      );
    }
  } else {
    item.fbNode && (item.fbNode.opacity = 0);
    element?.pause();
  }
};

export const handleEndNode = (item: {
  element?: HTMLVideoElement | HTMLAudioElement;
  node: ElementItem;
  fbNode?: fabric.Object;
}) => {
  const { element, node, fbNode } = item;
  if (fbNode) {
    clearAnimation({
      node,
      fbNode,
    });
  }
  if (element) {
    element?.pause();
    element.currentTime = 0;
  }
};
