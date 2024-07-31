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
import CustomMaterial, { CustomType } from '@/components/CustomMaterial';
import { DEFAULT_FONT_CONFIG } from '@/utils/config';
import DrawerPane from '@/components/DrawerPane';

type TypeItem = { type: MaterialGroupType; label: string };

export default defineComponent({
  setup() {
    const activeType = ref<MaterialGroupType>(MaterialGroupType.custom);
    const isOpen = ref(true);
    const store = elementStore();

    const changeType = (type: MaterialGroupType) => {
      activeType.value = type;
      isOpen.value = true;
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
        class={[
          styles.type_item,
          isOpen.value && activeType.value === item.type && styles.type_item_active,
        ]}
        onClick={() => changeType(item.type)}
      >
        {item.label}
      </div>
    );

    const addMaterial = (item: MaterialItem) => {
      switch (item.type) {
        case MaterialType.image:
          store.addImage(item.data, {
            ...item,
            cover: item.cover || item.data,
          });
          break;
        case MaterialType.video:
          store.addVideo(item.data, item);
          break;
        default:
          break;
      }
    };

    const addCustomMaterial = (type: CustomType) => {
      switch (type) {
        case CustomType.text:
          store.addText(DEFAULT_FONT_CONFIG.data, {
            type: MaterialType.text,
            data: DEFAULT_FONT_CONFIG.data,
            cover: DEFAULT_FONT_CONFIG.icon,
          });
          break;
        case CustomType.audio:
          store.addAudio('./02.wav');
          break;
        default:
          break;
      }
    };

    const changeActive = (open: boolean) => {
      isOpen.value = open;
    };

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_type}>{types.map(typeItemDom)}</div>
        <DrawerPane open={isOpen.value} size={262} onChange={changeActive}>
          <div class={styles.wrap_material}>
            {activeType.value === MaterialGroupType.custom ? (
              <CustomMaterial onAdd={addCustomMaterial}></CustomMaterial>
            ) : (
              <MaterialList data={materials[activeType.value]} onAdd={addMaterial}></MaterialList>
            )}
          </div>
        </DrawerPane>
      </div>
    );
  },
});
