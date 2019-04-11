/**
 * 报价单填报
 */

import Layout from '@/views/layout/Layout'

const quotationManagementRouter = {
  path: '/offersheet',
  component: Layout,
  redirect: '/offersheet/listrequirements',
  name: 'Offersheet',
  meta: {
    title: 'fillSheet',
    icon: 'demand',
    roles: ['supplier', '12']
    // roles: ['01', '02', '03']
  },
  children: [
    {
      path: 'listrequirements',
      name: 'Listrequirements',
      component: () => import('@/views/offersheet/listrequirements/index'),
      meta: {
        title: 'fistRequirements',
        icon: 'righticon',
        roles: ['supplier', '1201'],
        keepAlive: true
        // roles: ['01', '02', '03']
      }
    },
    {
      path: 'listprivate',
      name: 'Listprivate',
      component: () => import('@/views/offersheet/listprivate/index'),
      meta: {
        title: 'specialNumber',
        icon: 'righticon',
        roles: ['supplier', '1202'],
        keepAlive: true
        // roles: ['01', '02', '03']
      }
    },
    {
      path: 'listrequirementsListprivate',
      name: 'listrequirementsListprivate',
      hidden: true,
      component: () => import('@/views/offersheet/listprivate/index'),
      meta: {
        title: 'fistRequirements',
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'priceList',
      name: 'priceList',
      hidden: true,
      component: () => import('@/views/offersheet/priceList/index'),
      meta: {
        title: 'priceList',
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'priceLists',
      name: 'priceLists',
      hidden: true,
      component: () => import('@/views/offersheet/priceList/index1'),
      meta: {
        title: 'priceList',
        icon: 'righticon',
        keepAlive: true
      }
    }
  ]
}

export default quotationManagementRouter
