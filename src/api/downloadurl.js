/* 列表导出 */
import { api } from '@/utils/api'
const info = '&token=' + sessionStorage.getItem('token') + '&ticket=' + sessionStorage.getItem('ticket') + '&overtime=' + encodeURIComponent(sessionStorage.getItem('overtime'))
/**
 * @Page：需求列表导出
 * @ApiDesc：id172
 * @UsingRoles：小微
 * @Author: 孙中超
 */
export function exportDemandList(params) {
  return api() + 'demand/exportDemandList' + '?param=' + encodeURIComponent(JSON.stringify(params)) + info
}

/**
 * @Page：任务运行管理导出
 * @ApiDesc：id173(接口id10页面excel下载)
 * @UsingRoles：小微，采购经理
 * @Author: 孙中超
 */
export function listToExcel(params) {
  return api() + 'task/listToExcel' + '?param=' + encodeURIComponent(JSON.stringify(params)) + info
}

/**
 * @Page：报价单列表导出
 * @ApiDesc：id179
 * @UsingRoles：小微，供应商
 * @Author: 孙中超
 */
export function getDemandExcel(params) {
  return api() + 'excelFile/getDemandExcel' + '?param=' + encodeURIComponent(JSON.stringify(params)) + info
}

/**
 * @Page：字段库excel列表导出
 * @ApiDesc：id175
 * @UsingRoles：小微，供应商
 * @Author: 王建栋
 */
export function FizelistToExcel(params) {
  return api() + 'field/listToExcel' + '?param=' + encodeURIComponent(JSON.stringify(params)) + info
}
