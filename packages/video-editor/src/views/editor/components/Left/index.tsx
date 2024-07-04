import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import { MaterialType } from '@/interfaces/material';

type TypeItem = { type: MaterialType; label: string };

export default defineComponent({
  setup() {
    const activeType = ref<MaterialType>(MaterialType.image);

    const changeType = (type: MaterialType) => {
      activeType.value = type;
    };

    const types: TypeItem[] = [
      {
        type: MaterialType.image,
        label: '图片',
      },
      {
        type: MaterialType.video,
        label: '视频',
      },
      {
        type: MaterialType.text,
        label: '文本',
      },
    ];

    const typeItemDom = (item: TypeItem) => (
      <div
        class={[styles.type_item, activeType.value === item.type && styles.type_item_active]}
        onClick={() => changeType(item.type)}
      >
        {item.label}
      </div>
    );

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_type}>{types.map(typeItemDom)}</div>
        <div class={styles.wrap_material}>素材列表</div>
      </div>
    );
  },
});
