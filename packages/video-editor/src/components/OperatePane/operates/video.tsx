import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { Slider, Switch } from 'ant-design-vue';
import { elementStore } from '@/store/element';
import LabelWrap from '../LabelWrap';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '视频配置',
    },
  },
  setup(props) {
    const store = elementStore();
    return () => (
      <div class={styles.pane}>
        <div class={styles.pane_title}>{props.title}</div>
        <LabelWrap label="是否循环">
          <Switch
            checked={store.activeNodeShowValue!.isLoop}
            onChange={(value) => store.setLoop(value as boolean)}
          ></Switch>
        </LabelWrap>
        <LabelWrap label="设置音量">
          <Slider
            value={store.activeNodeShowValue!.vol}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => store.setVol(value as number)}
          ></Slider>
        </LabelWrap>
        <LabelWrap label="声音淡入">
          <Slider
            value={store.activeNodeShowValue!.fadeIn}
            min={0}
            max={2}
            step={0.1}
            onChange={(value) => store.setFadeIn(value as number)}
          ></Slider>
        </LabelWrap>
        <LabelWrap label="声音淡出">
          <Slider
            value={store.activeNodeShowValue!.fadeOut}
            min={0}
            max={2}
            step={0.1}
            onChange={(value) => store.setFadeOut(value as number)}
          ></Slider>
        </LabelWrap>
      </div>
    );
  },
});
