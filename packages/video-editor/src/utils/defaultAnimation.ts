import { AnimationCore } from '@/interfaces/animation';

const DEFAULT_ANIMATION: Record<string, AnimationCore> = {
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  fadeOut: { from: { opacity: 1 }, to: { opacity: 0 } },
};

export const getDefaultAnimation = (type: string): AnimationCore | undefined => {
  return DEFAULT_ANIMATION[type];
};
