/* 历史报价单模块 */
import request from '@/utils/request'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/**
 * @Page：公共
 * @ApiDesc：报价单历史列表 接口id：14.3
 * @UsingRoles：供应商
 * @Author: 孙中超
 */
export function getHistoryList(data) {
  return request({
    url: 'report/list',
    method: 'post',
    data
  })
}
