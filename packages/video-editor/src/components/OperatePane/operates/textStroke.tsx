import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';
import { ColorPicker } from 'vue3-colorpicker';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>文字边框</div>
        <LabelWrap label="边框颜色">
          <ColorPicker
            theme="dark"
            pureColor={store.activeNodeShowValue?.strokeColor}
            onPureColorChange={store.setStrokeColor}
            disableHistory={true}
            pickerType="pure"
          ></ColorPicker>
        </LabelWrap>

        <LabelWrap label="边框宽度">
          <InputNumber
            value={store.activeNodeShowValue?.strokeWidth}
            formatter={(value) => `${Math.ceil(value as number)}`}
            parser={(value) => Number(value)}
            style={{ width: '100%' }}
            onChange={(value) => store.setStrokeWidth(value as number)}
          ></InputNumber>
        </LabelWrap>
      </div>
    );
  },
});
