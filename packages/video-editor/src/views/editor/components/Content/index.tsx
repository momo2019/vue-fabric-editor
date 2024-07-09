import { defineComponent } from 'vue';
import styles from './index.module.scss';
import TimeLine from '@/components/TimeLine';
import EditorView from '@/components/EditorView';
import OperatePane from '@/components/OperatePane';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_top}>
          <div class={styles.wrap_view}>
            <EditorView></EditorView>
          </div>
          <div class={styles.wrap_editor}>
            <OperatePane></OperatePane>
          </div>
        </div>
        <div class={styles.wrap_bottom}>
          <TimeLine></TimeLine>
        </div>
      </div>
    );
  },
});
