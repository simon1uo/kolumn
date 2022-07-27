import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue'),
    meta: {
      redirectAlreadyLogin: true
    }
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
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreatePostView.vue'),
    meta: {
      requiredLogin: true
    }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
