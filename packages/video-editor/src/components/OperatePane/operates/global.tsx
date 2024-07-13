import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>全局配置</div>
        <InputNumber
          value={store.global.width}
          formatter={(value) => Math.ceil(value)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '宽度',
          }}
          onChange={store.setGlobalWidth}
        ></InputNumber>

        <InputNumber
          value={store.global.height}
          formatter={(value) => Math.ceil(value)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '高度',
          }}
          onChange={store.setGlobalHeight}
        ></InputNumber>
      </div>
    );
  },
});
