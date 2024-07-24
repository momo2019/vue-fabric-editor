import { AnimationCore, AnimationStep } from '@/interfaces/animation';
import { BaseNode } from '@/interfaces/element';

// 位置枚举
enum PositionType {
  left, // 视频左侧
  right, // 视频右侧
  center, // 视频中间
  top, // 视频上方
  bottom, // 视频下方
  own, // 素材原本位置
}

// 滑动动画集
const SLIDE_IN_OUT = {
  // 从下方移入
  slideDownIn: {
    from: { y: PositionType.top },
    to: { y: PositionType.own },
    ease: 'Quadratic.InOut',
  },

  // 向下方移出
  slideDownOut: {
    from: { y: PositionType.own },
    to: { y: PositionType.bottom },
    ease: 'Quadratic.InOut',
  },

  // 从上方移入
  slideUpIn: {
    from: { y: PositionType.bottom },
    to: { y: PositionType.own },
    ease: 'Quadratic.InOut',
  },

  // 向上方移出
  slideUpOut: {
    from: { y: PositionType.own },
    to: { y: PositionType.top },
    ease: 'Quadratic.InOut',
  },

  // 从左侧移入
  slideLeftIn: {
    from: { x: PositionType.left },
    to: { x: PositionType.own },
    ease: 'Quadratic.InOut',
  },

  // 向左侧移出
  slideLeftOut: {
    from: { x: PositionType.own },
    to: { x: PositionType.right },
    ease: 'Quadratic.InOut',
  },

  // 从右侧移入
  slideRightIn: {
    from: { x: PositionType.right },
    to: { x: PositionType.own },
    ease: 'Quadratic.InOut',
  },

  // 向右侧移出
  slideRightOut: {
    from: { x: PositionType.own },
    to: { x: PositionType.left },
    ease: 'Quadratic.InOut',
  },
};

const ZOOM_MAX = 3; // 缩放最大倍数
const ZOOM_MIN = 0.01; // 缩小最小倍数

// 缩放动画集合
const ZOOM_IN_OUT = {
  // 放大进入
  zoomInIn: {
    from: { scale: ZOOM_MIN, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    ease: 'Quadratic.InOut',
  },

  // 放大退出
  zoomInOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: ZOOM_MAX, opacity: 0 },
    ease: 'Quadratic.InOut',
  },

  // 缩小进入
  zoomOutIn: {
    from: { scale: ZOOM_MAX, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    ease: 'Quadratic.InOut',
  },

  // 缩小退出
  zoomOutOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: ZOOM_MIN, opacity: 0 },
    ease: 'Quadratic.InOut',
  },
};

const WIPE_MIN = 0.0001; // 擦除的最小值

// 擦除动画集合
const WIPE_IN_OUT = {
  // 从左侧擦入，最左侧内容最后出现
  wipeLeftIn: {
    from: { hor: 1, dir: 1, ratio: WIPE_MIN },
    to: { hor: 1, dir: 1, ratio: 1 },
    ease: 'Quadratic.InOut',
  },

  // 向左侧擦除，最左侧内容最后消失
  wipeLeftOut: {
    from: { hor: 1, dir: -1, ratio: 1 },
    to: { hor: 1, dir: -1, ratio: 0 },
    ease: 'Quadratic.InOut',
  },

  // 从右侧擦入
  wipeRightIn: {
    from: { hor: 1, dir: -1, ratio: WIPE_MIN },
    to: { hor: 1, dir: -1, ratio: 1 },
    ease: 'Quadratic.InOut',
  },

  // 向右侧擦除
  wipeRightOut: {
    from: { hor: 1, dir: 1, ratio: 1 },
    to: { hor: 1, dir: 1, ratio: 0 },
    ease: 'Quadratic.InOut',
  },

  // 从下方擦入
  wipeDownIn: {
    from: { hor: 0, dir: -1, ratio: WIPE_MIN },
    to: { hor: 0, dir: -1, ratio: 1 },
    ease: 'Quadratic.InOut',
  },

  // 向下方擦除
  wipeDownOut: {
    from: { hor: 0, dir: 1, ratio: 1 },
    to: { hor: 0, dir: 1, ratio: 0 },
    ease: 'Quadratic.InOut',
  },

  // 从上方擦入
  wipeUpIn: {
    from: { hor: 0, dir: 1, ratio: WIPE_MIN },
    to: { hor: 0, dir: 1, ratio: 1 },
    ease: 'Quadratic.InOut',
  },

  // 向下方擦除
  wipeUpOut: {
    from: { hor: 0, dir: -1, ratio: 1 },
    to: { hor: 0, dir: -1, ratio: 0 },
    ease: 'Quadratic.InOut',
  },
};

/**
 * 根据type获取默认动画的原始数据
 * @param type
 * @returns
 */
const GET_DEFAULT_ANIMATION = (type: string): AnimationCore | undefined => {
  const data = {
    fadeIn: { from: { opacity: 0 }, to: { opacity: 1 }, ease: 'Quadratic.InOut' },
    fadeOut: { from: { opacity: 1 }, to: { opacity: 0 }, ease: 'Quadratic.InOut' },
    ...SLIDE_IN_OUT,
    // ...ZOOM_IN_OUT,
    // ...WIPE_IN_OUT,
  }[type];

  // 防止污染原数据，深度克隆
  return JSON.parse(JSON.stringify(data));
};

/**
 * 处理默认动画中的，x和y的数值
 * @param base 显示元素的数据，元素的xy和width，height
 * @param data 视频场景的数据，视频宽高，时长
 * @param animation 要处理的动画数据
 */
const setEnumData = (
  base: BaseNode,
  data: {
    height: number;
    width: number;
  },
  animation: AnimationStep
) => {
  // 可能会不存在元素的宽高，如文字元素，导致计算错误。
  const baseWidth = base.width ?? data.width;
  const baseHeight = base.height ?? data.height;

  switch (animation.x) {
    case PositionType.left:
      animation.x = -baseWidth / 2 - data.width / 2;
      break;
    case PositionType.right:
      animation.x = baseWidth / 2 + data.width / 2;
      break;
    case PositionType.center:
      animation.x = 0;
      break;
    case PositionType.own:
      animation.x = base.x;
      break;
    default:
      delete animation.x;
      break;
  }

  switch (animation.y) {
    case PositionType.top:
      animation.y = -baseHeight / 2 - data.height / 2;
      break;
    case PositionType.bottom:
      animation.y = baseHeight / 2 + data.height / 2;
      break;
    case PositionType.center:
      animation.y = 0;
      break;
    case PositionType.own:
      animation.y = base.y;
      break;
    default:
      delete animation.y;
      break;
  }
};

/**
 * 获取默认动画
 * @param type 默认动画的类型
 * @param base 显示元素的数据，元素的xy和width，height
 * @param data 视频场景的数据，视频宽高，时长
 * @returns
 */
export const getDefaultAnimation = (
  type: string,
  base: BaseNode,
  data: {
    height: number;
    width: number;
  }
): AnimationCore => {
  const animation = GET_DEFAULT_ANIMATION(type);
  if (animation) {
    setEnumData(base, data, animation.from);
    setEnumData(base, data, animation.to);
    return animation;
  } else {
    // 不存在，就返回一个空动画
    return {
      from: {},
      to: {},
    };
  }
};
