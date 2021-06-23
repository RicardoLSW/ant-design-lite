import router from './router'
import { setDocumentTitle, domTitle } from './utils/domUtil'
import store from './store'
import * as dd from 'dingtalk-jsapi'
import ddConfig from './config/dd.config'
import { message } from 'ant-design-vue'

router.beforeEach((to, from, next) => {
  to.meta &&
    typeof to.meta.title !== 'undefined' &&
    setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  if (process.env.NODE_ENV === 'production') {
    dd.ready(() => {
      dd.runtime.permission.requestAuthCode({
        corpId: ddConfig.corpId, // 企业id
        onSuccess: info => {
          if (store.getters.roles.length === 0) {
            store.dispatch('getUserInfo', info.code).then(res => {
              const roles = res.result && res.result.role
              store.dispatch('GenerateRoutes', { roles }).then(() => {
                console.log(store.getters.addRouters)
                router.addRoutes(store.getters.addRouters)
                next()
              })
            })
          } else {
            next()
          }
        },
        onFail: err => message.error(err)
      })
    })
  } else if (process.env.NODE_ENV === 'development') {
    if (store.getters.roles.length === 0) {
      store.dispatch('getUserInfo', 'u2983').then(res => {
        const roles = res.result && res.result.role
        store.dispatch('GenerateRoutes', { roles }).then(() => {
          console.log(store.getters.addRouters)
          router.addRoutes(store.getters.addRouters)
          next()
        })
      })
    } else {
      next()
    }
  }
})
