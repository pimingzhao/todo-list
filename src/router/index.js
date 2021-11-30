import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    redirect: '/todo',
    children: [
      {
        path: 'todo',
        name: 'todo',
        component: () => import('@/views/Todo')
      },
      {
        path: 'todolist',
        name: 'todolist',
        component: () => import('@/views/TodoList')
      }
    ]
  },
  {
    path: '/uname',
    name: '/uname',
    component: () => import('@/views/Uname')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
