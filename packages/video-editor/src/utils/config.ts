import { BackgoundType } from '@/interfaces/common';

export const DEFAULT_FONT_CONFIG = {
  fontfamily: 'Arial',
  data: '默认文本',
  icon: './test2.png',
  color: '#fff',
};

export const FONT_ALIGN_OPTIONS = [
  {
    value: 'left',
    label: '左',
  },
  {
    value: 'center',
    label: '居中',
  },
  {
    value: 'right',
    label: '右',
  },
];

export const BACKGROUND_COLOR = '#ffffff';
export const BACKGROUND_TYPES = [
  {
    value: BackgoundType.color,
    label: '颜色',
  },
  {
    value: BackgoundType.image,
    label: '图片',
  },
  {
    value: BackgoundType.video,
    label: '视频',
  },
];

export const AUDIO_CONFIG = {
  cover: './test2.png',
};
