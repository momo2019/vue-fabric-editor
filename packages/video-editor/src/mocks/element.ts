import { ElementItem } from '@/interfaces/element';
import { v4 } from 'uuid';

export const MOCK_ELEMENETS: ElementItem[] = new Array(40).fill(0).map((_, i) => ({
  uid: v4(),
  cover: i % 3 ? undefined : '/cover.jpeg',
  startTime: (i % 4) * 10,
  endTime: 60,
}));
