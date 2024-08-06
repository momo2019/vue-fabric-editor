import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { elementStore } from '@/store/element';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const store = elementStore();

    return () => (
      <div
        class={styles.wrap}
        style={{
          width: `${store.global.zoom * store.global.width}px`,
        }}
      >
        <div class={styles.wrap_play}>
          {store.isPreviewing ? (
            <PauseCircleOutlined onClick={store.stopPreview}></PauseCircleOutlined>
          ) : (
            <PlayCircleOutlined onClick={store.previewVideo}></PlayCircleOutlined>
          )}
        </div>
      </div>
    );
  },
});
