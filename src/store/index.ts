import { Commit, createStore } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from '@/store/types'
import { currentUser } from '@/store/testData'
import { axios } from '@/libs/http'
import { StorageHandler, StorageType } from '@/libs/storage'

const storageType = StorageType.Local
const storageHandler = new StorageHandler()

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
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
    },
    fetchCurrentUser (state, data) {
      state.user = { isLogin: true, ...data.data }
    },
    logout (state) {
      state.token = ''
      state.user = { isLogin: false }
      storageHandler.removeItem(StorageType.Local, 'token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
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
    }
  },
  modules: {}
})
