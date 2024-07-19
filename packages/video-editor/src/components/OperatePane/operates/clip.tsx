import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { Select } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>蒙版</div>
        <LabelWrap label="选择蒙版">
          <Select
            value={store.activeNodeShowValue!.clip}
            options={store.clipList}
            style={{ width: '100%' }}
            allowClear
            onChange={(value) => store.setClip(value as string)}
          ></Select>
        </LabelWrap>
      </div>
    );
  },
});
