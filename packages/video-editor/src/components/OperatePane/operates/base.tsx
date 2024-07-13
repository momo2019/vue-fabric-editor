import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>基础信息</div>
        <InputNumber
          value={store.activeNodeShowValue?.x}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '位置 X',
          }}
          onChange={store.setX}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue?.y}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '位置 Y',
          }}
          onChange={store.setY}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue?.width}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '宽度',
          }}
          onChange={store.setWidth}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue?.height}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '高度',
          }}
          onChange={store.setHeight}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue?.rotation}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '旋转',
          }}
          onChange={store.setRotation}
        ></InputNumber>
      </div>
    );
  },
});
