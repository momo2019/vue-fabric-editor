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
        <div class={styles.pane_title}>文本阴影</div>
        <LabelWrap label="阴影颜色">
          <ColorPicker
            theme="dark"
            pureColor={store.activeNodeShowValue?.shadowColor}
            onPureColorChange={store.setShadowColor}
            disableHistory={true}
            pickerType="pure"
          ></ColorPicker>
        </LabelWrap>

        <LabelWrap label="阴影偏移X">
          <InputNumber
            value={store.activeNodeShowValue?.shadowOffsetX}
            formatter={(value) => `${Math.ceil(value as number)}`}
            style={{ width: '100%' }}
            parser={(value) => Number(value)}
            onChange={(value) => store.setShadowOffsetX(value as number)}
          ></InputNumber>
        </LabelWrap>

        <LabelWrap label="阴影偏移Y">
          <InputNumber
            value={store.activeNodeShowValue?.shadowOffsetY}
            style={{ width: '100%' }}
            formatter={(value) => `${Math.ceil(value as number)}`}
            parser={(value) => Number(value)}
            onChange={(value) => store.setShadowOffsetY(value as number)}
          ></InputNumber>
        </LabelWrap>

        <LabelWrap label="阴影模糊度">
          <InputNumber
            value={store.activeNodeShowValue?.shadowBlur}
            formatter={(value) => Number(value).toFixed(2)}
            style={{ width: '100%' }}
            parser={(value) => Number(value)}
            min={0}
            onChange={(value) => store.setShadowBlur(value as number)}
          ></InputNumber>
        </LabelWrap>
      </div>
    );
  },
});
