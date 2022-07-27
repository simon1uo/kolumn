import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(res => {
  store.commit('setLoading', false)
  return res
}, err => {
  const { error } = err.response.data
})
export { axios }
