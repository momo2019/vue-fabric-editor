import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { Input, InputNumber, Select, Switch } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';
import { OptionItem } from '@/interfaces/common';
import { ColorPicker } from 'vue3-colorpicker';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>文本配置</div>
        <Input
          value={store.activeNodeShowValue!.data}
          v-slots={{
            addonBefore: () => '文本内容',
          }}
          onInput={(ev) => store.setFontText((ev.target as HTMLInputElement).value)}
        ></Input>
        <InputNumber
          value={store.activeNodeShowValue!.fontSize}
          formatter={(value) => `${Math.ceil(value as number)}`}
          parser={(value) => Number(value)}
          min={10}
          v-slots={{
            addonBefore: () => '文字大小',
          }}
          onChange={(value) => store.setFontSize(value as number)}
        ></InputNumber>

        <LabelWrap label="字体选择">
          <Select
            value={store.activeNodeShowValue!.fontFamily}
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
            checked={store.activeNodeShowValue!.fontWeight === 'bold'}
            onChange={(value) => store.setFontWeight(value as boolean)}
          ></Switch>
        </LabelWrap>

        <LabelWrap label="开启斜体">
          <Switch
            checked={store.activeNodeShowValue!.fontStyle === 'italic'}
            onChange={(value) => store.setFontStyle(value as boolean)}
          ></Switch>
        </LabelWrap>

        <LabelWrap label="文字颜色">
          <ColorPicker
            pureColor={store.activeNodeShowValue!.color}
            onPureColorChange={store.setFontColor}
            disableHistory={true}
            pickerType="pure"
          ></ColorPicker>
        </LabelWrap>
      </div>
    );
  },
});
