import { Commit, createStore } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from '@/store/types'
import { currentUser } from '@/store/testData'
import { axios, AxiosRequestConfig } from '@/libs/http'
import { StorageHandler, storageType } from '@/libs/storage'

const storageHandler = new StorageHandler()

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
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
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.find(p => p._id === id)
    }
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, err: GlobalErrorProps) {
      state.error = err
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
    fetchPost (state, data) {
      state.posts = [data.data]
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
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    updatePost (state, { data }) {
      state.posts = state.posts.map(post => {
        if (post._id === data._id) {
          return data
        } else {
          return post
        }
      })
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return asyncAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return asyncAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return asyncAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchPost ({ commit }, id) {
      return asyncAndCommit(`/api/posts/${id}`, 'fetchPost', commit)
    },
    login ({ commit }, payload) {
      return asyncAndCommit('/api/user/login', 'login', commit, { method: 'post', data: payload })
    },
    fetchCurrentUser ({ commit }) {
      return asyncAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    signup ({ commit }, payload) {
      return asyncAndCommit('/api/users', 'signup', commit, { method: 'post', data: payload })
    },
    createPost ({ commit }, payload) {
      return asyncAndCommit('/api/posts', 'createPost', commit, { method: 'post', data: payload })
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/api/posts/${id}`, 'updatePost', commit, {
        method: 'PATCH',
        data: payload
      })
    }
  },
  modules: {}
})
