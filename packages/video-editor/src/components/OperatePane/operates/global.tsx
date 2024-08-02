import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';

export default defineComponent({
  setup() {
    const store = elementStore();

    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>全局配置</div>

        <LabelWrap label="时长">
          <InputNumber
            value={store.duration}
            formatter={(value) => Number(value).toFixed(2)}
            style={{ width: '100%' }}
            parser={(value) => Number(value)}
            onChange={(value) => store.changeDuration(value as number)}
          ></InputNumber>
        </LabelWrap>
      </div>
    );
  },
});
