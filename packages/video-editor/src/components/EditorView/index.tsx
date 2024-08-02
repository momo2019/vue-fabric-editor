/**
 * 该组件存在业务关系
 */
import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { elementStore } from '@/store/element';
import ResolutionSetter from '../ResolutionSetter';

export default defineComponent({
  setup() {
    const store = elementStore();
    const cvsRef = ref<HTMLCanvasElement>();

    onMounted(() => {
      cvsRef.value && store.initEditor(cvsRef.value);
    });

    return () => (
      <div id="workspace" class={styles.wrap}>
        <canvas ref={cvsRef}></canvas>
        <ResolutionSetter></ResolutionSetter>
      </div>
    );
  },
});
