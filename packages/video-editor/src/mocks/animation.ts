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
];
