import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import { MaterialType } from '@/interfaces/material';

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
          onChange={(value) => store.setX(value as number)}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue?.y}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          v-slots={{
            addonBefore: () => '位置 Y',
          }}
          onChange={(value) => store.setY(value as number)}
        ></InputNumber>

        {store.activeNode?.type !== MaterialType.text && (
          <>
            <InputNumber
              value={store.activeNodeShowValue?.width}
              formatter={(value) => Number(value).toFixed(2)}
              parser={(value) => Number(value)}
              v-slots={{
                addonBefore: () => '宽度',
              }}
              onChange={(value) => store.setWidth(value as number)}
            ></InputNumber>

            <InputNumber
              value={store.activeNodeShowValue?.height}
              formatter={(value) => Number(value).toFixed(2)}
              parser={(value) => Number(value)}
              v-slots={{
                addonBefore: () => '高度',
              }}
              onChange={(value) => store.setHeight(value as number)}
            ></InputNumber>
          </>
        )}

        <InputNumber
          value={store.activeNodeShowValue?.rotation}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          min={0}
          max={360}
          v-slots={{
            addonBefore: () => '旋转',
          }}
          onChange={(value) => store.setRotation(value as number)}
        ></InputNumber>

        <InputNumber
          value={store.activeNodeShowValue?.opacity}
          formatter={(value) => Number(value).toFixed(2)}
          parser={(value) => Number(value)}
          min={0}
          max={1}
          step={0.1}
          v-slots={{
            addonBefore: () => '透明度',
          }}
          onChange={(value) => store.setOpacity(value as number)}
        ></InputNumber>
      </div>
    );
  },
});
