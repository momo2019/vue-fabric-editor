import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import { MaterialGroup, MaterialType } from '@/interfaces/material';
import MaterialList from '@/components/MaterialList';
import { MOCK_MATERIALS } from '@/mocks/material';

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
    ];

    const materials: Record<MaterialType, MaterialGroup[]> = MOCK_MATERIALS;

    const typeItemDom = (item: TypeItem) => (
      <div
        class={[styles.type_item, activeType.value === item.type && styles.type_item_active]}
        onClick={() => changeType(item.type)}
      >
        {item.label}
      </div>
    );

    const addMaterial = (url: string) => {
      // TODO 添加素材进入画布
      console.log(activeType.value, url);
    };

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_type}>{types.map(typeItemDom)}</div>
        <div class={styles.wrap_material}>
          <MaterialList data={materials[activeType.value]} onAdd={addMaterial}></MaterialList>
        </div>
      </div>
    );
  },
});
