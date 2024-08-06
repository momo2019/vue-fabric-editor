import { ElementItem, TextNode, VideoNode } from '@/interfaces/element';
import { useEditor } from '@/store/element/hooks/useEditor';
import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/store/element/hooks/useTimeLine';
import { useOperate } from '@/store/element/hooks/useOperate';
import { useVideoAudioOperate } from './hooks/useVideoAudioOperate';
import { useTextOperate } from './hooks/useTextOperate';
import { useNode } from './hooks/useNode';
import { useGlobal } from './hooks/useGlobal';
import { usePreview } from './hooks/usePreview';
import { useAnimationOperate } from './hooks/useAnimationOperate';
import { useAudio } from './hooks/useAudio';

export const elementStore = defineStore('element', () => {
  const timeLine = useTimeLine();

  const editor = useEditor<MaterialItem>({
    afterAdd: (...arg) => node.addNode(...arg),
    afterRemove: (...arg) => node.removeNode(...arg),
    chooseOne: (uid, activeObject) => {
      node.setActiveNode(uid, activeObject);
    },
    clearChoose: () => {
      node.clearActiveNode();
    },
    updateActiveInfo: (data) => node.updateActiveInfo(data),
    updateGlobelInfo: (data) => {
      data.width && global.setGlobalWidth(data.width);
      data.height && global.setGlobalHeight(data.height);
      data.zoom && global.setGlobalZoom(data.zoom);
    },
  });

  const global = useGlobal(editor);

  const node = useNode(timeLine, editor);

  const operate = useOperate(node, timeLine, editor);

  const videoAudioOperate = useVideoAudioOperate(
    node.activeNode as Ref<ElementItem<VideoNode>>,
    editor
  );

  const textOperate = useTextOperate(node.activeNode as Ref<ElementItem<TextNode>>, editor);

  const preview = usePreview(editor, timeLine, node, global);

  const animation = useAnimationOperate(node);

  const audio = useAudio(node);

  return {
    ...preview,
    ...node,
    ...global,
    ...videoAudioOperate,
    ...textOperate,
    ...operate,
    ...timeLine,
    ...editor,
    ...animation,
    ...audio,
  };
});
