import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber, RadioGroup, Select, Switch, Textarea } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';
import { OptionItem } from '@/interfaces/common';
import { ColorPicker } from 'vue3-colorpicker';
import { FONT_ALIGN_OPTIONS } from '@/utils/config';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>文本配置</div>
        <LabelWrap label="文本内容">
          <Textarea
            value={store.activeNodeShowValue?.data}
            onInput={(ev) => store.setFontText((ev.target as HTMLInputElement).value)}
          ></Textarea>
        </LabelWrap>
        <LabelWrap label="文字大小">
          <InputNumber
            value={store.activeNodeShowValue?.fontSize}
            formatter={(value) => `${Math.ceil(value as number)}`}
            parser={(value) => Number(value)}
            style={{ width: '100%' }}
            min={10}
            onChange={(value) => store.setFontSize(value as number)}
          ></InputNumber>
        </LabelWrap>

        <LabelWrap label="字体选择">
          <Select
            value={store.activeNodeShowValue?.fontFamily}
            options={store.fontFamilyList}
            style={{ width: '100%' }}
            v-slots={{
              option: ({ label, value }: OptionItem) => (
                <span style={{ fontFamily: value }}>{label}</span>
              ),
            }}
            onChange={(value) => store.setFontFamily(value as string)}
          ></Select>
        </LabelWrap>

        <LabelWrap label="开启粗体">
          <Switch
            checked={store.activeNodeShowValue?.fontWeight === 'bold'}
            onChange={(value) => store.setFontWeight(value as boolean)}
          ></Switch>
        </LabelWrap>

        <LabelWrap label="开启斜体">
          <Switch
            checked={store.activeNodeShowValue?.fontStyle === 'italic'}
            onChange={(value) => store.setFontStyle(value as boolean)}
          ></Switch>
        </LabelWrap>

        <LabelWrap label="文字颜色">
          <ColorPicker
            theme="dark"
            pureColor={store.activeNodeShowValue?.color}
            onPureColorChange={store.setFontColor}
            disableHistory={true}
            pickerType="pure"
          ></ColorPicker>
        </LabelWrap>

        <LabelWrap label="文字位置">
          <RadioGroup
            value={store.activeNodeShowValue?.textAlign}
            optionType="button"
            style={{ width: '100%' }}
            options={FONT_ALIGN_OPTIONS}
            onChange={(value) => store.setTextAlign(value.target.value as string)}
          ></RadioGroup>
        </LabelWrap>

        <LabelWrap label="文字间距">
          <InputNumber
            value={store.activeNodeShowValue?.letterSpacing}
            style={{ width: '100%' }}
            step={1}
            onChange={(value) => store.setLetterSpacing(value as number)}
          ></InputNumber>
        </LabelWrap>
      </div>
    );
  },
});
