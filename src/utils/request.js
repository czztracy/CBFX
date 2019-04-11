import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import jwt from 'jwt-simple'
// import { login, logins } from '@/api/login'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'
import { api } from './api'
import Router from '@/router/index.js'

// 创建axios实例
const service = axios.create({
  baseURL: api(), // api 的 base_url
  // baseURL: 'http://192.168.43.102:8083/haiercostsupport',
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // console.log(config, '222222222222222222222')
    // cookie不存在时登出
    if (!getToken) {
      Message.error('登录失效，请重新登录')
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      return false
    }
    config.headers['token'] = sessionStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['ticket'] = sessionStorage.getItem('ticket')
    config.headers['overtime'] = encodeURIComponent(sessionStorage.getItem('overtime')) // 转义特殊字符
    // 时间戳添加
    if (config.url.indexOf('?') !== -1) {
      config.url = config.url + '&' + 't=' + Date.parse(new Date())
    } else {
      config.url = config.url + '?' + 't=' + Date.parse(new Date())
    }
    // console.log(config, 123)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // if (response.config.url.indexOf('iscuser/userLoginAuth') !== -1) {
    //   sessionStorage.setItem('overtimess', response.data.resultData.overtime)
    // }
    // //  console.log(response, '超时真的烦')
    if (response.data.resultData && response.data.resultData.overtime) {
      sessionStorage.setItem('overtime', response.data.resultData.overtime)
    }
    // console.log(response.headers)
    if (response.headers.overtime) {
      if (response.headers.overtime === '5006') {
        // MessageBox.confirm(
        //   '你已被登出，可以取消继续留在该页面，或者重新登录',
        //   '确定登出',
        //   {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
        MessageBox.prompt('请输入您的登录密码', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '密码不能为空',
          inputType: 'password',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              const jstSecret = 'DBS'
              const logincode = jwt.decode(sessionStorage.getItem('logincode'), jstSecret)
              const userInfoss = []
              const userInfo = {
                userName: logincode,
                password: instance.inputValue
              }
              if (sessionStorage.getItem('roles') !== 'supplier') {
                userInfoss.push(userInfo, 'haier')
              } else {
                userInfoss.push(userInfo, 'supplier')
              }
              store.dispatch('Login', userInfoss).then(() => {
                done()
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '重新登录'
                Message({
                  type: 'success',
                  message: '重新登录成功'
                })
                location.reload() // 重定向首页
              }).catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '重新登录'
                Message({
                  type: 'error',
                  message: '密码错误'
                })
              })
            } else {
              done()
            }
          }
        }).then(({ value }) => {
          // instance.inputValue = value
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        return false
      } else if (response.headers.overtime === '5008') {
        removeToken()
        location.reload() // 为了重新实例化vue-router对象 避免bug
      } else {
        // console.log(response.headers.overtime, 222)
        sessionStorage.setItem('overtime', response.headers.overtime)
      }
    }
    // store.dispatch('FedLogOut').then(() => {
    //   location.reload() // 为了重新实例化vue-router对象 避免bug
    // })
    const res = response.data
    // console.log(response, '11111111111111111111111111')
    if (!res.success) {
      Message({
        message: res.errorMsg,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 5008 || res.code === 50012 || res.code === 50014) {
        // MessageBox.confirm(
        //   '你已被登出，可以取消继续留在该页面，或者重新登录',
        //   '确定登出',
        //   {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
        MessageBox.prompt('请输入您的登录密码', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '密码不能为空',
          inputType: 'password',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              const jstSecret = 'DBS'
              const logincode = jwt.decode(sessionStorage.getItem('logincode'), jstSecret)
              const userInfoss = []
              const userInfo = {
                userName: logincode,
                password: instance.inputValue
              }
              if (sessionStorage.getItem('roles') !== 'supplier') {
                userInfoss.push(userInfo, 'haier')
              } else {
                userInfoss.push(userInfo, 'supplier')
              }
              store.dispatch('Login', userInfoss).then(() => {
                done()
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '重新登录'
                Message({
                  type: 'success',
                  message: '重新登录成功'
                })
                location.reload() // 重定向首页
              }).catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '重新登录'
                Message({
                  type: 'error',
                  message: '密码错误'
                })
              })
            } else {
              done()
            }
          }
        }).then(({ value }) => {
          // instance.inputValue = value
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
