import { ElementItem } from '@/interfaces/element';
import styles from './index.module.scss';

export const elementNodeDom = (item: ElementItem) => (
  <div class={styles.node}>
    <div
      class={styles.node_icon}
      style={{
        backgroundImage: item.cover ? `url(${item.cover})` : undefined,
      }}
    ></div>
    <div class={styles.node_duration}></div>
  </div>
);
