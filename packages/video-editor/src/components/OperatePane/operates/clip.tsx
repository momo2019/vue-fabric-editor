import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { Select } from 'ant-design-vue';
import { elementStore } from '@/store/element';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>蒙版</div>
        <Select
          value={store.activeNodeShowValue!.clip}
          options={store.clipList}
          style={{ width: '100%' }}
          allowClear
          onChange={store.setClip}
        ></Select>
      </div>
    );
  },
});
