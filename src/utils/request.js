import axios from 'axios'
import notification from 'ant-design-vue/es/notification'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  // baseURL: '/', // api base_url
  timeout: 60000 // 请求超时时间
})

/**
 * axios 全局错误状态码处理
 * @param error
 * @returns {Promise<never>}
 */
const err = error => {
  if (error.response) {
    const data = error.response.data
    switch (error.response.status) {
      case 403:
        notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
        break
      case 500:
        notification.error({ message: '系统提示', description: '服务器异常', duration: 4 })
        break
      case 404:
        notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
        break
      case 504:
        notification.error({ message: '系统提示', description: '网络超时' })
        break
      case 401:
        notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
        break
      case 700:
        notification.error({ message: '系统提示', description: error.response.data.error, duration: 4 })
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
}

/**
 * axios 配置全局请求参数
 */
service.interceptors.request.use(config => {
  return config
}, err)

/**
 * axios 配置全局响应参数
 */
service.interceptors.response.use(response => {
  return response.data
}, err)

export { service as axios }
