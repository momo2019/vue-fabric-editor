import { ElementItem, ShowElementItem, TextNode, VideoNode } from '@/interfaces/element';
import { useEditor } from '@/store/element/hooks/useEditor';
import { defineStore } from 'pinia';
import { computed, nextTick, Ref, ref } from 'vue';
import { MaterialItem } from '@/interfaces/material';
import { useTimeLine } from '@/store/element/hooks/useTimeLine';
import { useOperate } from '@/store/element/hooks/useOperate';
import { useVideoAudioOperate } from './hooks/useVideoAudioOperate';
import { useTextOperate } from './hooks/useTextOperate';
import { FbNodes } from '@/interfaces/fabric';
import { fabric } from 'fabric';

export const elementStore = defineStore('element', () => {
  const global = ref({
    height: 1920,
    width: 1080,
  });
  const nodes = ref<ElementItem[]>([]);
  const activeNode = ref<ElementItem | null>(null);

  const timeLine = useTimeLine();
  const activeNodeShowValue = computed(() =>
    activeNode.value
      ? ({
          ...(activeNode.value as unknown as ShowElementItem),
          startTime: activeNode.value?.startTime || 0,
          endTime: activeNode.value?.endTime || timeLine.duration.value,
          x: activeNode.value.x || 0,
          y: activeNode.value.y || 0,
          rotation: activeNode.value.rotation || 0,
          clip: activeNode.value.clip || '',
        } as ShowElementItem)
      : null
  );

  const removeNode = (uid: string) => {
    const index = nodes.value.findIndex((item) => item.uid === uid);
    index !== -1 && nodes.value.splice(index, 1);
  };

  const addNode = (data: MaterialItem, uid: string) => {
    nodes.value.push({
      type: data.type,
      data: data.data,
      cover: data.cover,
      uid,
      width: 0,
      height: 0,
    });
  };

  const editor = useEditor<MaterialItem>({
    afterAdd: addNode,
    afterRemove: removeNode,
    chooseOne: (uid: string) => {
      activeNode.value = nodes.value.find((item) => item.uid === uid) || null;
    },
    clearChoose: () => {
      activeNode.value = null;
    },
    updateActiveInfo: (data) => updateActiveInfo(data),
    updateGlobelInfo: (data) => {
      setGlobalWidth(data.width);
      setGlobalHeight(data.height);
    },
  });

  nextTick(() => {
    editor.setWorkspaseSize(global.value.width, global.value.height);
  });

  const operate = useOperate(activeNode, activeNodeShowValue, timeLine.duration, editor);

  const videoAudioOperate = useVideoAudioOperate(activeNode as Ref<ElementItem<VideoNode>>);

  const textOperate = useTextOperate(activeNode as Ref<ElementItem<TextNode>>, editor);

  const setActiveNode = (item: ElementItem) => {
    editor.setSelect(item.uid);
  };

  const clearActiveNode = () => {
    activeNode.value = null;
    editor.clearSelect();
  };

  const updateActiveInfo = (data: FbNodes) => {
    if (activeNode.value) {
      activeNode.value.x = data.left;
      activeNode.value.y = data.top;
      activeNode.value.width = data.getScaledWidth();
      activeNode.value.height = data.getScaledHeight();
      activeNode.value.rotation = data.angle;
      if (data instanceof fabric.Text) {
        (activeNode.value as ElementItem<TextNode>).data = data.text || '';
        (activeNode.value as ElementItem<TextNode>).fontSize = data.fontSize;
        (activeNode.value as ElementItem<TextNode>).fontFamily = data.fontFamily;
        (activeNode.value as ElementItem<TextNode>).color = data.fill as string;
      }
    }
  };

  const setGlobalWidth = (width: number) => {
    if (global.value.width === width) {
      return;
    }
    global.value.width = width;
    editor.setWorkspaseSize(global.value.width, global.value.height, false);
  };

  const setGlobalHeight = (height: number) => {
    if (global.value.height === height) {
      return;
    }
    global.value.height = height;
    editor.setWorkspaseSize(global.value.width, global.value.height, false);
  };

  const removeActive = () => {
    activeNode.value && editor.removeObject(activeNode.value.uid);
  };

  return {
    nodes,
    activeNode,
    setActiveNode,
    clearActiveNode,
    activeNodeShowValue,
    global,
    setGlobalHeight,
    setGlobalWidth,
    removeActive,
    ...videoAudioOperate,
    ...textOperate,
    ...operate,
    ...timeLine,
    ...editor,
  };
});
