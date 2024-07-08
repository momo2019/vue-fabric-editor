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

export const useEditor = (cvs: HTMLCanvasElement) => {
  const canvasEditor = new Editor();

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

  return {
    canvasEditor,
    canvas,
  };
};
