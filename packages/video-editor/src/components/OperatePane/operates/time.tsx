import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>显示时间</div>
        <InputNumber
          value={store.activeNodeStartTime}
          precision={2}
          v-slots={{
            addonBefore: () => '开始时间',
          }}
          onChange={store.setStartTime}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeEndTime}
          precision={2}
          v-slots={{
            addonBefore: () => '结束时间',
          }}
          onChange={store.setEndTime}
        ></InputNumber>
      </div>
    );
  },
});
