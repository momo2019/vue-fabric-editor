import { defineComponent, nextTick, PropType, ref, toRefs, watch } from 'vue';
import styles from './index.module.scss';
import { Button } from 'ant-design-vue';
import { ElementItem } from '@/interfaces/element';
import { elementNodeDom } from './ElementNode';
import { formatDuration } from '@/utils/format';
import { cvsHeight, timeLineCanvas } from './utils/timeLineCanvas';

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<ElementItem[]>,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  emits: {
    delOne: (uuid: string) => uuid,
  },
  setup(props) {
    const { data, duration } = toRefs(props);

    const curTime = ref(0);

    const cvsRef = ref();

    watch(
      () => duration.value,
      async () => {
        await nextTick();
        cvsRef.value &&
          timeLineCanvas({
            cvs: cvsRef.value,
            duration: duration.value,
          });
      },
      {
        immediate: true,
      }
    );

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_editor}>
          <div class={styles.wrap_editor_left}>
            <div>
              {formatDuration(curTime.value)}/{formatDuration(duration.value)}
            </div>
          </div>
          <div class={styles.wrap_editor_right}>
            <Button type="primary">预览视频</Button>
          </div>
        </div>
        <div class={styles.time_box}>
          <div class={styles.time_box_wrap}>
            <div
              class={styles.wrap_time}
              style={{
                height: `${cvsHeight}px`,
              }}
            >
              <canvas ref={cvsRef}></canvas>
            </div>
            <div class={styles.wrap_content}>{data.value.map(elementNodeDom)}</div>
          </div>
        </div>
      </div>
    );
  },
});
