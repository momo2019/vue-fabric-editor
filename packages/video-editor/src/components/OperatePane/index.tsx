/**
 * 该组件存在业务关系
 */
import { defineComponent } from 'vue';
import styles from './index.module.scss';
import Time from './operates/time';
import { elementStore } from '@/store/element';
import Base from './operates/base';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () =>
      store.activeNode && (
        <div class={styles.wrap}>
          <Time></Time>
          <Base></Base>
        </div>
      );
  },
});
