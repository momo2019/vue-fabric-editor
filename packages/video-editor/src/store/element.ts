import { timeGap } from '@/components/TimeLine/utils/timeLineCanvas';
import { ElementItem } from '@/interfaces/element';
import { useEditor } from '@/utils/useEditor';
// import Editor from '@kuaitu/core';
import { defineStore } from 'pinia';
import { v4 } from 'uuid';
import { computed, ref } from 'vue';
import { fabric } from 'fabric';
import { MaterialItem } from '@/interfaces/material';

export const elementStore = defineStore('element', () => {
  const nodes = ref<ElementItem[]>([]);
  const duration = ref(100);
  const curTime = ref(0);

  const lineGapTime = ref(1); // 单个代表多少秒
  const perSecGapWidth = computed(() => timeGap / lineGapTime.value); // 每秒的间隔

  const editor = ref<any | null>(null);
  const fCavnas = ref<fabric.Canvas | null>(null);
  const initEditorEnd = computed(() => !!editor.value);

  const initEditor = (cvs: HTMLCanvasElement) => {
    const { canvasEditor, canvas } = useEditor(cvs);
    editor.value = canvasEditor;
    fCavnas.value = canvas;
  };

  // add

  const afterAdd = (item: MaterialItem, img: fabric.Image) => {
    if (!editor.value) {
      return;
    }
    img.set({
      left: 100,
      top: 100,
    });
    editor.value.dragAddItem(img);
    nodes.value.push({
      ...item,
      uid: v4(),
    });
  };

  const addImage = (item: MaterialItem) => {
    if (!editor.value) {
      return;
    }
    fabric.Image.fromURL(item.url, (img) => {
      afterAdd(item, img);
    });
  };

  const addVideo = (item: MaterialItem) => {
    if (!editor.value) {
      return;
    }
    // TODO 加入视频报错问题@kuaitu/core
    item.cover &&
      fabric.Image.fromURL(item.cover, (img) => {
        afterAdd(item, img);
      });
    // const videoDom = document.createElement('video');
    // videoDom.src = item.url;
    // videoDom.preload = 'auto';
    // videoDom.onloadeddata = () => {
    //   const img = new fabric.Image(videoDom, {
    //     objectCaching: false,
    //   });
    //   afterAdd(item, img);
    // };
  };

  return {
    nodes,
    duration,
    curTime,
    perSecGapWidth,
    lineGapTime,
    editor,
    initEditorEnd,
    initEditor,
    addImage,
    addVideo,
  };
});
