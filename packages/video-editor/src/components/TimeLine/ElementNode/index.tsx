import { ElementItem } from '@/interfaces/element';
import styles from './index.module.scss';
import { elementStore } from '@/store/element';

export const elementNodeDom = (
  item: ElementItem,
  mouseDown: (ev: MouseEvent, item: ElementItem, pos: 'left' | 'right') => void
) => {
  const store = elementStore();

  const startTime = item.startTime || 0;
  const endTime = item.endTime || store.duration;
  const left = store.perSecGapWidth * startTime;
  const width = (endTime - startTime) * store.perSecGapWidth;
  return (
    <div class={styles.node}>
      <div
        class={styles.node_icon}
        style={{
          backgroundImage: item.cover ? `url(${item.cover})` : undefined,
        }}
      ></div>
      <div class={[styles.node_duration, store.activeNode?.uid === item.uid && styles.node_active]}>
        <div
          class={styles.node_duration_bar}
          style={{
            width: `${width}px`,
            left: `${left}px`,
          }}
        >
          <div class={styles.bar_left} onMousedown={(ev) => mouseDown(ev, item, 'left')}></div>
          <div class={styles.bar_right} onMousedown={(ev) => mouseDown(ev, item, 'right')}></div>
        </div>
      </div>
    </div>
  );
};