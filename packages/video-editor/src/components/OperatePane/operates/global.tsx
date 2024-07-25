import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber, Select } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';
import { BACKGROUND_TYPES } from '@/utils/config';
import { BackgoundType } from '@/interfaces/common';
import { ColorPicker } from 'vue3-colorpicker';

export default defineComponent({
  setup() {
    const store = elementStore();

    const backgroundTypeOptionDom = () => {
      switch (store.background.type) {
        case BackgoundType.color:
          return (
            <LabelWrap label="选择颜色">
              <ColorPicker
                pureColor={store.background.data}
                onPureColorChange={(data) => store.setBackground({ data })}
                disableHistory={true}
                disableAlpha={true}
                pickerType="pure"
              ></ColorPicker>
            </LabelWrap>
          );
        case BackgoundType.image:
          return (
            <LabelWrap label="选择图片">
              <Select
                value={store.background.data}
                options={store.backgroundImageList}
                style={{ width: '100%' }}
                onChange={(data) => store.setBackground({ data: data as string })}
              ></Select>
            </LabelWrap>
          );
        case BackgoundType.video:
          return <></>;
        default:
          return <></>;
      }
    };

    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>全局配置</div>
        <InputNumber
          value={store.global.width}
          formatter={(value) => `${Math.ceil(value as number)}`}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '宽度',
          }}
          onChange={(value) => store.setGlobalWidth(value as number)}
        ></InputNumber>

        <InputNumber
          value={store.global.height}
          formatter={(value) => `${Math.ceil(value as number)}`}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '高度',
          }}
          onChange={(value) => store.setGlobalHeight(value as number)}
        ></InputNumber>

        <InputNumber
          value={store.duration}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '时长',
          }}
          onChange={(value) => store.changeDuration(value as number)}
        ></InputNumber>

        <div class={styles.pane_title}>背景</div>
        <LabelWrap label="选择类型">
          <Select
            value={store.background.type}
            options={BACKGROUND_TYPES}
            style={{ width: '100%' }}
            onChange={(type) => store.setBackground({ type: type as BackgoundType })}
          ></Select>
        </LabelWrap>
        {backgroundTypeOptionDom()}
      </div>
    );
  },
});
