import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber, Select } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>动画</div>
        <LabelWrap label="开始动画">
          <Select
            value={store.activeNodeShowValue!.startAnimation}
            options={store.startAnimationList}
            style={{ width: '100%' }}
            allowClear
            onChange={(value) => store.setStartAnimation(value as string)}
          ></Select>
        </LabelWrap>

        <InputNumber
          value={store.activeNodeShowValue!.startAnimationTime}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          min={0}
          max={5}
          v-slots={{
            addonBefore: () => '开始动画用时',
          }}
          onChange={(value) => store.setStartAnimationTime(value as number)}
        ></InputNumber>

        <LabelWrap label="结束动画">
          <Select
            value={store.activeNodeShowValue!.endAnimation}
            options={store.endAnimationList}
            style={{ width: '100%' }}
            allowClear
            onChange={(value) => store.setEndAnimation(value as string)}
          ></Select>
        </LabelWrap>

        <InputNumber
          value={store.activeNodeShowValue!.endAnimationTime}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          min={0}
          max={5}
          v-slots={{
            addonBefore: () => '结束动画用时',
          }}
          onChange={(value) => store.setEndAnimationTime(value as number)}
        ></InputNumber>
      </div>
    );
  },
});
