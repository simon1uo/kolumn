import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(res => {
  return res
}, err => {
  const { error } = err.response.data
})
export { axios }
