/* 字段库模块 */
import request from '@/utils/request'
import Qs from 'qs'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/**
 * @Page：字段库
 * @ApiDesc：字段库中   新建组
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function fieldClassAdd(params) {
  return request({
    url: 'fieldClass/add',
    method: 'POST',
    data: Qs.stringify(params)
  })
}

/**
 * @Page：字段库
 * @ApiDesc：字段分组名称修改
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function fieldClassUpdate(params) {
  return request({
    url: 'fieldClass/update',
    method: 'POST',
    data: Qs.stringify(params)
  })
}

/**
 * @Page：字段库
 * @ApiDesc：字段分组删除接口
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function fieldClassDelete(params) {
  return request({
    url: 'fieldClass/delete',
    method: 'POST',
    data: Qs.stringify(params)
  })
}

/**
 * @Page：字段库
 * @ApiDesc：字段分组查询接口
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function fieldClassSelect(params) {
  return request({
    url: 'fieldClass/select',
    method: 'GET',
    params
  })
}

/**
 * @Page：字段库
 * @ApiDesc：字段数据列表查询
 * @UsingRoles：商务小微
 * @Author: csg
 */

export function searchFieldList() {
  return request({
    url: 'fieldList/searchFieldList',
    // url: 'http://10.190.48.177:8083/haiercostsupport/fieldList/searchFieldList',
    method: 'GET'
  })
}
/**
 * @Page：字段库
 * @ApiDesc：字段上 删除操作
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function FieldDelete(params) {
  return request({
    url: 'field/delete',
    method: 'POST',
    data: Qs.stringify(params)
  })
}
/**
 * @Page：字段库
 * @ApiDesc：树上的新建字段
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function FieldAdd(params) {
  return request({
    url: 'field/add',
    method: 'POST',
    data: Qs.stringify(params)
  })
}
/**
 * @Page：字段库
 * @ApiDesc：字段修改
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function fieldUpdate(params) {
  return request({
    url: 'field/update',
    method: 'POST',
    data: Qs.stringify(params)
  })
}
/**
 * @Page：字段库
 * @ApiDesc：字段列表
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function list(params) {
  return request({
    url: 'field/list',
    method: 'GET',
    params
  })
}
/**
 * @Page：字段库
 * @ApiDesc：字段列表excel下载
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function listToExcel(params) {
  return request({
    url: 'field/listToExcel',
    method: 'post',
    data: params
  })
}
