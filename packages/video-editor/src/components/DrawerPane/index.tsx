import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  props: {
    dir: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    buttonPosition: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left',
    },
    open: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      required: true,
    },
    closeSize: {
      type: Number,
      default: 0,
    },
  },
  emits: {
    change: (isOpen: boolean) => isOpen,
  },
  setup(props, { slots, emit }) {
    const { dir, buttonPosition, size } = props;
    const { open, closeSize } = toRefs(props);

    const isOpen = ref(open.value);

    const toggle = (status?: boolean) => {
      isOpen.value = status ?? !isOpen.value;
      emit('change', isOpen.value);
    };

    watch(
      () => open.value,
      () => {
        toggle(open.value);
      }
    );

    const drawerStyle = computed(() => {
      if (dir === 'horizontal') {
        return {
          width: isOpen.value ? `${size}px` : `${closeSize.value}px`,
        };
      } else {
        return {
          height: isOpen.value ? `${size}px` : `${closeSize.value}px`,
        };
      }
    });

    return () => (
      <div class={styles.drawer} style={drawerStyle.value}>
        <div class={styles.drawer_content}>{slots.default?.()}</div>
        <div
          class={[styles.drawer_button, styles[`drawer_button_${buttonPosition}`]]}
          onClick={() => toggle()}
        >
          <div class={[styles.drawer_button_icon, !isOpen.value && styles.drawer_bi_close]}>
            {'>'}
          </div>
        </div>
      </div>
    );
  },
});
