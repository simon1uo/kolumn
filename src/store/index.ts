import { Commit, createStore } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from '@/store/types'
import { currentUser } from '@/store/testData'
import { axios } from '@/libs/http'
import { StorageHandler, storageType } from '@/libs/storage'

const storageHandler = new StorageHandler()

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    loading: false,
    error: { status: false },
    columns: [],
    posts: [],
    user: currentUser,
    token: storageHandler.getItem(storageType, 'token') || ''
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
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, err: GlobalErrorProps) {
      state.error = err
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
      console.log(newPost)
    },
    fetchColumns (state, data) {
      state.columns = data.data.list
    },
    fetchColumn (state, data) {
      state.columns = [data.data]
    },
    fetchPosts (state, data) {
      state.posts = data.data.list
    },
    login (state, data) {
      const { token } = data.data
      state.token = token
      storageHandler.setItem(storageType, 'token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      console.log(state.user)
    },
    fetchCurrentUser (state, data) {
      state.user = { isLogin: true, ...data.data }
    },
    logout (state) {
      state.token = ''
      state.user = { isLogin: false }
      storageHandler.removeItem(storageType, 'token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    signup ({ commit }, payload) {
      return postAndCommit('/api/users', 'signup', commit, payload)
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/api/posts', 'createPost', commit, payload)
    }
  },
  modules: {}
})
