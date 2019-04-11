/* 需求管理模块 */
import request from '@/utils/request'
import Qs from 'qs'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/* 公共模块 */

/**
 * @Page：公共
 * @ApiDesc：下拉接口
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function selects(params) {
  return request({
    url: 'dictionary/list',
    method: 'post',
    data: Qs.stringify(params)
  })
}

/**
 * @Page：公共
 * @ApiDesc：存储下拉接口字段
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function selectName(params) {
  return request({
    url: 'dictionary/add',
    method: 'post',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：模糊查询弹窗里的内容
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function modules(params) {
  return request({
    url: 'base/list',
    method: 'post',
    data: params
  })
}

/* 块页面接口 */

/**
 * @Page：需求过滤页面
 * @ApiDesc：列表分页
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function filter(params) {
  return request({
    url: 'demandsc/list',
    method: 'post',
    data: params
  })
}

/**
 * @Page：需求过滤页面
 * @ApiDesc：过滤编号弹窗(id22)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function newlyBuild(params) {
  return request({
    url: 'demandScRule/searchDemandFilterListByCS',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求过滤页面
 * @ApiDesc：过滤列表(id61)
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function filterList(params) {
  return request({
    url: 'demandFilter/searchDemandFilterList',
    method: 'get',
    params
  })
}
/**
 * @Page：需求列表->不需要分解
 * @ApiDesc：需求列表 分页列表
 * @UsingRoles：商务小微 采购经理
 * @Author: csg
 */
export function searchDemandList(params) {
  return request({
    url: 'demand/searchDemandList',
    // url: 'http://10.190.49.72:8083/haiercostsupport/demand/searchDemandList',
    method: 'POST',
    data: Qs.stringify(params)
  })
}

/**
 * @Page：需求列表->不需要分解
 * @ApiDesc：需求列表 分页列表
 * @UsingRoles：商务小微 采购经理
 * @Author: csg
 */
export function materialNumber(params) {
  return request({
    url: 'module/searchModuleList',
    method: 'GET',
    params
  })
}

/**
 * @Page：需求列表->产业线
 * @ApiDesc：产业线数据
 * @UsingRoles：商务小微 采购经理
 * @Author: csg
 */
export function industryLine() {
  return request({
    url: 'industry/getIndustry',
    method: 'get'
  })
}

/**
 * @Page：需求列表
 * @ApiDesc：任务人 需求编码
 * @UsingRoles：商务小微
 * @Author: csg
 */
export function flagFindData(params) {
  return request({
    url: 'demandFilter/selectInfo',
    method: 'GET',
    params
  })
}

/**
 * @Page：需求定制
 * @ApiDesc：需求定制列表查询 id：51
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function searchDemandCustomList(params) {
  return request({
    url: 'CustomizedDemand/searchDemandCustomList',
    method: 'get',
    params
  })
}
/**
 * @Page：需求定制->产品线
 * @ApiDesc：产品线数据 id待后台写完
 * @UsingRoles：商务小微 采购经理
 * @Author: 王建栋
 */
export function gePl(params) {
  return request({
    url: 'industry/gePl',
    method: 'get',
    params
  })
}
/**
 * @Page：需求定制创建
 * @ApiDesc：需求定制创建从状态跳转接口 id：70
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function searchDemandDeteil(params) {
  return request({
    url: 'CustomizedDemand/searchDemandDeteil',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求定制创建
 * @ApiDesc：需求定制保存发布 id：50
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function insertDemandInfo(params) {
  return request({
    url: 'CustomizedDemand/insertDemandInfo',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求定制创建
 * @ApiDesc：需求定制保存发布修改 id：104
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function updateDemandInfo(params) {
  return request({
    url: 'CustomizedDemand/updateDemandInfo',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求过滤创建
 * @ApiDesc：需求过滤创建接口 id：22
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function searchDemandFilterListByCS(params) {
  return request({
    url: 'demandScRule/searchDemandFilterListByCS',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求过滤创建
 * @ApiDesc：需求过滤创建保存接口 id：23
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function saveDemandFilter(params) {
  return request({
    url: 'demandScRule/saveDemandFilter',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求过滤创建
 * @ApiDesc：需求过滤创建生效接口 id：24
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function updateDemandFilter(params) {
  return request({
    url: 'demandScRule/updateDemandFilter',
    method: 'post',
    data: params
  })
}
/**
 * @Page：需求过滤创建
 * @ApiDesc：需求过滤创建物料类别（特制）接口 id：
 * @UsingRoles：商务小微
 * @Author: 王建栋
 */
export function categoryList() {
  return request({
    url: 'base/categoryList',
    method: 'get'
  })
}

