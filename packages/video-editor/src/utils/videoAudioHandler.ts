import { ElementItem, VideoNode } from '@/interfaces/element';

type FadeInOutOption = {
  element: HTMLVideoElement | HTMLAudioElement;
  curTime: number;
  startTime: number;
  endTime: number;
  fadeIn: number;
  fadeOut: number;
  volume: number;
};

const setVolumeFadeInAndOut = ({
  element,
  curTime,
  startTime,
  endTime,
  fadeIn,
  fadeOut,
  volume,
}: FadeInOutOption) => {
  if (curTime < startTime) {
    element.volume = 0;
  } else if (curTime >= startTime && curTime < startTime + fadeIn) {
    element.volume = (volume * (curTime - startTime)) / fadeIn;
  } else if (curTime >= startTime + fadeIn && curTime < endTime - fadeOut) {
    element.volume = volume;
  } else if (curTime >= endTime - fadeOut && curTime < endTime) {
    element.volume = (volume * (endTime - curTime)) / fadeOut;
  } else {
    element.volume = 0;
  }
};

export const handleVideoOrAudio = (
  curTime: number,
  item: {
    element: HTMLVideoElement | HTMLAudioElement;
    node: ElementItem<VideoNode>;
  },
  duration: number
) => {
  const { element, node } = item;
  const startTime = node.startTime || 0;
  const endTime = node.endTime || duration;
  const volume = node.vol || 1;
  const fadeIn = node.fadeIn || 0;
  const fadeOut = node.fadeOut || 0;

  if (!node.isLoop && curTime >= startTime + element.duration) {
    element.pause();
  } else {
    element.play();
  }
  if (fadeIn || fadeOut) {
    setVolumeFadeInAndOut({
      element,
      curTime,
      startTime,
      endTime: node.isLoop ? duration : endTime,
      fadeIn,
      fadeOut,
      volume,
    });
  } else {
    element.volume = volume;
  }
};
