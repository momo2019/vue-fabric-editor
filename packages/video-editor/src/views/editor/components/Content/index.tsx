import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import TimeLine from '@/components/TimeLine';
import EditorView from '@/components/EditorView';
import DrawerPane from '@/components/DrawerPane';

export default defineComponent({
  setup() {
    const isOpen = ref(true);
    const changeOpen = (open: boolean) => {
      isOpen.value = open;
    };

    return () => (
      <div class={styles.wrap}>
        <div class={styles.wrap_top}>
          <div class={styles.wrap_view}>
            <EditorView></EditorView>
          </div>
        </div>
        <DrawerPane
          open={isOpen.value}
          size={260}
          closeSize={50}
          dir="vertical"
          buttonPosition="top"
          onChange={changeOpen}
        >
          <div class={styles.wrap_bottom}>
            <TimeLine isOpen={isOpen.value}></TimeLine>
          </div>
        </DrawerPane>
      </div>
    );
  },
});
