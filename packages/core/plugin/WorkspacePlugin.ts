/*
 * @Author: 秦少卫
 * @Date: 2023-06-27 12:26:41
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-06-30 20:00:37
 * @Description: 画布区域插件
 */

import { fabric } from 'fabric';
import Editor from '../Editor';
import { throttle } from 'lodash-es';
type IEditor = Editor;

class WorkspacePlugin implements IPluginTempl {
  static pluginName = 'WorkspacePlugin';
  static events = ['sizeChange', 'zoomChange'];
  static apis = [
    'big',
    'small',
    'auto',
    'one',
    'setSize',
    'getWorkspase',
    'setWorkspaseBg',
    'setWorkspaseMediaBg',
    'setCenterFromObject',
  ];
  workspaceEl!: HTMLElement;
  workspace: null | fabric.Rect;
  backgroundMedia: null | fabric.Image = null;
  option: any;
  zoomRatio: number;
  constructor(public canvas: fabric.Canvas, public editor: IEditor) {
    this.workspace = null;
    this.init({
      width: 900,
      height: 2000,
    });
    this.zoomRatio = 0.8;
  }

  init(option: { width: number; height: number }) {
    const workspaceEl = document.querySelector('#workspace') as HTMLElement;
    if (!workspaceEl) {
      throw new Error('element #workspace is missing, plz check!');
    }
    this.workspaceEl = workspaceEl;
    this.workspace = null;
    this.option = option;
    this._initBackground();
    this._initWorkspace();
    this._initResizeObserve();
    // this._bindWheel();
    this._bindSizeChange();
  }

  hookImportAfter() {
    return new Promise((resolve) => {
      const workspace = this.canvas.getObjects().find((item) => item.id === 'workspace');
      if (workspace) {
        workspace.set('selectable', false);
        workspace.set('hasControls', false);
        workspace.set('evented', false);
        this.setSize(workspace.width, workspace.height);
      }
      resolve('');
    });
  }

  hookSaveAfter() {
    return new Promise((resolve) => {
      this.auto();
      resolve(true);
    });
  }

  // 初始化背景
  _initBackground() {
    this.canvas.backgroundImage = '';
    this.canvas.setWidth(this.workspaceEl.offsetWidth);
    this.canvas.setHeight(this.workspaceEl.offsetHeight);
  }

  // 初始化画布
  _initWorkspace() {
    const { width, height } = this.option;
    const workspace = new fabric.Rect({
      fill: 'rgba(0,0,0,1)',
      width,
      height,
      id: 'workspace',
      strokeWidth: 0,
    });
    workspace.set('selectable', false);
    workspace.set('hasControls', false);
    workspace.set('originX', 'center');
    workspace.set('originY', 'center');
    workspace.hoverCursor = 'default';
    this.canvas.add(workspace);
    this.canvas.renderAll();

    const backgroundMedia = new fabric.Image('', {
      id: 'workspaceBg',
    });
    backgroundMedia.visible = false;

    this.backgroundMedia = backgroundMedia;
    this.workspace = workspace;
    if (this.canvas.clearHistory) {
      this.canvas.clearHistory();
    }
    this.auto();
  }

  // 返回workspace对象
  getWorkspase() {
    return this.canvas.getObjects().find((item) => item.id === 'workspace') as fabric.Rect;
  }

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  setCenterFromObject(obj: fabric.Rect) {
    const { canvas } = this;
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = (canvas.height * 0.95) / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }

  // 初始化监听器
  _initResizeObserve() {
    const resizeObserver = new ResizeObserver(
      throttle(() => {
        this.auto();
      }, 50)
    );
    resizeObserver.observe(this.workspaceEl);
  }

  setSize(width: number | undefined, height: number | undefined, needAuto = true) {
    this._initBackground();
    this.option.width = width;
    this.option.height = height;
    // 重新设置workspace
    this.workspace = this.canvas
      .getObjects()
      .find((item) => item.id === 'workspace') as fabric.Rect;
    this.workspace.set('width', width);
    this.workspace.set('height', height);
    this.editor.emit('sizeChange', this.workspace.width, this.workspace.height);
    needAuto && this.auto();
  }

