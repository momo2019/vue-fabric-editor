import { defineComponent } from 'vue';
import Editor from './views/editor';
import './static/styles/index.scss';

export default defineComponent({
  setup() {
    return () => <Editor />;
  },
});
