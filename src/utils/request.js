import store from '@/store'
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 拦截器

// 请求拦截
// 每次请求都会执行

// 相应拦截
// 每一个请求相应回来时，都会执行的函数

request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
