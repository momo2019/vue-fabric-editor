import { MaterialType, MaterialGroup } from '@/interfaces/material';

export const MOCK_MATERIALS: Record<MaterialType, MaterialGroup[]> = {
  [MaterialType.image]: [
    {
      label: '背景',
      list: new Array(40).fill(0).map((_, i) => ({
        url: i % 2 ? '/test.jpeg' : '/cover.jpeg',
      })),
    },
  ],
  [MaterialType.video]: [
    {
      label: '背景',
      list: new Array(4).fill(0).map(() => ({
        cover: '/cover.jpeg',
        url: '/test.mp4',
      })),
    },
    {
      label: '背景2',
      list: new Array(40).fill(0).map(() => ({
        cover: '/cover.jpeg',
        url: '/test.mp4',
      })),
    },
  ],
};
