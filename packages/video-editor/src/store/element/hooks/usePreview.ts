import { ElementItem } from '@/interfaces/element';
import { handleNode } from '@/utils/nodeHandler';
import { fabric } from 'fabric';
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
    const nodes: {
      element?: HTMLVideoElement | HTMLAudioElement;
      node: ElementItem;
      fbNode?: fabric.Object;
    }[] = [];

    objs?.forEach((item) => {
      let element: HTMLVideoElement | undefined = undefined;
      if (item instanceof fabric.Image) {
        const tempElement = item.getElement();
        if (tempElement instanceof HTMLVideoElement) {
          element = tempElement;
        }
      }
      const node = nodeGroup.findNodeByUid(item.data);
      node &&
        nodes.push({
          element,
          node,
          fbNode: item,
        });
    });
    editor.clearSelect();
    editor.stopSelect();
    timeLine.start({
      process: (curTime: number) => {
        nodes.forEach((node) => {
          handleNode(curTime, node, timeLine.duration.value);
        });
        editor.requestRenderAll();
      },
      end: () => {
        nodes.forEach(({ element }) => {
          if (element) {
            element?.pause();
            element.currentTime = 0;
          }
        });
        editor.clearSelect();
        editor.requestRenderAll();
      },
    });
  };
  return {
    previewVideo,
  };
};
