import { defineComponent } from 'vue';
import styles from './index.module.scss';
import Left from './components/Left';
import Content from './components/Content';
import OperatePane from '@/components/OperatePane';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_left}>
          <Left></Left>
        </div>
        <div class={styles.wrap_content}>
          <Content></Content>
        </div>
        <div class={styles.wrap_right}>
          <OperatePane></OperatePane>
        </div>
      </div>
    );
  },
});
