/* 报价单填报模块 */
import request from '@/utils/request'
// import Qs from 'qs'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/* 公共模块 */

/**
 * @Page：公共
 * @ApiDesc：获取报价单的历史记录弹窗列表 id:64
 * @UsingRoles：供应商
 * @Author: 孙中超
 */
export function getReportAudit(params) {
  return request({
    url: 'task/getReportAudit',
    method: 'get',
    params
  })
}

/**
 * @Page：供应商填报
 * @ApiDesc：获取物料号数量（已分解，未分解，分解中 id28）
 * @UsingRoles：供应商
 * @Author: 孙中超
 */
export function getResolveModuleProgress(data) {
  return request({
    url: 'task/getResolveModuleProgress',
    method: 'post',
    data
    // data: Qs.stringify(params)
  })
}

/**
 * @Page：供应商填报
 * @ApiDesc：获取物料号列表id:14.5
 * @UsingRoles：供应商
 * @Author: 孙中超
 */
export function getListPrivate(data) {
  return request({
    url: 'report/list',
    method: 'post',
    data
    // data: Qs.stringify(params)
  })
}

/* 报价单填报模块 */
/**
 * @Page：供应商填报
 * @ApiDesc：匹配历史报价单 ID52
 * @UsingRoles：供应商
 * @Author: 陈莉莎
 */
export function historys(data) {
  return request({
    url: 'task/getHistoryReportList',
    method: 'post',
    data
  })
}

/**
 * @Page：供应商填报
 * @ApiDesc：根据填报单标识查询填报单及数据 ID65
 * @UsingRoles：供应商
 * @Author: 陈莉莎
 */
export function hisXuanran(params) {
  return request({
    url: 'task/getReportData',
    method: 'get',
    params
  })
}

/**
 * @Page：供应商填报
 * @ApiDesc：填报单保存/提交 id53
 * @UsingRoles：供应商
 * @Author: 陈莉莎
 */
export function submitSave(params) {
  return request({
    url: 'report/saveReportData',
    method: 'post',
    // data: Qs.stringify(params)
    data: params
  })
}

/*
   * @Page：供应商填报
   * @ApiDesc：获取需求数据  id148
   * @UsingRoles：供应商
   * @Author: 陈莉莎
   */
export function requires(params) {
  return request({
    url: 'report/getInfoByRid',
    method: 'get',
    params
    // data: Qs.stringify(params)
  })
}

/*
   * @Page：供应商填报
   * @ApiDesc：贷款利率查询（id99）
   * @UsingRoles：供应商
   * @Author: 张聪聪
   */
export function searchLendingRate(params) {
  return request({
    url: 'lendingRate/searchLendingRate',
    method: 'post',
    params
  })
}
/*
   * @Page：供应商填报
   * @ApiDesc：新增贴现率（id101）
   * @UsingRoles：供应商
   * @Author: 张聪聪
   */
export function searchLiscountRate(params) {
  return request({
    url: 'discountRate/search',
    method: 'get',
    params
  })
}
