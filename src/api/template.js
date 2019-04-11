/* 模板部分 */
import request from '@/utils/request'
/**
 * @Page：新建模板页面
 * @ApiDesc：模板列表 id：80
 * @UsingRoles：商务小微
 * @Author: cong
 */
export function getTemplateList(params) {
  return request({
    url: 'template/getTemplateList',
    method: 'GET',
    params
  })
}
/**
 * @Page：新建模板页面
 * @ApiDesc：提交按钮 id: 54
 * @UsingRoles：商务小微
 * @Author: cong
 */
export function submitTemplate(params) {
  return request({
    url: 'template/submitTemplate',
    method: 'POST',
    data: params
  })
}

/**
 * @Page：新建模板页面
 * @ApiDesc：保存按钮 id:31
 * @UsingRoles：商务小微 -------------
 * @Author: cong
 */
export function saveTemplate(params) {
  return request({
    url: 'template/saveTemplate',
    method: 'POST',
    data: params
  })
}
/**
 * @Page：新建模板页面
 * @ApiDesc：模版修改 id：32
 * @UsingRoles：商务小微
 * @Author: cong
 */
export function updateTemplate(params) {
  return request({
    url: 'template/updateTemplate',
    method: 'POST',
    data: params
  })
}
/**
 * @Page：新建模板页面
 * @ApiDesc：模板查询接口 id：63
 * @UsingRoles：商务小微 -------------
 * @Author: cong
 */
export function getTemplate(params) {
  return request({
    url: 'template/getTemplate',
    method: 'GET',
    params
  })
}
