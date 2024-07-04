import { defineComponent } from 'vue';
import Editor from './views/editor';

export default defineComponent({
  setup() {
    return () => <Editor />;
  },
});
