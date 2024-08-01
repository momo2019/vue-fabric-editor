/**
 * 该组件存在业务关系
 */
import { defineComponent, nextTick, ref, watch } from 'vue';
import styles from './index.module.scss';
import { Button } from 'ant-design-vue';
import { elementNodeDom } from './ElementNode';
import { formatDuration } from '@/utils/format';
import { cvsHeight, timeLineCanvas } from './utils/timeLineCanvas';
import { elementStore } from '@/store/element';
import { useMoveLine } from './utils/useMoveLine';

export default defineComponent({
  setup() {
    const store = elementStore();
    const cvsRef = ref<HTMLCanvasElement>();

    const { startMove, boxRef } = useMoveLine();

    watch(
      () => store.duration,
      async () => {
        await nextTick();
        cvsRef.value &&
          timeLineCanvas({
            cvs: cvsRef.value,
            duration: store.duration,
            gap: store.lineGapTime,
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
            <div class={styles.wrap_el_duration}>
              {formatDuration(store.curTime)}/{formatDuration(store.duration)}
            </div>
          </div>
          <div class={styles.wrap_editor_right}>
            {store.isPreviewing ? (
              <Button type="primary" danger onClick={store.stopPreview}>
                停止预览
              </Button>
            ) : (
              <Button type="primary" onClick={store.previewVideo}>
                预览视频
              </Button>
            )}
          </div>
        </div>
        <div ref={boxRef} class={styles.time_box}>
          <div class={styles.time_box_wrap}>
            <div
              class={styles.wrap_time}
              style={{
                height: `${cvsHeight}px`,
              }}
            >
              <canvas ref={cvsRef}></canvas>
            </div>
            <div class={styles.wrap_content}>
              {store.nodes.map((item) => (
                <div onClick={() => store.setActiveNode(item.uid)}>
                  {elementNodeDom(item, startMove)}
                </div>
              ))}
            </div>
            <div
              class={styles.wrap_pointer}
              style={{
                left: `${store.timeToWidth(store.curTime)}px`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  },
});
