import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { InputNumber } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import { MaterialType } from '@/interfaces/material';
import LabelWrap from '../LabelWrap';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>基础信息</div>
        <LabelWrap label="位置 X">
          <InputNumber
            value={store.activeNodeShowValue?.x}
            formatter={(value) => Number(value).toFixed(2)}
            style={{ width: '100%' }}
            parser={(value) => Number(value)}
            onChange={(value) => store.setX(value as number)}
          ></InputNumber>
        </LabelWrap>

        <LabelWrap label="位置 Y">
          <InputNumber
            value={store.activeNodeShowValue?.y}
            formatter={(value) => Number(value).toFixed(2)}
            style={{ width: '100%' }}
            parser={(value) => Number(value)}
            onChange={(value) => store.setY(value as number)}
          ></InputNumber>
        </LabelWrap>

        {store.activeNode?.type !== MaterialType.text && (
          <>
            <LabelWrap label="宽度">
              <InputNumber
                value={store.activeNodeShowValue?.width}
                formatter={(value) => Number(value).toFixed(2)}
                style={{ width: '100%' }}
                parser={(value) => Number(value)}
                onChange={(value) => store.setWidth(value as number)}
              ></InputNumber>
            </LabelWrap>

            <LabelWrap label="高度">
              <InputNumber
                value={store.activeNodeShowValue?.height}
                formatter={(value) => Number(value).toFixed(2)}
                style={{ width: '100%' }}
                parser={(value) => Number(value)}
                onChange={(value) => store.setHeight(value as number)}
              ></InputNumber>
            </LabelWrap>
          </>
        )}

        <LabelWrap label="旋转">
          <InputNumber
            value={store.activeNodeShowValue?.rotation}
            formatter={(value) => Number(value).toFixed(2)}
            parser={(value) => Number(value)}
            style={{ width: '100%' }}
            min={0}
            max={360}
            onChange={(value) => store.setRotation(value as number)}
          ></InputNumber>
        </LabelWrap>

        <LabelWrap label="透明度">
          <InputNumber
            value={store.activeNodeShowValue?.opacity}
            formatter={(value) => Number(value).toFixed(2)}
            parser={(value) => Number(value)}
            style={{ width: '100%' }}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => store.setOpacity(value as number)}
          ></InputNumber>
        </LabelWrap>
      </div>
    );
  },
});
