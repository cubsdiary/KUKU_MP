import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';

import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import 'videojs-flash';
import 'videojs-contrib-hls/dist/videojs-contrib-hls';

Vue.use(VueResource);
Vue.use(ElementUI);

Vue.use(VueVideoPlayer);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
