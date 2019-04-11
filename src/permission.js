/*
 * @Page: 权限控制
 * @Author: csg
 * @Date: 2018-11
 * @Last Modified by: csg
 */
import router from './router'
import store from './store'
// import jwt from 'jwt-simple'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
// import { digui, diguiName } from '@/utils/digui'
// 权限判断函数
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }
/**
 * 权限控制user.json模拟  leader > micro > manager > supplier
 */
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // sessionStorage.setItem('FieldBool', true)
  if (getToken()) {
    // router.addRoutes(store.getters.addRouters)
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(() => {
            // 拉取用户信息
            const roles = store.getters.roles
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 拉取user_info
              // const limit = ['01', '02', '03', '04']
              // const pagesigns = []
              // const pageCollects = []
              // roles.forEach(element => {
              //   // debugger
              //   if (element.length === 2 && (limit.indexOf(element) === -1)) {
              //     let pages = ''
              //     store.getters.addRouters.some((item) => {
              //       if (item.meta.roles.indexOf(element) !== -1) {
              //         pages = item.name ? item.name : item.children[0].name
              //         return true
              //       }
              //     })
              //     pagesigns.push(pages)
              //     pageCollects.push([])
              //   }
              // })
              // pagesigns.push('Dashboard', 'Mynews')
              // pageCollects.push([], [])
              // sessionStorage.setItem('pagesign', JSON.stringify(pagesigns))
              // localStorage.setItem('pageCollect', JSON.stringify(pageCollects))
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              router.options.routes = store.getters.permission_routers
              // console.log(store.getters.permission_routers, roles)
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
            // // next()
          })
          .catch(() => {
            store.dispatch('FedLogOut').then(() => {
              // Message.error('验证失败，请重新登录')
              next({ path: '/' })
            })
          })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //   // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   //   next()
        //   // } else {
        //   //   next({
        //   //     path: '/404',
        //   //     replace: true,
        //   //     query: { noGoBack: true }
        //   //   })
        //   // }
      }
    }
  } else {
    const decodeURL = decodeURIComponent(window.location.href)
    // console.log(to.path, 'to.path', decodeURL)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else if (to.path === '/dashboard' && /\?msid=/.test(decodeURL)) {
      const userInfoss = [{
        msid: decodeURL.split('msid=')[1]
      }, 'sso']
      store
        .dispatch('Login', userInfoss)
        .then(() => {
          next(`/dashboard`)
        })
        .catch(() => {
          // Message.error('登录失败')
        })
      // next(`/dashboard`)
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  // store.getters.roles.forEach(item => {
  //   // 采购经理模块 路由权限
  //   if (item === 'manager') {
  //     store.dispatch('GetRole', false)
  //   } else {
  //     store.dispatch('GetRole', true)
  //     if (to.path === '/reqlist') {
  //       next({
  //         path: '/reqlist/resolve'
  //       })
  //     }
  //   }
  //   // micro 模板模块 路由权限
  //   if (item === 'micro') {
  //     router.options.routes[7].children[0].meta.icon = 'template'
  //   }
  // })
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
