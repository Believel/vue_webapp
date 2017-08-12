import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
// 路由器需要一个根组件,参数是一个选项对象，包括数据、模板、挂载元素、方法、生命周期等
let app = Vue.extend(App);

// 创建一个路由实例
var router = new VueRouter({
  // 路由配置项：当路由选中之后添加v-link-active类，但是也可以自己手动配置其他名字
  linkActiveClass: 'active'
});

router.map({
  '/goods': {
     component: goods
  },
  '/ratings': {
     component: ratings
  },
  '/seller': {
    component: seller
  }
});

router.start(app, '#app');
// router.go('/goods');
