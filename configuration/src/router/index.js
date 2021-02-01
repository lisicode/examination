import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "s1" */ '../components/login/s1.vue')
      },
      {
        path:'/s2',
        component: () => import(/* webpackChunkName: "s2" */ '../components/login/s2.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "t1" */ '../components/home/t1.vue')
      },
      {
        path:'/t2',
        component: () => import(/* webpackChunkName: "t2" */ '../components/home/t2.vue')
      },
      {
        path:'/t3',
        component: () => import(/* webpackChunkName: "t3" */ '../components/home/t3.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router
