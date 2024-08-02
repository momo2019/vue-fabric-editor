import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { elementStore } from '@/store/element';
import { isEqual } from '@/utils/compute';

type TwoNumber = [number, number];

export default defineComponent({
  setup() {
    const isOpen = ref(false);

    const closeOpen = () => {
      isOpen.value = false;
    };

    const toggle = (e: MouseEvent) => {
      isOpen.value = !isOpen.value;
      e.stopPropagation();
    };

    onMounted(() => {
      document.addEventListener('click', closeOpen);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeOpen);
    });

    const store = elementStore();

    const resolutionList: {
      value: TwoNumber;
      label: string;
    }[] = [
      {
        value: [1920, 1080],
        label: '16:9',
      },
      {
        value: [1080, 1080],
        label: '1:1',
      },
      {
        value: [1080, 1920],
        label: '9:16',
      },
    ];

    const activeResolute = computed(() => {
      const resolute = store.global.width / store.global.height;
      const index = resolutionList.findIndex((item) => {
        const reso = item.value[0] / item.value[1];
        return isEqual(reso, resolute);
      });
      return resolutionList[index];
    });

    const scaleMap = {
      '1080': 27,
      '1920': 48,
    };

    const getHeightWidth = (value: TwoNumber) => {
      return {
        height: `${scaleMap[value[1]]}px`,
        width: `${scaleMap[value[0]]}px`,
      };
    };

    const changeResolution = (value: TwoNumber) => {
      store.setGlobalWidhtAndHeight(value[0], value[1]);
    };

    return () => (
      <div class={styles.setter}>
        <div
          class={[styles.setter_item, isOpen.value && styles.setter_item_open]}
          style={activeResolute.value && getHeightWidth(activeResolute.value.value)}
          onClick={toggle}
        >
          {activeResolute.value?.label}
        </div>
        <div class={[styles.setter_box, isOpen.value && styles.setter_box_open]}>
          {resolutionList
            .filter((item) => item !== activeResolute.value)
            .map((item) => (
              <div
                class={styles.setter_item}
                style={getHeightWidth(item.value)}
                onClick={() => changeResolution(item.value)}
              >
                {item.label}
              </div>
            ))}
        </div>
      </div>
    );
  },
});
