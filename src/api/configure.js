/* 配置规则模块 */
import request from '@/utils/request'
// const api = 'http://47.104.98.71:8780/costmanagement/'
/**
 * @Page：规则配置
 * @ApiDesc：规则配置列表(id139)
 * @UsingRoles：小微
 * @Author: 王亚迪
 */
export function selectList(params) {
  return request({
    url: 'rule/getRuleList',
    method: 'get',
    params
  })
}

/**
 * @Page：规则配置-->新建规则
 * @ApiDesc：规则配置-->新建(id138)
 * @UsingRoles：小微
 * @Author: 王亚迪
 */
export function addRule(params) {
  return request({
    url: 'rule/saveRule',
    method: 'post',
    data: params
  })
}

/**
 * @Page：规则配置-->修改规则状态
 * @ApiDesc：规则配置列表(id117)
 * @UsingRoles：小微
 * @Author: 王亚迪
 */
export function updateRuleState(params) {
  return request({
    url: 'rule/updateRule',
    method: 'get',
    params
  })
}
