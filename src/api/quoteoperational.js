/* 任务运行管理模块 */
import request from '@/utils/request'
import Qs from 'qs'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/* 公共模块 */

/**
 * @Page：任务运行管理 -> excel下载
 * @ApiDesc： 接口id10页面excel下载 (id173)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */
export function uploadExcel(params) {
  return request({
    url: 'task/listToExcel',
    method: 'get',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：下拉接口
 * @UsingRoles：商务小微
 * @Author: 陈丽莎
 */
export function selects(params) {
  return request({
    url: 'dictionary/list',
    method: 'post',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：任务运行查询功能
 * @UsingRoles：商务小微
 * @Author: 陈丽莎
 */
export function selectName(params) {
  return request({
    url: 'task/list',
    method: 'get',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：产业线下拉接口(id20)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function modules(params) {
  return request({
    url: 'industry/getIndustry',
    method: 'get',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：模糊查询弹窗里的内容,物料类别(接口id7)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function search(params) {
  return request({
    url: 'base/list',
    method: 'post',
    params
  })
}

/**
 * @Page：公共（任务运行管理）
 * @ApiDesc：任务人->模糊查询弹窗(接口id68)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function taskMan(params) {
  return request({
    url: 'task/getManagerList',
    method: 'get',
    params
  })
}

/**
 * @Page：公共（任务运行管理）
 * @ApiDesc：物料号->模糊查询弹窗(接口id69)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function materialNumber(params) {
  return request({
    url: 'task/getModuleCodeList',
    method: 'get',
    params
  })
}

/**
 * @Page：公共（任务运行管理）
 * @ApiDesc：需求编码->模糊查询弹窗(接口id67)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function requirementCoding(params) {
  return request({
    url: 'task/getDemandCodeList',
    method: 'get',
    params
  })
}

/**
 * @Page：任务运行管理->物料号维度->修改任务启停状态
 * @ApiDesc：需求编码->模糊查询弹窗(接口id26)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function modifyState(params) {
  return request({
    url: 'task/updateTaskStatus',
    method: 'post',
    data: params
  })
}

/**
 * @Page：任务运行管理->任务截止日期
 * @ApiDesc：模板列表获取(接口id80)
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function getTemplateList(params) {
  return request({
    url: 'template/getTemplateList',
    method: 'get',
    params
  })
}
/**
 * @Page：任务运行管理->任务截止日期
 * @ApiDesc：上部详细信息展示(接口id81)
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function getTaskDetail(params) {
  return request({
    url: 'task/getTaskDetail',
    method: 'get',
    params
  })
}
/**
 * @Page：任务运行管理->任务截止日期
 * @ApiDesc：截止日期和模板更改（保存）按钮(接口id12)
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function update(params) {
  return request({
    url: 'task/update',
    method: 'post',
    data: Qs.stringify(params)
    // data: params
  })
}

/**
 * @Page：任务运行管理->编辑任务
 * @ApiDesc：截止日期和模板更改（删除模板）按钮(接口id33)
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function deleteModle(params) {
  return request({
    url: 'template/deleteTemplate',
    method: 'get',
    params
  })
}
