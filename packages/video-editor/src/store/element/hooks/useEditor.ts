import { FbNodes } from '@/interfaces/fabric';
import { MaterialItem } from '@/interfaces/material';
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
  SimpleClipImagePlugin,
} from '@kuaitu/core';
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { computed, ref } from 'vue';

export const useEditor = <T = MaterialItem>(cb: {
  afterAdd: (data: T, uid: string) => void;
  afterRemove: (uid: string) => void;
  chooseOne: (uid: string, activeObject: FbNodes) => void;
  clearChoose: () => void;
  updateActiveInfo: (activeObject: FbNodes) => void;
  updateGlobelInfo: (data: { height: number; width: number }) => void;
}) => {
  const fbrcNodes = new Map<string, FbNodes>();
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
    canvasEditor.use(SimpleClipImagePlugin);
    canvasEditor.rulerEnable();

    canvasEditor.on('selectOne', () => {
      const activeObject = canvas.getActiveObject() as FbNodes;
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

    canvasEditor.on('sizeChange', (width, height) => {
      cb.updateGlobelInfo({ width, height });
    });

    canvas.on('object:removed', (e) => {
      cb.afterRemove(e.target?.data);
    });

    canvas.on('object:moving', updateActiveInfo);
    canvas.on('object:scaling', updateActiveInfo);
    canvas.on('object:rotating', updateActiveInfo);
    canvas.on('text:changed', updateActiveInfo);
    fbrcCanvas.value = canvas;
  };

  const updateActiveInfo = (e: fabric.IEvent<Event>) => {
    const activeObject = fbrcCanvas.value?.getActiveObject() as FbNodes;
    if (e?.target?.data !== activeObject?.data) return;
    cb.updateActiveInfo(activeObject!);
  };

  const afterAdd = (obj: FbNodes, data: T) => {
    if (!initEditorEnd.value) {
      return;
    }
    obj.originX = 'center';
    obj.originY = 'center';
    const uid = v4();
    fbrcNodes.set(uid, obj);
    obj.data = uid;
    cb.afterAdd(data, uid);
    canvasEditor.dragAddItem(obj);
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

    const videoE = document.createElement('video');
    videoE.muted = true;
    videoE.crossOrigin = 'anonymous';
    videoE.src = url;
    videoE.preload = 'auto';
    videoE.loop = true;
    videoE.muted = true;

    // 加入画布存在一定的延迟
    videoE.oncanplay = () => {
      videoE.width = videoE.videoWidth;
      videoE.height = videoE.videoHeight;
      const img = new fabric.Image(videoE);
      afterAdd(img, data);
    };
  };

  const addText = (text: string, data: T) => {
    if (!initEditorEnd.value) {
      return;
    }
    const obj = new fabric.IText(text);
    obj.setControlsVisibility({
      bl: false,
      tl: false,
      br: false,
      tr: false,
      ml: false,
      mt: false,
      mr: false,
      mb: false,
      mtr: true,
    });
    afterAdd(obj, data);
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
    return (fbrcCanvas.value?.getActiveObject() as FbNodes) || null;
  };

  const requestRenderAll = () => {
    return fbrcCanvas.value?.requestRenderAll();
  };

  const setWorkspaseSize = (width: number, height: number, needAuto = true) => {
    if (!initEditorEnd.value) {
      return;
    }
    canvasEditor.setSize(width, height, needAuto);
  };

  const removeObject = (uid) => {
    const object = fbrcCanvas.value?.getObjects().find((item) => item.data === uid);
    object && fbrcCanvas.value?.remove(object);
  };

  const addClipPathToImage = (clip: string) => {
    canvasEditor.addClipPathToImage(clip);
  };

  const removeClip = () => {
    canvasEditor.removeClip();
  };

  function setFbNodeInfo<K extends keyof fabric.IText>(key: K, value: fabric.IText[K]): boolean;
  function setFbNodeInfo<K extends keyof fabric.Image>(key: K, value: fabric.Image[K]): boolean {
    const activeFbNode = getActiveObject();
    if (activeFbNode) {
      switch (key) {
        case 'width':
          activeFbNode.scaleX = activeFbNode.width ? value / activeFbNode.width : 1;
          break;
        case 'height':
          activeFbNode.scaleY = activeFbNode.height ? value / activeFbNode.height : 1;
          break;
        default:
          activeFbNode[key as keyof fabric.Object] = value;
          break;
      }

      requestRenderAll();
      return true;
    }
    return false;
  }

  return {
    initEditor,
    addImage,
    addVideo,
    clearSelect,
    setSelect,
    getActiveObject,
    requestRenderAll,
    setWorkspaseSize,
    removeObject,
    addClipPathToImage,
    removeClip,
    addText,
    setFbNodeInfo,
  };
};

export type EditorReturnType<T = MaterialItem> = ReturnType<typeof useEditor<T>>;