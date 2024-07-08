import { ElementItem } from '@/interfaces/element';
import styles from './index.module.scss';

export const elementNodeDom = (
  item: ElementItem,
  perSecGap: number,
  duration: number,
  mouseDown: (ev: MouseEvent, item: ElementItem, pos: 'left' | 'right') => void
) => {
  const startTime = item.startTime || 0;
  const endTime = item.endTime || duration;
  const left = perSecGap * startTime;
  const width = (endTime - startTime) * perSecGap;
  return (
    <div class={styles.node}>
      <div
        class={styles.node_icon}
        style={{
          backgroundImage: item.cover ? `url(${item.cover})` : undefined,
        }}
      ></div>
      <div class={styles.node_duration}>
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
