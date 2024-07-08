import Editor, {
  DringPlugin,
  AlignGuidLinePlugin,
  ControlsPlugin,
  CenterAlignPlugin,
  LayerPlugin,
  CopyPlugin,
  MoveHotKeyPlugin,
  DeleteHotKeyPlugin,
  GroupPlugin,
  DrawLinePlugin,
  WorkspacePlugin,
  RulerPlugin,
} from '@kuaitu/core';
import { fabric } from 'fabric';
import { computed, ref } from 'vue';

export const useEditor = <T>(cb: { afterAdd: (data: T) => void }) => {
  const canvasEditor = new Editor();

  const fCanvas = ref<fabric.Canvas | null>(null);
  const initEditorEnd = computed(() => !!fCanvas.value);

  const initEditor = (cvs: HTMLCanvasElement) => {
    // 初始化fabric
    const canvas = new fabric.Canvas(cvs, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
    });

    // 初始化编辑器
    canvasEditor.init(canvas);
    canvasEditor.use(DringPlugin);
    canvasEditor.use(AlignGuidLinePlugin);
    canvasEditor.use(ControlsPlugin);
    canvasEditor.use(CenterAlignPlugin);
    canvasEditor.use(LayerPlugin);
    canvasEditor.use(CopyPlugin);
    canvasEditor.use(MoveHotKeyPlugin);
    canvasEditor.use(DeleteHotKeyPlugin);
    canvasEditor.use(GroupPlugin);
    canvasEditor.use(DrawLinePlugin);
    canvasEditor.use(WorkspacePlugin);
    canvasEditor.use(RulerPlugin);
    canvasEditor.rulerEnable();

    fCanvas.value = canvas;
  };

  const afterAdd = (img: fabric.Image, data: T) => {
    if (!initEditorEnd.value) {
      return;
    }
    img.set({
      left: 100,
      top: 100,
    });
    canvasEditor.dragAddItem(img);
    cb.afterAdd(data);
  };

  const addImage = (url: string, data: T) => {
    if (!initEditorEnd.value) {
      return;
    }
    fabric.Image.fromURL(url, (img) => {
      afterAdd(img, data);
    });
  };

  const addVideo = (url: string, data: T) => {
    if (!initEditorEnd.value) {
      return;
    }
    // TODO 加入视频报错问题@kuaitu/core
    fabric.Image.fromURL(url, (img) => {
      afterAdd(img, data);
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
    initEditor,
    addImage,
    addVideo,
  };
};
