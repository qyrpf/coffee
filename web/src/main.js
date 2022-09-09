import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/scss/index.scss'
import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
import http from './http';

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: "/static/img/loading.gif"
});

Vue.use(Element);
Vue.use(VueInfiniteScroll);

Vue.prototype.$http = http;


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
