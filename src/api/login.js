import request from '@/utils/request'
import Qs from 'qs'
import { loginHaier, loginSupplier } from '@/utils/api'

/**
 * @Page：权限管理
 * @ApiDesc：根据用户登陆名获取用户信息 接口负责人张先德
 * @UsingRoles：所有海尔用户
 * @Author: 陈莉莎
 */
export function login(params) {
  return request({
    url: loginHaier() + 'iscuser/userLoginAuth',
    method: 'post',
    data: Qs.stringify(params)
    // data: params
    // params
  })
}

/**
 * @Page：权限管理
 * @ApiDesc：根据用户登陆名获取用户信息 接口负责人张先德
 * @UsingRoles：供应商
 * @Author: 陈莉莎
 */
export function logins(params) {
  return request({
    url: loginSupplier() + 'supplieruser/login',
    method: 'post',
    data: Qs.stringify(params)
    // data: params
    // params
  })
}

/**
 * @Page：权限管理
 * @ApiDesc：单点登录 接口负责人张先德
 * @UsingRoles：所有海尔用户+供应商
 * @Author: 陈莉莎
 */
export function singleLogin(params) {
  return request({
    url: loginHaier() + 'sso/gotoDBS',
    method: 'post',
    data: Qs.stringify(params)
  })
}

/**
 * @Page：权限管理
 * @ApiDesc：根据用户名与密码取得用户
 * @UsingRoles：全部
 * @Author: 陈莉莎
 */
export function getInfo(params) {
  return request({
    url: loginHaier() + 'iscuser/userLoginAuth',
    method: 'post',
    data: Qs.stringify(params)
  })
}

export function logout() {
  return request({
    url: 'static/user/logout',
    method: 'post'
  })
}
