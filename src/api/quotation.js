/* 报价管理模块 */
import request from '@/utils/request'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/**
 * @Page：报价管理 -> excel下载
 * @ApiDesc： 接口id14页面excel下载 (id179)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */
export function uploadExcel(params) {
  return request({
    url: 'excelFile/getDemandExcel',
    method: 'get',
    // responseType: 'blob',
    params
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}

/**
 * @Page：报价管理 -> 需求号维度、物料号维度
 * @ApiDesc： 按需求维度或物料号维度或采购组历史查询报价单集合 (id14)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */
export function quotationRequest(params) {
  return request({
    url: 'report/list',
    method: 'post',
    data: params
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}

/**
 * @Page：报价管理 -> 需求号进度展示
 * @ApiDesc： 根据筛选条件，查询需求维度的分解情况 (id27)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */

export function demandNumberSchedule(params) {
  return request({
    url: 'task/getResolveDemandProgress',
    method: 'post',
    data: params
  })
}

/**
 * @Page：报价管理 -> 物料号进度展示
 * @ApiDesc： 根据筛选条件查询物料号维度的分解情况 (id28)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */

export function materialNumberSchedule(params) {
  return request({
    url: 'task/getResolveModuleProgress',
    method: 'post',
    data: params
  })
}

/**
 * @Page：报价管理 -> 物料号维度 -> 报价单稽核
 * @ApiDesc： 报价单稽核提交功能 (id18)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */

export function submission(params) {
  return request({
    url: 'reportCheck/add',
    method: 'post',
    data: params
  })
}

/**
 * @Page：报价管理 -> 物料号维度 -> 报价单稽核
 * @ApiDesc： 展示稽核的报价单 (id65)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */

// export function QuotationSheetDisplay(params) {
//   return request({
//     url: 'task/getReportData',
//     method: 'get',
//     data: params
//   })
// }

/**
 * @Page：报价管理 -> 物料号维度 -> 历史纪录 -> 查看
 * @ApiDesc： 历史报价单查看 (id65)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */

// export function viewingHistory(params) {
//   return request({
//     url: 'task/getReportData',
//     method: 'get',
//     data: params
//   })
// }
