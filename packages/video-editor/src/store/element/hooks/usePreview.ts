import { ElementItem, VideoNode } from '@/interfaces/element';
import { handleVideoOrAudio } from '@/utils/videoAudio';
import fabric from 'fabric/fabric-impl';
import { EditorReturnType } from './useEditor';
import { NodeReturnType } from './useNode';
import { TimeLineReturnType } from './useTimeLine';

export const usePreview = (
  editor: EditorReturnType,
  timeLine: TimeLineReturnType,
  nodeGroup: NodeReturnType
) => {
  const previewVideo = () => {
    const objs = editor.getAllObject();
    const videoOrAudioNode: {
      element: HTMLVideoElement | HTMLAudioElement;
      node: ElementItem<VideoNode>;
      fbNode?: fabric.Image;
    }[] = [];

    objs?.forEach((item) => {
      if (item instanceof fabric.Image) {
        const element = item.getElement();
        if (element instanceof HTMLVideoElement) {
          const node = nodeGroup.findNodeByUid(item.data);
          node &&
            videoOrAudioNode.push({
              element,
              node: node as ElementItem<VideoNode>,
              fbNode: item,
            });
        }
      }
    });
    editor.clearSelect();
    timeLine.start({
      process: (curTime: number) => {
        videoOrAudioNode.forEach((item) => {
          handleVideoOrAudio(curTime, item, timeLine.duration.value);
        });
        editor.requestRenderAll();
      },
      end: () => {
        videoOrAudioNode.forEach(({ element }) => {
          element.pause();
          element.currentTime = 0;
        });
        editor.requestRenderAll();
      },
    });
  };
  return {
    previewVideo,
  };
};
