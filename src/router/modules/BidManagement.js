/**
 * 报价管理
 */

import Layout from '@/views/layout/Layout'

const BidManagementRouter = {
  path: '/quotation',
  component: Layout,
  redirect: '/quotation/demand',
  name: 'Quotation',
  meta: {
    title: 'bidManagement',
    icon: 'offer',
    roles: ['07']
  },
  children: [
    {
      path: 'demand',
      name: 'Demand',
      component: () => import('@/views/quotation/demand/index'),
      meta: {
        title: 'demandForDimension',
        icon: 'righticon',
        roles: ['0701'],
        keepAlive: true
      }
    },
    {
      path: 'exclusive',
      name: 'Exclusive',
      component: () => import('@/views/quotation/exclusive/index'),
      meta: {
        title: 'specialNumberDimension',
        icon: 'righticon',
        roles: ['0703', '0702'],
        keepAlive: true
      }
    },
    {
      path: 'demandExclusive',
      name: 'Dxclusive',
      hidden: true,
      component: () => import('@/views/quotation/exclusive/index'),
      meta: {
        title: 'demandForDimension',
        icon: 'righticon',
        roles: ['0703', '0702'],
        keepAlive: true
      }
    },
    {
      path: 'audit',
      name: 'Audit',
      hidden: true,
      component: () => import('@/views/quotation/exclusive/audit'),
      meta: {
        title: '报价单稽核',
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'supplierGroup',
      name: 'SupplierGroup',
      component: () => import('@/views/quotation/supplierGroup/index'),
      meta: {
        title: 'procurementHistory',
        icon: 'righticon',
        roles: ['0704'],
        keepAlive: true
      }
    }
  ]
}

export default BidManagementRouter
