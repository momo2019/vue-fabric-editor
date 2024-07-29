import { MaterialType } from '@/interfaces/material';
import { NodeReturnType } from './useNode';
import { v4 } from 'uuid';
import { AUDIO_CONFIG } from '@/utils/config';

export const useAudio = (node: NodeReturnType) => {
  const addAudio = (url: string) => {
    const uid = v4();
    node.addNode(
      {
        type: MaterialType.audio,
        data: url,
        cover: AUDIO_CONFIG.cover,
      },
      uid
    );
    node.setActiveNode(uid);
  };

  return {
    addAudio,
  };
};
