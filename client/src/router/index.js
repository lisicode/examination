import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "entering" */ '../views/entering.vue')
      },
      {
        path:'/b',
        component: () => import(/* webpackChunkName: "about" */ '../views/b.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
