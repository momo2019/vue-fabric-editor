/**
 * 该组件已与业务解藕
 */
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import styles from './index.module.scss';
import { MaterialGroup, MaterialItem } from '@/interfaces/material';
import { Select } from 'ant-design-vue';

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MaterialGroup[]>,
      required: true,
    },
  },
  emits: {
    add: (item: MaterialItem) => item,
  },
  setup(props, { emit }) {
    const { data } = toRefs(props);

    const activeLabel = ref<null | string>(null);
    const activeLabelList = computed(() => {
      if (!activeLabel.value) {
        return [];
      }
      const tempLabel = data.value.find((item) => item.label === activeLabel.value);
      return tempLabel?.list || [];
    });

    const isMore = computed(() => !!activeLabel.value);

    const options = computed(() =>
      data.value.map((group) => ({
        label: group.label,
        value: group.label,
      }))
    );

    const clearActiveLabel = () => {
      activeLabel.value = '';
    };
    watch(
      () => data.value,
      () => {
        clearActiveLabel();
      }
    );

    const addMaterial = (item: MaterialItem) => {
      emit('add', item);
    };

    const materialItemDom = (item: MaterialItem) => (
      <div
        class={styles.material_item}
        style={{
          backgroundImage: `url(${item.cover || item.data})`,
        }}
        onClick={() => addMaterial(item)}
      ></div>
    );

    const materialItemBoxDom = (list: MaterialItem[]) => (
      <div class={styles.material_box}>{list.map(materialItemDom)}</div>
    );

    const changeMore = (group: MaterialGroup) => {
      activeLabel.value = group.label;
    };

    const maxShow = 6;

    const materialGroupDom = (group: MaterialGroup) => (
      <div class={styles.material_group}>
        <div class={styles.material_group_header}>
          <div class={styles.material_group_label}>{group.label}</div>
          {group.list.length > maxShow && (
            <div class={styles.material_group_more} onClick={() => changeMore(group)}>
              查看更多
            </div>
          )}
        </div>
        <div class={styles.material_group_content}>
          {materialItemBoxDom(group.list.slice(0, maxShow))}
        </div>
      </div>
    );

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_top}>
          <Select
            v-model:value={activeLabel.value}
            options={options.value}
            allowClear={true}
            style={{
              width: '100%',
            }}
          ></Select>
        </div>
        <div class={styles.wrap_content}>
          {isMore.value
            ? materialItemBoxDom(activeLabelList.value)
            : data.value.map(materialGroupDom)}
        </div>
      </div>
    );
  },
});
