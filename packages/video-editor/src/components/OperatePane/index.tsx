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
import Clip from './operates/clip';
import { MaterialType } from '@/interfaces/material';
import Video from './operates/video';
import Text from './operates/text';

export default defineComponent({
  setup() {
    const store = elementStore();

    const typeOperateDom = () => {
      switch (store.activeNode?.type) {
        case MaterialType.video:
          return <Video></Video>;
        case MaterialType.text:
          return <Text></Text>;
        default:
          return <></>;
      }
    };

    return () => (
      <div class={styles.wrap}>
        {store.activeNode ? (
          <>
            <Time></Time>
            <Base></Base>
            {typeOperateDom()}
            <Clip></Clip>
            <Button onClick={store.removeActive}>删除节点</Button>
          </>
        ) : (
          <Global></Global>
        )}
      </div>
    );
  },
});
