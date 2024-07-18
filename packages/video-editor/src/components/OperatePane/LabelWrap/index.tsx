import { defineComponent, toRefs } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const { label } = toRefs(props);
    return () => (
      <div class={styles.pane_item}>
        <span class={styles.pane_item_label}>{label.value}</span>
        <div class={styles.pane_item_content}>{slots.default?.()}</div>
      </div>
    );
  },
});
