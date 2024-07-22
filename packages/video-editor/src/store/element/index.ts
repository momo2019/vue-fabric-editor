import { ElementItem, TextNode, VideoNode } from '@/interfaces/element';
import { useEditor } from '@/store/element/hooks/useEditor';
import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/store/element/hooks/useTimeLine';
import { useOperate } from '@/store/element/hooks/useOperate';
import { useVideoAudioOperate } from './hooks/useVideoAudioOperate';
import { useTextOperate } from './hooks/useTextOperate';
import { fabric } from 'fabric';
import { handleVideoOrAudio } from '@/utils/videoAudio';
import { useNode } from './hooks/useNode';
import { useGlobal } from './hooks/useGlobal';

export const elementStore = defineStore('element', () => {
  const timeLine = useTimeLine();

  const editor = useEditor<MaterialItem>({
    afterAdd: (...arg) => nodeGroup.addNode(...arg),
    afterRemove: (...arg) => nodeGroup.removeNode(...arg),
    chooseOne: (uid: string) => {
      nodeGroup.activeNode.value = nodeGroup.findNodeByUid(uid);
    },
    clearChoose: () => {
      nodeGroup.activeNode.value = null;
    },
    updateActiveInfo: (data) => nodeGroup.updateActiveInfo(data),
    updateGlobelInfo: (data) => {
      global.setGlobalWidth(data.width);
      global.setGlobalHeight(data.height);
    },
  });

  const global = useGlobal(editor);

  const nodeGroup = useNode(timeLine.duration, editor);

  const operate = useOperate(
    nodeGroup.activeNode,
    nodeGroup.activeNodeShowValue,
    timeLine.duration,
    editor
  );

  const videoAudioOperate = useVideoAudioOperate(
    nodeGroup.activeNode as Ref<ElementItem<VideoNode>>,
    editor
  );

  const textOperate = useTextOperate(nodeGroup.activeNode as Ref<ElementItem<TextNode>>, editor);

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
    ...nodeGroup,
    ...global,
    ...videoAudioOperate,
    ...textOperate,
    ...operate,
    ...timeLine,
    ...editor,
  };
});
