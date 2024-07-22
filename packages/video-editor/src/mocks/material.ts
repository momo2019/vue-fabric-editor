import { MaterialGroupType, MaterialType, MaterialGroup } from '@/interfaces/material';

export const MOCK_MATERIALS: Record<
  MaterialGroupType.video | MaterialGroupType.image,
  MaterialGroup[]
> = {
  [MaterialGroupType.image]: [
    {
      label: '背景',
      list: new Array(40).fill(0).map((_, i) => ({
        data: ['/test.jpeg', '/cover.jpeg', '/test2.png'][i % 3],
        type: MaterialType.image,
      })),
    },
  ],
  [MaterialGroupType.video]: [
    {
      label: '背景',
      list: new Array(4).fill(0).map(() => ({
        cover: '/cover.jpeg',
        data: '/test.mp4',
        type: MaterialType.video,
      })),
    },
    {
      label: '背景2',
      list: new Array(40).fill(0).map(() => ({
        cover: '/test.jpeg',
        data: '/video1.mp4',
        type: MaterialType.video,
      })),
    },
  ],
};
