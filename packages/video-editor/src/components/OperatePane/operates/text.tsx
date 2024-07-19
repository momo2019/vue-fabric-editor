import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { Input, InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';

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
          onInput={(ev: InputEvent) => store.setFontText((ev.target as HTMLInputElement).value)}
        ></Input>
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
