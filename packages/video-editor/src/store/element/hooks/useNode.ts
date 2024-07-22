import { ElementItem, ShowElementItem, TextNode, VideoNode } from '@/interfaces/element';
import { FbNodes } from '@/interfaces/fabric';
import { MaterialItem } from '@/interfaces/material';
import { fabric } from 'fabric';
import { computed, ref } from 'vue';
import { EditorReturnType } from './useEditor';
import { TimeLineReturnType } from './useTimeLine';

export const useNode = (timeLine: TimeLineReturnType, editor: EditorReturnType) => {
  const nodes = ref<ElementItem[]>([]);
  const activeNode = ref<ElementItem | null>(null);

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

  const findNodeByUid = (uid: string): ElementItem | null => {
    return nodes.value.find((item) => item.uid === uid) || null;
  };

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
        (activeNode.value as ElementItem<TextNode>).textAlign = data.textAlign || 'left';
        (activeNode.value as ElementItem<TextNode>).letterSpacing = data.charSpacing || 0;
      } else if (data instanceof fabric.Image) {
        const element = data.getElement();
        if (element instanceof HTMLVideoElement) {
          (activeNode.value as ElementItem<VideoNode>).isLoop = element.loop;
          (activeNode.value as ElementItem<VideoNode>).vol = element.volume;
        }
      }
    }
  };

  const removeActive = () => {
    activeNode.value && editor.removeObject(activeNode.value.uid);
  };

  return {
    nodes,
    activeNode,
    activeNodeShowValue,
    removeNode,
    addNode,
    findNodeByUid,
    setActiveNode,
    clearActiveNode,
    updateActiveInfo,
    removeActive,
  };
};

export type NodeReturnType = ReturnType<typeof useNode>;
