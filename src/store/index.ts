import { createStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'
import { currentUser } from '@/store/testData'
import { axios } from '@/libs/http'

export default createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: currentUser
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  mutations: {
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, data) {
      console.log(data.data.list)
      state.columns = data.data.list
    },
    fetchColumn (state, data) {
      console.log(data.data)
      state.columns = [data.data]
    },
    fetchPosts (state, data) {
      console.log(data.data.list)
      state.posts = data.data.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/api/columns').then(res => {
        context.commit('fetchColumns', res.data)
      })
    },
    fetchColumn ({ commit }, cid) {
      axios.get(`/api/columns/${cid}`).then(res => {
        commit('fetchColumn', res.data)
      })
    },
    fetchPosts ({ commit }, cid) {
      axios.get(`/api/columns/${cid}/posts`).then(res => {
        commit('fetchPosts', res.data)
      })
    }
  },
  modules: {}
})
