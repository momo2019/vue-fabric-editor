import { defineComponent } from 'vue';
import Editor from './views/editor';
import './static/styles/index.scss';
import { ConfigProvider, theme } from 'ant-design-vue';

export default defineComponent({
  setup() {
    return () => (
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgBase: '#1c1c26',
            colorPrimary: '#892fff',
            colorBgContainer: '#1c1c26',
            colorBgSpotlight: '#272836',
          },
        }}
      >
        <Editor />
      </ConfigProvider>
    );
  },
});
