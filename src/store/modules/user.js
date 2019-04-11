import { login, logins, singleLogin, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { digui, diguiName } from '@/utils/digui'
import jwt from 'jwt-simple'
// import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(), // 用户token（海尔员工是ticket，供应商是token）
    username: '', // 用户名——username
    usercode: '', // 用户code码——usercode
    usersign: '', // 用户标识——海尔用户是haier，供应商是supplier
    avatar: '', // 角色名——rolename
    avatarCode: '', // 角色code码——rolecode
    roles: [], // 页面权限(存的页面ID)
    rolesName: [], // 页面权限(存的页面名字)
    company: '', // 用户公司——companyname
    loginname: '', // loginname
    name: '', // 页面显示登陆者的名字（海尔员工是姓名，供应商是公司）
    diguiCode: [], // 保存页面的code码
    diguiName: [], // 保存页面的名字
    jstSecret: 'DBS', // 秘钥
    loginCollect: ['01135354', '00556185', '01294454', '01486076', '01444987', '18001569', '01507166'], // 海尔账号登录限制
    supplierCollect: ['V12970'] // 供应商账号登录限制
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_AVATARCODE: (state, avatarCode) => {
      state.avatarCode = avatarCode
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLESNAME: (state, rolesName) => {
      state.rolesName = rolesName
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_LOGINNAME: (state, loginname) => {
      state.loginname = loginname
    },
    SET_USERCODE: (state, usercode) => {
      state.usercode = usercode
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_USERSIGN: (state, usersign) => {
      state.usersign = usersign
    },
    SET_DIGUICODE: (state, diguiCode) => {
      state.diguiCode = diguiCode
    },
    SET_DIGUINAME: (state, diguiName) => {
      state.diguiName = diguiName
    }
  },

  actions: {
    // 登录
    Login({ commit, dispatch, state, getters, rootGetters }, userInfo) {
      return new Promise((resolve, reject) => {
        if (userInfo[1] === 'haier') {
          // if (/dbs.haier.net/.test(window.location.href) && userInfo[0].userName[0] !== 'A' && state.loginCollect.indexOf(userInfo[0].userName) === -1) {
          //   Message.error('抱歉，您没有权限登录系统！')
          //   reject()
          //   return
          // }
          // 加密用户信息
          // console.log('haier')
          const userInfoss = {
            loginInfo: jwt.encode(userInfo[0], state.jstSecret)
          }
          login(userInfoss)
            .then(response => {
              const data = response.resultData
              // console.log('顺利登陆', data.funTree.funcNode)
              location.reload() // 刷新
              if (data.funTree.funcNode.length !== 0) {
                for (const i in data.funTree.funcNode) {
                  digui(state.diguiCode, data.funTree.funcNode[i])
                }
                for (const i in data.funTree.funcNode) {
                  diguiName(state.diguiName, data.funTree.funcNode[i])
                }
              }
              setToken(data.user.ticket) // 存cookie
              sessionStorage.setItem('logincode', jwt.encode(userInfo[0].userName, state.jstSecret))
              sessionStorage.setItem('username', data.user.username)
              sessionStorage.setItem('usercode', data.user.usercode)
              sessionStorage.setItem('rolename', data.user.rolename)
              sessionStorage.setItem('ticket', data.user.ticket)
              sessionStorage.setItem('token', '')
              sessionStorage.setItem('rolecode', data.user.rolecode)
              sessionStorage.setItem('company', data.user.companyname)
              sessionStorage.setItem('loginname', data.user.loginname)
              sessionStorage.setItem('usersign', 'haier')
              sessionStorage.setItem('roles', state.diguiCode.join())
              sessionStorage.setItem('rolesName', state.diguiName.join())
              commit('SET_USERSIGN', 'haier')
              commit('SET_LOGINNAME', data.user.loginname)
              commit('SET_COMPANY', data.user.companyname)
              commit('SET_TOKEN', data.user.ticket)
              commit('SET_NAME', data.user.username)
              commit('SET_USERNAME', data.user.username)
              commit('SET_USERCODE', data.user.usercode)
              commit('SET_AVATAR', data.user.rolename)
              commit('SET_AVATARCODE', data.user.rolecode)
              commit('SET_ROLESNAME', state.diguiName.join())
              if (getters.roles.length === 0) {
                dispatch('GetInfo')
                  .then(() => {
                    // 拉取用户信息
                    const roles = rootGetters.roles
                    dispatch('GenerateRoutes', { roles }, { root: true }).then(() => {
                      // 拉取user_info
                      const limit = ['01', '02', '03', '04']
                      const pagesigns = []
                      const pageCollects = []
                      roles.forEach(element => {
                        if (element.length === 2 && (limit.indexOf(element) === -1)) {
                          let pages = ''
                          rootGetters.addRouters.some((item) => {
                            if (item.meta.roles.indexOf(element) !== -1) {
                              pages = item.name ? item.name : item.children[0].name
                              return true
                            }
                          })
                          pagesigns.push(pages)
                          pageCollects.push([])
                        }
                      })
                      pagesigns.push('Dashboard', 'Mynews', 'Offersheet', 'Listprivate', 'History', 'FinancialInfo', 'Field') // 供应商（报价单填报/历史报价单）
                      pageCollects.push([], [], [], [], [], [])
                      sessionStorage.setItem('pagesign', JSON.stringify(pagesigns))
                      localStorage.setItem('pageCollect', JSON.stringify(pageCollects))
                    })
                  })
              }
              resolve()
            })
            .catch(error => {
              // console.log('登录请求失败了', error)
              reject(error)
            })
        } else if (userInfo[1] === 'supplier') {
          // if (state.supplierCollect.indexOf(userInfo[0].userName) === -1) {
          //   Message.error('抱歉，您没有权限登录系统！')
          //   reject()
          //   return
          // }
          const params = {
            loginName: userInfo[0].userName,
            pwd: userInfo[0].password
          }
          const userInfoss = {
            loginInfo: jwt.encode(params, state.jstSecret)
          }
          logins(userInfoss)
            .then(response => {
              const data = response.resultData
              // console.log('登陆111', response)
              location.reload() // 刷新
              setToken(data.user.token) // 存cookie
              sessionStorage.setItem('logincode', jwt.encode(userInfo[0].userName, state.jstSecret))
              sessionStorage.setItem('username', data.user.username)
              sessionStorage.setItem('usercode', data.user.usercode)
              sessionStorage.setItem('rolename', data.user.rolename)
              sessionStorage.setItem('token', data.user.token)
              sessionStorage.setItem('ticket', '')
              sessionStorage.setItem('rolecode', data.user.rolecode)
              sessionStorage.setItem('company', data.user.companyname)
              sessionStorage.setItem('loginname', data.user.loginname)
              sessionStorage.setItem('usersign', 'supplier')
              commit('SET_USERSIGN', 'supplier')
              commit('SET_LOGINNAME', data.user.loginname)
              commit('SET_COMPANY', data.user.companyname)
              commit('SET_TOKEN', data.user.token)
              // if (data.user.companyname === '') {
              //   commit('SET_NAME', '未知')
              // } else {
              //   commit('SET_NAME', data.user.companyname)
              // }
              commit('SET_NAME', data.user.username)
              commit('SET_USERNAME', data.user.username)
              commit('SET_USERCODE', data.user.usercode)
              commit('SET_AVATAR', data.user.rolename)
              commit('SET_AVATARCODE', data.user.rolecode)
              sessionStorage.setItem('roles', 'supplier')
              if (getters.roles.length === 0) {
                dispatch('GetInfo', {}, { root: true })
                  .then(() => {
                    // 拉取用户信息
                    const roles = rootGetters.roles
                    dispatch('GenerateRoutes', { roles }, { root: true }).then(() => {
                      // 拉取user_info
                      const limit = ['01', '02', '03', '04']
                      const pagesigns = []
                      const pageCollects = []
                      roles.forEach(element => {
                        if (element.length === 2 && (limit.indexOf(element) === -1)) {
                          let pages = ''
                          rootGetters.addRouters.some((item) => {
                            if (item.meta.roles.indexOf(element) !== -1) {
                              pages = item.name ? item.name : item.children[0].name
                              return true
                            }
                          })
                          pagesigns.push(pages)
                          pageCollects.push([])
                        }
                      })
                      pagesigns.push('Dashboard', 'Mynews', 'Offersheet', 'Listprivate', 'History') // 供应商（报价单填报/历史报价单）
                      pageCollects.push([], [], [], [], [])
                      sessionStorage.setItem('pagesign', JSON.stringify(pagesigns))
                      localStorage.setItem('pageCollect', JSON.stringify(pageCollects))
                    })
                  })
              }
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        } else {
          // 单点登录
          singleLogin(userInfo[0])
            .then(response => {
              const data = response.resultData
              if (data.funTree) {
                if (data.funTree.funcNode.length !== 0) {
                  for (const i in data.funTree.funcNode) {
                    digui(state.diguiCode, data.funTree.funcNode[i])
                  }
                  for (const i in data.funTree.funcNode) {
                    diguiName(state.diguiName, data.funTree.funcNode[i])
                  }
                }
                setToken(data.user.ticket) // 存cookie
                sessionStorage.setItem('ticket', data.user.ticket)
                sessionStorage.setItem('token', '')
                sessionStorage.setItem('usersign', 'haier')
                sessionStorage.setItem('roles', state.diguiCode.join())
                sessionStorage.setItem('rolesName', state.diguiName.join())
                commit('SET_USERSIGN', 'haier')
                commit('SET_TOKEN', data.user.ticket)
                commit('SET_ROLESNAME', state.diguiName.join())
              } else {
                setToken(data.user.token)
                sessionStorage.setItem('token', data.user.token)
                sessionStorage.setItem('ticket', '')
                sessionStorage.setItem('usersign', 'supplier')
                sessionStorage.setItem('roles', 'supplier')
                commit('SET_USERSIGN', 'supplier')
                commit('SET_TOKEN', data.user.token)
              }
              // sessionStorage.setItem('logincode', jwt.encode(data.user.userid, state.jstSecret))
              sessionStorage.setItem('username', data.user.username)
              sessionStorage.setItem('company', data.user.companyname)
              console.log(data, '拿到了')
              commit('SET_COMPANY', data.user.companyname)
              commit('SET_NAME', data.user.username)
              commit('SET_USERNAME', data.user.username)
              resolve()
            })
            .catch(error => {
              // console.log('单点登录失败', error)
              reject(error)
            })
        }
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (sessionStorage.getItem('roles') === '') {
          reject()
        }
        const str = sessionStorage.getItem('roles')
        commit('SET_AVATAR', sessionStorage.getItem('rolename'))
        commit('SET_AVATARCODE', sessionStorage.getItem('rolecode'))
        commit('SET_COMPANY', sessionStorage.getItem('company'))
        commit('SET_LOGINNAME', sessionStorage.getItem('loginname'))
        commit('SET_USERNAME', sessionStorage.getItem('username'))
        commit('SET_USERCODE', sessionStorage.getItem('usercode'))
        commit('SET_USERSIGN', sessionStorage.getItem('usersign'))
        if (str === 'supplier') {
          commit('SET_ROLES', str.split())
          // if (sessionStorage.getItem('company') === '') {
          //   commit('SET_NAME', '未知')
          // } else {
          //   commit('SET_NAME', sessionStorage.getItem('company'))
          // }
          commit('SET_NAME', sessionStorage.getItem('username'))
        } else {
          commit('SET_ROLES', str.split(','))
          const strs = sessionStorage.getItem('rolesName')
          commit('SET_ROLESNAME', strs.split(','))
          commit('SET_NAME', sessionStorage.getItem('username'))
        }
        resolve()
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_ROLESNAME', [])
            commit('SET_DIGUICODE', [])
            commit('SET_DIGUINAME', [])
            sessionStorage.clear()
            localStorage.clear()
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ROLESNAME', [])
        commit('SET_DIGUICODE', [])
        commit('SET_DIGUINAME', [])
        sessionStorage.clear()
        localStorage.clear()
        removeToken()
        resolve()
      })
    }

    // 动态修改权限
    // ChangeRoles({ commit, dispatch }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
