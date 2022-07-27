import { Commit, createStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'
import { currentUser } from '@/store/testData'
import { axios } from '@/libs/http'

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

export default createStore<GlobalDataProps>({
  state: {
    loading: false,
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
    setLoading (state, status) {
      state.loading = status
    },
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
    fetchColumns ({ commit }) {
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  },
  modules: {}
})
