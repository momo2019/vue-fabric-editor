/**
 * 该组件存在业务关系
 */
import { computed, defineComponent, ref, watch } from 'vue';
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
import DrawerPane from '@/components/DrawerPane';
import Background from './operates/background';

const TITLE_ICONS = {
  base: {
    title: '基础',
  },
  clip: {
    title: '蒙版',
  },
  animation: {
    title: '动画',
  },
  media: {
    title: '媒体',
  },
  background: {
    title: '背景',
  },
  text: {
    title: '文本',
  },
  textShadow: {
    title: '阴影',
  },
  textStroke: {
    title: '描边',
  },
};

type TYPES = keyof typeof TITLE_ICONS;

const WIDTH = 200;

export default defineComponent({
  setup() {
    const store = elementStore();

    const active = ref<TYPES | ''>('');
    const isOpen = ref(false);
    const changeOpen = (open: boolean) => {
      isOpen.value = open;
      confirmActiveMenu();
    };
    const setActiveMenu = (item: TYPES) => {
      if (active.value === item && isOpen.value) {
        isOpen.value = false;
        return;
      }
      active.value = item;
      isOpen.value = true;
    };

    const baseDom = () => {
      if (store.activeNode) {
        return (
          <>
            <Time></Time>
            {store.activeNode.type === MaterialType.audio ? <></> : <Base></Base>}
            <div class={styles.operate_button}>
              <Button danger type="primary" style={{ width: '100%' }} onClick={store.removeActive}>
                删除节点
              </Button>
            </div>
          </>
        );
      } else {
        return <Global></Global>;
      }
    };

    const typeOperateDom = () => {
      switch (active.value) {
        case 'base':
          return baseDom();
        case 'background':
          return <Background></Background>;
        case 'clip':
          return <Clip></Clip>;
        case 'animation':
          return <Animation></Animation>;
        case 'media':
          return <Video></Video>;
        case 'text':
          return <Text></Text>;
        case 'textShadow':
          return <TextShadow></TextShadow>;
        case 'textStroke':
          return <TextStroke></TextStroke>;
        default:
          return <></>;
      }
    };

    const operateList = computed<TYPES[]>(() => {
      if (store.activeNode) {
        switch (store.activeNode.type) {
          case MaterialType.audio:
            return ['base', 'media'];
          case MaterialType.image:
            return ['base', 'clip', 'animation'];
          case MaterialType.video:
            return ['base', 'clip', 'animation', 'media'];
          case MaterialType.text:
            return ['base', 'clip', 'animation', 'text', 'textShadow', 'textStroke'];
          default:
            return [];
        }
      } else {
        return ['base', 'background'];
      }
    });

    watch(
      () => store.activeNode?.type,
      () => {
        confirmActiveMenu();
      }
    );

    const confirmActiveMenu = () => {
      if (isOpen.value) {
        if (!operateList.value.find((item) => item === active.value)) {
          active.value = operateList.value[0];
        }
      }
    };

    return () => (
      <div class={styles.wrap}>
        <DrawerPane open={isOpen.value} size={WIDTH} buttonPosition="left" onChange={changeOpen}>
          <div class={styles.wrap_content} style={{ width: `${WIDTH}px` }}>
            {typeOperateDom()}
          </div>
        </DrawerPane>
        <div class={['video_menu', styles.wrap_menu]}>
          {operateList.value.map((item) => (
            <div
              class={[
                'video_menu_item',
                isOpen.value && item === active.value && 'video_mi_active',
              ]}
              onClick={() => setActiveMenu(item)}
            >
              {TITLE_ICONS[item].title}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
