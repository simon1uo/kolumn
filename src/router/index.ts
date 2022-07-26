import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue')
  },
  {
    path: '/column/:id',
    name: 'column',
    component: () => import('@/views/ColumnDetailView.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('@/views/PostDetailView.vue')
  },
  {
    path: '/*',
    name: '404View',
    component: () => import('@/views/404View.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
