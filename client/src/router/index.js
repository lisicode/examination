import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import examiner from '../views/examiner.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/examiner',
    name: 'examiner',
    component: examiner,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "entering" */ '../components/entering.vue')
      },
      {
        path:'/list',
        component: () => import(/* webpackChunkName: "list" */ '../components/list.vue')
      },
      {
        path:'/statistics',
        component: () => import(/* webpackChunkName: "statistics" */ '../components/statistics.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router
