import { defineComponent } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_type}>素材分类</div>
        <div class={styles.wrap_material}>素材列表</div>
      </div>
    );
  },
});
