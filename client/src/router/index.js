import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import teacher from '../views/teacher.vue'
import student from '../views/student.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: teacher,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "t1" */ '../components/teacher/t1.vue')
      },
      {
        path:'/t2',
        component: () => import(/* webpackChunkName: "t2" */ '../components/teacher/t2.vue')
      },
      {
        path:'/t3',
        component: () => import(/* webpackChunkName: "t3" */ '../components/teacher/t3.vue')
      }
    ]
  },
  {
    path: '/student',
    name: 'student',
    component: student,
    children:[
      {
        path:'',
        component: () => import(/* webpackChunkName: "s1" */ '../components/student/s1.vue')
      },
      {
        path:'/s2',
        component: () => import(/* webpackChunkName: "s2" */ '../components/student/s2.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router
