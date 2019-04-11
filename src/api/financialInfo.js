/* 财务信息模块 */
import request from '@/utils/request'
import Qs from 'qs'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/* 公共模块 */

/**
 * @Page：公共
 * @ApiDesc：新建按钮
 * @UsingRoles：商务小微
 * @Author: 张聪聪
 */
export function addBtn(params) {
  return request({
    url: 'rate/addRate',
    method: 'Post',
    data: Qs.stringify(params)
  })
}
