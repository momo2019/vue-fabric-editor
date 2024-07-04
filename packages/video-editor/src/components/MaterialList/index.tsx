import { defineComponent, PropType } from 'vue';
import styles from './index.module.scss';
import { MaterialGroup } from '@/interfaces/material';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<MaterialGroup>,
      required: true,
    },
  },
  emits: {
    add: (url: string) => url,
  },
  setup() {
    return () => <div class={styles.wrap}></div>;
  },
});
