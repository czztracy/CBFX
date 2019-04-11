/* 模板管理模块 */
import request from '@/utils/request'
// import Qs from 'qs'
// const api = 'http://47.104.98.71:8680/costmanagement/'
// const api = 'http://47.104.98.71:8780/costmanagement/'

/**
 * @Page：报价管理 -> 物料号维度 -> 报价单稽核
 * @ApiDesc： 展示稽核的报价单 (id65)
 * @UsingRoles：商务小微  采购经理
 * @Author: 王亚迪
 */

export function sheetAudit(params) {
  return request({
    url: 'task/getReportData',
    method: 'get',
    params
  })
}

/* 公共模块 */
/**
 * @Page：公共
 * @ApiDesc：模版编辑初始化树形结构 接口id：30
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function initTree(params) {
  return request({
    url: 'templateClass/getTemplateClass',
    method: 'get',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：模版编辑树左键 获取右侧内容显示 接口id：56
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function getTemplate(params) {
  return request({
    url: 'template/getTemplate',
    method: 'get',
    params
  })
}
// export function getTemplate(params) {
//   return request({
//     url: api + 'template/getTemplateList',
//     method: 'get',
//     params
//   })
// }

/**
 * @Page：公共
 * @ApiDesc：模板树形结构分组修改 接口id：57
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function templateClassRename(data) {
  return request({
    url: 'templateClass/updateTemplateClass',
    method: 'post',
    data: data
  })
}

/**
 * @Page：公共
 * @ApiDesc：模板树形结构分组新建保存 接口id：58
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function saveTemplateClass(data) {
  return request({
    url: 'templateClass/saveTemplateClass',
    method: 'post',
    data: data
  })
}

/**
 * @Page：公共
 * @ApiDesc：模板树形结构分类删除 接口id：59
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function templateClassDelete(params) {
  return request({
    url: 'templateClass/deleteTemplateClass',
    method: 'get', // 文档是post
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：根据模板版本id查询对应模板数据信息 接口id：63
 * @UsingRoles：商务小微
 * @Author: 王亚迪
 */
export function templateList(params) {
  return request({
    url: 'template/getTemplate',
    method: 'get',
    params
  })
}

/**
 * @Page：公共
 * @ApiDesc：模板列表查询 接口id：80
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function getTemplateList(params) {
  return request({
    url: 'template/getTemplateList',
    method: 'get',
    params
  })
}

/**
 * @Page：模板审核
 * @ApiDesc：模板审核提交/返回功能 接口id：55
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function toexamine(params) {
  return request({
    url: 'template/toexamineTemplate',
    method: 'post',
    // data: Qs.stringify(params)
    data: params
  })
}

/**
 * @Page：模板审核
 * @ApiDesc：模板审核初始结构渲染 接口id：63
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function xuanTemplate(templateId) {
  return request({
    url: 'template/getTemplate',
    method: 'get',
    // data: Qs.stringify(params)
    // data: params
    params: { templateId }
  })
}

/**
 * @Page：模板管理
 * @ApiDesc：模板修改，模版置顶置顶接口 id：32
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function updateTemplate(data) {
  return request({
    url: 'template/updateTemplate',
    method: 'post',
    // data: Qs.stringify(params)
    data
  })
}

/**
 * @Page：模板管理
 * @ApiDesc：模板删除接口  接口id：33
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function deleteTemplate(params) {
  // templateCode	必填
  return request({
    url: 'template/deleteTemplate',
    method: 'get',
    params
  })
}

/**
 * @Page：模板管理
 * @ApiDesc：修改品类所属模板分类接口（拖动） 接口id：88
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function updateCategoryClass(data) {
  return request({
    url: 'templateClass/updateCategoryClass',
    method: 'post',
    // data: Qs.stringify(params)
    data
  })
}

/**
 * @Page：模板管理
 * @ApiDesc：查询本区域下模板分类树接口（拖动） 接口id：96
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function getAreaTree(params) {
  // templateCode	必填
  return request({
    url: 'templateClass/getAreaTree',
    method: 'get',
    params
  })
}

/**
 * @Page：模板管理
 * @ApiDesc：查询本区域下所有品类接口（拖动） 接口id：97
 * @UsingRoles：商务小微
 * @Author: 孙中超
 */
export function getAreaCategory(params) {
  // templateCode	必填
  return request({
    url: 'templateClass/getAreaCategory',
    method: 'get',
    params
  })
}

/**
 * @Page：登录超时续约
 * @ApiDesc：登录超时 续约overtime  接口对接人：张先德
 * @UsingRoles：商务小微
 * @Author: 陈莉莎
 */
export function addOverTime() {
  return request({
    url: 'sso/renewContract',
    method: 'get',
    // params
  })
}
