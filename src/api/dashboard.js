/* 首页模块 */
import request from '@/utils/request'
import Qs from 'qs'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/* 公共模块 */

/**
 * @Page：公共
 * @ApiDesc：下拉接口
 * @UsingRoles：All
 * @Author: 孙中超
 */
export function selects(data) {
  return request({
    url: 'dictionary/list',
    method: 'post',
    data: Qs.stringify(data)
  })
}

/**
 * @Page：公共
 * @ApiDesc：产业线
 * @UsingRoles：All
 * @Author: 孙中超
 */
export function getIndustry(params) {
  return request({
    url: 'industry/getIndustry',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单稽核率
 * @ApiDesc：查询报价单稽核率 id106
 * @UsingRoles：小微
 * @Author: 孙中超
 */
export function reportAuditRate(params) {
  return request({
    url: 'statistic/reportAuditRate',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->产业线参与度
 * @ApiDesc：产业线参与度 id107
 * @UsingRoles：小微
 * @Author: 孙中超
 */
export function searchParticipationDegree(params) {
  return request({
    url: 'statistic/searchParticipationDegree',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单查看率
 * @ApiDesc：查询报价单查看率 id108
 * @UsingRoles：采购经理
 * @Author: 孙中超
 */
export function reportViewingRate(params) {
  return request({
    url: 'statistic/reportViewingRate',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询供应商分解进度
 * @ApiDesc：查询供应商分解进度 id109
 * @UsingRoles：采购经理
 * @Author: 孙中超
 */
export function supplierDecompositionProgress(params) {
  return request({
    url: 'statistic/supplierDecompositionProgress',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询供应商分解质量
 * @ApiDesc：查询供应商分解质量 id110
 * @UsingRoles：采购经理
 * @Author: 孙中超
 */
export function supplierDecompositionQuality(params) {
  return request({
    url: 'statistic/supplierDecompositionQuality',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单完成及时率
 * @ApiDesc：查询报价单完成及时率 id111
 * @UsingRoles：供应商
 * @Author: 孙中超
 */
export function reportCompletionRate(params) {
  return request({
    url: 'statistic/reportCompletionRate',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单进度预警
 * @ApiDesc：查询报价单进度预警 id112
 * @UsingRoles：供应商
 * @Author: 孙中超
 */
export function searchReportProgressWarning(params) {
  return request({
    url: 'statistic/reportProgressWarning',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单任务数量、分解完成率、退回率
 * @ApiDesc：查询报价单任务数量、分解完成率、退回率 id115
 * @UsingRoles：All
 * @Author: 孙中超
 */
export function searchReportCountAndRate(params) {
  return request({
    url: 'statistic/searchReportCountAndRate',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单分解进度
 * @ApiDesc：查询报价单分解进度 id116
 * @UsingRoles：All
 * @Author: 孙中超
 */
export function searchReportAnalyzeProgress(params) {
  return request({
    url: 'statistic/searchReportAnalyzeProgress',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单质量分布
 * @ApiDesc：查询报价单质量分布 id120
 * @UsingRoles：采购经理、小微
 * @Author: 孙中超
 */
export function suggestions(params) {
  return request({
    url: 'statistic/suggestions',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询报价单分解质量
 * @ApiDesc：查询报价单分解质量 id121
 * @UsingRoles：采购经理
 * @Author: 孙中超
 */
export function types(params) {
  return request({
    url: 'statistic/types',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->查询大数据概况
 * @ApiDesc：查询大数据概况 id134
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */

export function getBigData(params) {
  return request({
    url: 'BigData/getBigData',
    method: 'get',
    params
  })
}

/**
 * @Page：首页->小微查询报价单分解质量
 * @ApiDesc：小微查询报价单分解质量 id134
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */

export function weiTypes(params) {
  return request({
    url: 'statistic/weiTypes',
    method: 'get',
    params
  })
}
