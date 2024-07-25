import { OptionItem } from '@/interfaces/common';

export const START_ANIMATION_LIST: OptionItem[] = [
  {
    label: '渐显',
    value: 'fadeIn',
  },
  {
    label: '向下滑入',
    value: 'slideDownIn',
  },
  {
    label: '向上滑入',
    value: 'slideUpIn',
  },
  {
    label: '从左滑入',
    value: 'slideLeftIn',
  },
  {
    label: '从右滑入',
    value: 'slideRightIn',
  },

  {
    label: '放大进入',
    value: 'zoomInIn',
  },
  {
    label: '缩小进入',
    value: 'zoomOutIn',
  },

  {
    label: '从左侧擦入',
    value: 'wipeLeftIn',
  },
  {
    label: '从右侧擦入',
    value: 'wipeRightIn',
  },
  {
    label: '从下方擦入',
    value: 'wipeDownIn',
  },
  {
    label: '从上方擦入',
    value: 'wipeUpIn',
  },
];

export const END_ANIMATION_LIST: OptionItem[] = [
  {
    label: '渐隐',
    value: 'fadeOut',
  },
  {
    label: '向上滑出',
    value: 'slideUpOut',
  },
  {
    label: '向下滑出',
    value: 'slideDownOut',
  },
  {
    label: '从右滑出',
    value: 'slideRightOut',
  },
  {
    label: '从左滑出',
    value: 'slideLeftOut',
  },

  {
    label: '放大退出',
    value: 'zoomInOut',
  },
  {
    label: '缩小退出',
    value: 'zoomOutOut',
  },

  {
    label: '从左侧擦出',
    value: 'wipeLeftOut',
  },
  {
    label: '从右侧擦出',
    value: 'wipeRightOut',
  },
  {
    label: '从下方擦出',
    value: 'wipeDownOut',
  },
  {
    label: '从上方擦出',
    value: 'wipeUpOut',
  },
];
