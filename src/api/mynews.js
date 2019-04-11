/* 我的消息模块 */
import request from '@/utils/request'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/**
 * @Page：我的消息页面,办理状态搜索查询
 * @ApiDesc：查询
 * @UsingRoles：所有
 * @Author: 王建栋
 */
export function getMessageInfos(params) {
  return request({
    url: 'message/getMessageInfos',
    method: 'get',
    params
  })
}
