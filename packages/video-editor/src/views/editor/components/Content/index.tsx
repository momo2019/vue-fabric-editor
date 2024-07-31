import { defineComponent } from 'vue';
import styles from './index.module.scss';
import TimeLine from '@/components/TimeLine';
import EditorView from '@/components/EditorView';
import DrawerPane from '@/components/DrawerPane';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_top}>
          <div class={styles.wrap_view}>
            <EditorView></EditorView>
          </div>
        </div>
        <DrawerPane size={260} closeSize={50} dir="vertical" buttonPosition="top">
          <div class={styles.wrap_bottom}>
            <TimeLine></TimeLine>
          </div>
        </DrawerPane>
      </div>
    );
  },
});
