import { Commit, createStore } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from '@/store/types'
import { currentUser } from '@/store/testData'
import { axios, AxiosRequestConfig } from '@/libs/http'
import { StorageHandler, storageType } from '@/libs/storage'
import { arrToObj, objToArr } from '@/libs/helper'

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
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: currentUser,
    token: storageHandler.getItem(storageType, 'token') || ''
  },
  getters: {
    getColumns: (state) => () => {
      return objToArr(state.columns.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, err: GlobalErrorProps) {
      state.error = err
    },
    fetchColumns (state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = { data: { ...data, ...arrToObj(list) }, currentPage: currentPage * 1, total: count }
    },
    fetchColumn (state, data) {
      state.columns.data[data.data._id] = data.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost (state, data) {
      state.posts.data[data.data._id] = data.data
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
      state.posts.data[newPost._id] = newPost
    },
    updatePost (state, { data }) {
      state.posts.data[data._id] = data
    },
    deletePost (state, { data }) {
      delete state.posts.data[data._id]
    }
  },
  actions: {
    fetchColumns ({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      // if (!state.columns.isLoaded) {
      //   return asyncAndCommit('/api/columns', 'fetchColumns', commit)
      // }
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(`/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      }
    },
    fetchColumn ({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts ({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    fetchPost ({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/api/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
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
    },
    deletePost ({ commit }, id) {
      return asyncAndCommit(`/api/posts/${id}`, 'deletePost', commit, {
        method: 'delete'
      })
    }
  },
  modules: {}
})
