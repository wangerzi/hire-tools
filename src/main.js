import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { router } from './routes/index'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
