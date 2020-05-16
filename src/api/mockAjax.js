import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) 
/* 1. 配置通用的基础路径和超时 */
const instance = axios.create({
  baseURL: '/mock',
  timeout: 15000, 
})
instance.interceptors.request.use(config => {
  /* 2. 显示请求进度条 */
  NProgress.start()
  return config
})
instance.interceptors.response.use(
  response => {
    NProgress.done()
    /*  3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
    return response.data
  },
  error => {
    /* 2.2. 请求成功结束 隐藏进度条 */
    NProgress.done()
    /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
    alert(`请求出错: ${error.message || '未知错误'}`)
    return Promise.reject(error)
  }
)
export default instance