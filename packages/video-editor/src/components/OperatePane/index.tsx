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
import TextShadow from './operates/textShadow';
import TextStroke from './operates/textStroke';
import Animation from './operates/animation';

export default defineComponent({
  setup() {
    const store = elementStore();

    const showDom = () => (
      <>
        <Base></Base>
        <Clip></Clip>
        <Animation></Animation>
      </>
    );

    const typeOperateDom = () => {
      switch (store.activeNode?.type) {
        case MaterialType.audio:
          return (
            <>
              <Video title="音频配置"></Video>
            </>
          );
        case MaterialType.image:
          return showDom();
        case MaterialType.video:
          return (
            <>
              <Video></Video>
              {showDom()}
            </>
          );
        case MaterialType.text:
          return (
            <>
              {showDom()}
              <Text></Text>
              <TextShadow></TextShadow>
              <TextStroke></TextStroke>
            </>
          );
        default:
          return <></>;
      }
    };

    return () => (
      <div class={styles.wrap}>
        {store.activeNode ? (
          <>
            <Time></Time>
            {typeOperateDom()}
            <Button onClick={store.removeActive}>删除节点</Button>
          </>
        ) : (
          <Global></Global>
        )}
      </div>
    );
  },
});
