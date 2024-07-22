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
            pureColor={store.activeNodeShowValue!.shadowColor}
            onPureColorChange={store.setShadowColor}
            disableHistory={true}
            pickerType="pure"
          ></ColorPicker>
        </LabelWrap>

        <InputNumber
          value={store.activeNodeShowValue!.shadowOffsetX}
          formatter={(value) => `${Math.ceil(value as number)}`}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '阴影偏移X',
          }}
          onChange={(value) => store.setShadowOffsetX(value as number)}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue!.shadowOffsetY}
          formatter={(value) => `${Math.ceil(value as number)}`}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '阴影偏移Y',
          }}
          onChange={(value) => store.setShadowOffsetY(value as number)}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue!.shadowBlur}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          min={0}
          v-slots={{
            addonBefore: () => '阴影模糊度',
          }}
          onChange={(value) => store.setShadowBlur(value as number)}
        ></InputNumber>
      </div>
    );
  },
});
