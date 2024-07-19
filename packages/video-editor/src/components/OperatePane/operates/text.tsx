import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>文本配置</div>
        <InputNumber
          value={store.activeNodeShowValue!.fontSize}
          formatter={(value) => Math.ceil(value)}
          parser={(value) => Number(value)}
          min={10}
          v-slots={{
            addonBefore: () => '文字大小',
          }}
          onChange={store.setFontSize}
        ></InputNumber>
      </div>
    );
  },
});
