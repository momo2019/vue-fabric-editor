/**
 * 该组件存在业务关系
 */
import { defineComponent } from 'vue';
import styles from './index.module.scss';
import Time from './operates/time';
import { elementStore } from '@/store/element';
import Base from './operates/base';
import Global from './operates/global';
import { Button } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const store = elementStore();
    return () => (
      <div class={styles.wrap}>
        {store.activeNode ? (
          <>
            <Time></Time>
            <Base></Base>
            <Button onClick={store.removeActive}>删除节点</Button>
          </>
        ) : (
          <Global></Global>
        )}
      </div>
    );
  },
});
