import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
import { axios } from '@/libs/http'

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
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({ name: 'login' })
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
  //   next({ name: 'home' })
  // } else {
  //   next()
  // }

  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorizaiton = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(err => {
        console.log(err)
        store.commit('logout')
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

router.afterEach((to, from, failure) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
})

export default router
