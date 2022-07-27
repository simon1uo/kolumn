import { createStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'
import { currentUser, testColumns, testPosts } from '@/store/testData'

export default createStore<GlobalDataProps>({
  state: {
    columns: testColumns,
    posts: testPosts,
    user: currentUser
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Simon' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  actions: {},
  modules: {}
})
