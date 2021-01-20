import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "entering" */ '../views/entering.vue')
      },
      {
        path:'/b',
        component: () => import(/* webpackChunkName: "b" */ '../views/b.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
