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
        <div class={styles.pane_title}>显示时间</div>
        <LabelWrap label="开始时间">
          <InputNumber
            value={store.activeNodeShowValue?.startTime}
            formatter={(value) => Number(value).toFixed(2)}
            parser={(value) => Number(value)}
            style={{ width: '100%' }}
            min={0}
            onBlur={(e) => store.setStartTime(Number((e.target as HTMLInputElement).value))}
            onPressEnter={(e) => store.setStartTime(Number((e.target as HTMLInputElement).value))}
            onStep={(value) => store.setStartTime(value as number)}
          ></InputNumber>
        </LabelWrap>

        <LabelWrap label="结束时间">
          <InputNumber
            value={store.activeNodeShowValue?.endTime}
            formatter={(value) => Number(value).toFixed(2)}
            parser={(value) => Number(value)}
            style={{ width: '100%' }}
            min={0}
            onBlur={(e) => store.setEndTime(Number((e.target as HTMLInputElement).value))}
            onPressEnter={(e) => store.setEndTime(Number((e.target as HTMLInputElement).value))}
            onStep={(value) => store.setEndTime(value as number)}
          ></InputNumber>
        </LabelWrap>
      </div>
    );
  },
});
