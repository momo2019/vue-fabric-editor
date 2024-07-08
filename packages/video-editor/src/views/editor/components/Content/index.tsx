import { defineComponent } from 'vue';
import styles from './index.module.scss';
import TimeLine from '@/components/TimeLine';
import EditorView from '@/components/EditorView';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_top}>
          <div class={styles.wrap_view}>
            <EditorView></EditorView>
          </div>
          <div class={styles.wrap_editor}>元素编辑</div>
        </div>
        <div class={styles.wrap_bottom}>
          <TimeLine></TimeLine>
        </div>
      </div>
    );
  },
});
