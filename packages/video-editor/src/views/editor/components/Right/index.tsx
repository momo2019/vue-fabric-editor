import { defineComponent } from 'vue';
import styles from './index.module.scss';
import DrawerPane from '@/components/DrawerPane';
import OperatePane from '@/components/OperatePane';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.wrap}>
        <OperatePane></OperatePane>
      </div>
    );
  },
});
