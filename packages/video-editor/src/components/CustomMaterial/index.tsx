import styles from './index.module.scss';
import { defineComponent, ref } from 'vue';

export enum CustomType {
  text = 'text',
}

type GroupItem = {
  label: string;
  list: {
    label: string;
    type: CustomType;
  }[];
};

export default defineComponent({
  emits: {
    add: (item: CustomType) => item,
  },
  setup(_, { emit }) {
    const customGroup = ref<GroupItem[]>([
      {
        label: '文本',
        list: [
          {
            label: '文字',
            type: CustomType.text,
          },
        ],
      },
    ]);

    const groupDom = (group: GroupItem) => (
      <div class={styles.group}>
        <div class={styles.group_title}>{group.label}</div>
        <div class={styles.group_box}>
          {group.list.map((item) => (
            <div class={styles.item} onClick={() => emit('add', item.type)}>
              <div class={styles.item_label}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );

    return () => <div class={styles.wrap}>{customGroup.value.map(groupDom)}</div>;
  },
});
