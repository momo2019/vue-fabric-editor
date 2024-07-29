import { ElementItem } from '@/interfaces/element';
import { handleNode, handleEndNode } from '@/utils/handler/nodeHandler';
import { fabric } from 'fabric';
import { EditorReturnType } from './useEditor';
import { NodeReturnType } from './useNode';
import { TimeLineReturnType } from './useTimeLine';
import { handleAnimation } from '@/utils/handler/animationHandler';
import * as TWEEN from '@tweenjs/tween.js';
import { AnimationStep } from '@/interfaces/animation';
import { GlobalReturnType } from './useGlobal';

export const usePreview = (
  editor: EditorReturnType,
  timeLine: TimeLineReturnType,
  nodeGroup: NodeReturnType,
  global: GlobalReturnType
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

    const tweens = nodes.reduce((acc, node) => {
      acc.push(
        ...handleAnimation(
          node as {
            node: ElementItem;
            fbNode: fabric.Object;
          },
          timeLine.duration.value,
          global.global.value
        )
      );
      return acc;
    }, [] as TWEEN.Tween<AnimationStep>[]);

    let tweenNow = 0;

    timeLine.start({
      start: () => {
        tweens.forEach((tween) => tween.start());
        tweenNow = TWEEN.now();
      },
      process: (curTime: number) => {
        nodes.forEach((node) => {
          handleNode(curTime, node, timeLine.duration.value);
        });
        TWEEN.update(tweenNow + curTime * 1000);
        editor.requestRenderAll();
      },
      end: () => {
        nodes.forEach((node) => {
          handleEndNode(node);
        });
        editor.clearSelect();
        editor.openSelect();
        editor.requestRenderAll();
      },
    });
  };
  return {
    previewVideo,
  };
};
