import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import {
  MaterialGroupType,
  MaterialGroup,
  MaterialItem,
  MaterialType,
} from '@/interfaces/material';
import MaterialList from '@/components/MaterialList';
import { MOCK_MATERIALS } from '@/mocks/material';
import { elementStore } from '@/store/element';

type TypeItem = { type: MaterialGroupType; label: string };

export default defineComponent({
  setup() {
    const activeType = ref<MaterialGroupType>(MaterialGroupType.image);
    const store = elementStore();

    const changeType = (type: MaterialGroupType) => {
      activeType.value = type;
    };

    const types: TypeItem[] = [
      {
        type: MaterialGroupType.custom,
        label: '添加',
      },
      {
        type: MaterialGroupType.image,
        label: '图片',
      },
      {
        type: MaterialGroupType.video,
        label: '视频',
      },
    ];

    const materials: Record<MaterialGroupType.image | MaterialGroupType.video, MaterialGroup[]> =
      MOCK_MATERIALS;

    const typeItemDom = (item: TypeItem) => (
      <div
        class={[styles.type_item, activeType.value === item.type && styles.type_item_active]}
        onClick={() => changeType(item.type)}
      >
        {item.label}
      </div>
    );

    const addMaterial = (item: MaterialItem) => {
      switch (item.type) {
        case MaterialType.image:
          store.addImage(item.data, item);
          break;
        case MaterialType.video:
          store.addVideo(item.data, item);
          break;
        default:
          break;
      }
    };

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_type}>{types.map(typeItemDom)}</div>
        <div class={styles.wrap_material}>
          {activeType.value === MaterialGroupType.custom ? (
            <div>132</div>
          ) : (
            <MaterialList data={materials[activeType.value]} onAdd={addMaterial}></MaterialList>
          )}
        </div>
      </div>
    );
  },
});
