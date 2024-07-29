import { BackgoundType } from '@/interfaces/common';
import { BaseNode } from '@/interfaces/element';
import {
  Audio,
  Background,
  BackgroundType,
  Image,
  Scene,
  TaskData,
  Video,
  Text,
  BaseNode as FFCBaseNode,
  AnimationData,
} from '@/interfaces/ffc';
import { elementStore } from '@/store/element';

const base2ffc = (
  data: BaseNode,
  global: {
    height: number;
    width: number;
    duration: number;
  }
): FFCBaseNode => {
  const offsetX = global.width / 2;
  const offsetY = global.height / 2;

  const animation: AnimationData[] = [];

  if (data.startAnimation && data.startAnimationTime) {
    animation.push({
      type: data.startAnimation,
      start: 0,
      duration: data.startAnimationTime,
    });
  }

  if (data.endAnimation && data.endAnimationTime) {
    animation.push({
      type: data.endAnimation,
      start: (data.endTime || global.duration) - data.endAnimationTime,
      duration: data.endAnimationTime,
    });
  }

  return {
    x: (data.x || 0) + offsetX,
    y: (data.y || 0) + offsetY,
    width: data.width,
    height: data.height,
    index: 1, // TODO
    rotate: data.rotation,
    startTime: data.startTime,
    endTime: data.endTime,
    animation,
  };
};

const node2Scene = (): Scene => {
  const store = elementStore();

  const background: Background = {
    type:
      store.background.type === BackgoundType.image ? BackgroundType.image : BackgroundType.video,
    data: store.background.data,
  };

  const audio: Audio[] = [];
  const image: Image[] = [];
  const video: Video[] = [];
  const text: Text[] = [];
  const global = {
    ...store.global,
    duration: store.duration,
  };

  store.nodes.forEach((node) => {
    switch (node.type) {
      case 'audio':
        audio.push({
          url: node.data,
          fadeIn: node.fadeIn,
          fadeOut: node.fadeOut,
          loop: node.isLoop,
          vol: node.vol,
        });
        break;
      case 'image':
        image.push({
          ...base2ffc(node, global),
          url: node.data,
        });
        break;
      case 'video':
        video.push({
          ...base2ffc(node, global),
          url: node.data,
          vol: node.vol,
          fadeIn: node.fadeIn,
          fadeOut: node.fadeOut,
        });
        break;
      case 'text':
        text.push({
          ...base2ffc(node, global),
          text: node.data,
          // TODO style
        });
        break;
    }
  });

  return {
    duration: store.duration,
    background,
    audio,
    image,
    video,
    text,
  };
};

export const platform2ffc = (): TaskData => {
  const store = elementStore();

  return {
    height: store.global.height,
    width: store.global.width,
    scene: [node2Scene()],
  };
};