  setZoomAuto(scale: number, cb?: (left?: number, top?: number) => void) {
    const { workspaceEl } = this;
    const width = workspaceEl.offsetWidth;
    const height = workspaceEl.offsetHeight;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    const center = this.canvas.getCenter();
    this.canvas.setViewportTransform(fabric.iMatrix.concat());
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);
    if (!this.workspace) return;
    this.setCenterFromObject(this.workspace);
    this.editor.emit('zoomChange', {
      ...this.canvas.getCenter(),
      zoom: scale,
    });
    if (cb) cb(this.workspace.left, this.workspace.top);
  }

  _getScale() {
    return fabric.util.findScaleToFit(this.getWorkspase(), {
      width: this.workspaceEl.offsetWidth,
      height: this.workspaceEl.offsetHeight,
    });
  }

  // 放大
  big() {
    let zoomRatio = this.canvas.getZoom();
    zoomRatio += 0.05;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
  }

  // 缩小
  small() {
    let zoomRatio = this.canvas.getZoom();
    zoomRatio -= 0.05;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(
      new fabric.Point(center.left, center.top),
      zoomRatio < 0 ? 0.01 : zoomRatio
    );
  }

  // 自动缩放
  auto() {
    const scale = this._getScale();
    this.setZoomAuto(scale * this.zoomRatio);
  }

  // 1:1 放大
  one() {
    this.setZoomAuto(1 * this.zoomRatio);
    this.canvas.requestRenderAll();
  }

  setWorkspaseBg(color: string) {
    const workspase = this.getWorkspase();
    if (workspase) {
      workspase.set('fill', color);
      this.canvas.requestRenderAll();
      if (this.backgroundMedia) {
        this.backgroundMedia.visible = false;
      }
    }
  }

  _setBackgroundEl(ele: HTMLVideoElement | HTMLImageElement) {
    if (this.backgroundMedia) {
      this.backgroundMedia.setElement(ele);
      this.backgroundMedia.set({
        width: ele.width,
        height: ele.height,
        visible: true,
      });
      console.log(this.backgroundMedia);
      if (this.workspace) {
        this.workspace.fill = 'transparent';
      }
      this.canvas.requestRenderAll();
    }
  }

  setWorkspaseMediaBg(url: string, isVideo = false) {
    // TODO 未完成
    if (this.backgroundMedia) {
      if (isVideo) {
        const element = document.createElement('video');
        element.crossOrigin = 'anonymous';
        element.src = url;
        element.preload = 'auto';
        element.loop = true;
        element.muted = false;
        // 加入画布存在一定的延迟
        element.onloadeddata = () => {
          element.width = element.videoWidth;
          element.height = element.videoHeight;
          this._setBackgroundEl(element);
        };
      } else {
        const ele = new Image();
        ele.src = url;
        ele.onload = () => {
          this._setBackgroundEl(ele);
        };
      }
    }
  }

  _bindWheel() {
    this.canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      const center = this.canvas.getCenter();
      this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
      this.editor.emit('zoomChange');
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  clipPathOrRefreshMask() {
    if (this.editor.getPlugin('MaskPlugin')) {
      this.editor.setCoverMask(true);
    } else {
      // 超出画布不展示
      this.workspace?.clone((cloned: fabric.Rect) => {
        this.canvas.clipPath = cloned;
        this.canvas.requestRenderAll();
      });
    }
  }

  private _bindSizeChange() {
    this.editor.on('sizeChange', () => this.clipPathOrRefreshMask());
    this.editor.on('zoomChange', () => this.clipPathOrRefreshMask());
  }

  destroy() {
    console.log('pluginDestroy');
  }
}

export default WorkspacePlugin;
