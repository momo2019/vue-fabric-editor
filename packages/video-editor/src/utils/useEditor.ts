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
  MaskPlugin,
  ResizePlugin,
  RulerPlugin,
} from '@kuaitu/core';
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { computed, ref } from 'vue';

export const useEditor = <T>(cb: {
  afterAdd: (data: T, uid: string) => void;
  chooseOne: (uid: string, activeObject: fabric.Object) => void;
  clearChoose: () => void;
  updateActiveInfo: (activeObject: fabric.Object) => void;
}) => {
  const fbrcNodes = new Map<string, fabric.Image>();
  const canvasEditor = new Editor();

  const fbrcCanvas = ref<fabric.Canvas | null>(null);
  const initEditorEnd = computed(() => !!fbrcCanvas.value);

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
    canvasEditor.use(MaskPlugin);
    canvasEditor.use(RulerPlugin);
    canvasEditor.use(ResizePlugin);
    canvasEditor.rulerEnable();

    canvasEditor.on('selectOne', () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) {
        cb.clearChoose();
        return;
      }
      const uid = activeObject.data as string;
      cb.chooseOne(uid, activeObject);
      cb.updateActiveInfo(activeObject);
    });

    canvasEditor.on('selectCancel', () => {
      cb.clearChoose();
    });

    canvas.on('object:moving', (e) => {
      const activeObject = canvas.getActiveObject();
      if (e && e.target && e.target !== activeObject) return;
      cb.updateActiveInfo(activeObject!);
    });

    fbrcCanvas.value = canvas;
  };

  const afterAdd = (img: fabric.Image, data: T) => {
    if (!initEditorEnd.value) {
      return;
    }
    img.set({
      left: 100,
      top: 100,
    });
    const uid = v4();
    fbrcNodes.set(uid, img);
    img.data = uid;
    cb.afterAdd(data, uid);
    canvasEditor.dragAddItem(img);
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

  const setSelect = (uid: string) => {
    const node = fbrcNodes.get(uid);
    if (node) {
      fbrcCanvas.value?.setActiveObject(node);
      fbrcCanvas.value?.requestRenderAll();
    }
  };

  const clearSelect = () => {
    fbrcCanvas.value?.discardActiveObject();
    fbrcCanvas.value?.requestRenderAll();
  };

  const getActiveObject = () => {
    return fbrcCanvas.value?.getActiveObject() || null;
  };

  const requestRenderAll = () => {
    return fbrcCanvas.value?.requestRenderAll();
  };

  return {
    initEditor,
    addImage,
    addVideo,
    clearSelect,
    setSelect,
    getActiveObject,
    requestRenderAll,
  };
};
