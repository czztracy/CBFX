/**
 * 需求管理
 */

import Layout from '@/views/layout/Layout'

const demandManagementRouter = {
  path: '/requirements',
  component: Layout,
  redirect: '/requirements/reqfilter',
  name: 'Requirements',
  meta: {
    title: 'demandManagement',
    icon: 'demand',
    roles: ['05']
  },
  children: [
    {
      path: 'reqfilter',
      name: 'Reqfilter',
      component: () => import('@/views/requirements/reqfilter/index'),
      meta: {
        title: 'demandForFiltering',
        roles: ['0501'],
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'reqfiltersetting',
      name: 'Reqfiltersetting',
      hidden: true,
      component: () =>
        import('@/views/requirements/reqfilter/reqfiltersetting'),
      meta: {
        title: 'demandFilteringSettings',
        keepAlive: true
      }
    },
    {
      path: 'reqcustomization',
      name: 'Reqcustomization',
      component: () => import('@/views/requirements/reqcustomization/index'),
      meta: {
        title: 'demandCustomization',
        icon: 'righticon',
        roles: ['0502'],
        keepAlive: true
      }
    },
    {
      path: 'reqcustomizationadd',
      name: 'Reqcustomizationadd',
      hidden: true,
      component: () =>
        import('@/views/requirements/reqcustomization/reqcustomizationadd'),
      meta: {
        title: 'demandCustomizationAdd',
        keepAlive: true
      }
    },
    {
      path: '/reqlist',
      name: 'reqlist',
      component: () => import('@/views/requirements/reqlist/index'),
      meta: {
        title: 'requirementList',
        icon: 'righticon',
        roles: ['0503'],
        keepAlive: true
      },
      children: [
        {
          path: 'resolve',
          name: 'resolve',
          component: () => import('@/views/requirements/reqlist/resolve'),
          meta: {
            title: 'resolve',
            icon: 'circle',
            roles: ['050301'],
            keepAlive: true
          }
        },
        {
          path: 'noResolve',
          name: 'noResolve',
          component: () => import('@/views/requirements/reqlist/noResolve'),
          meta: {
            title: 'noResolve',
            icon: 'circle',
            roles: ['050302'],
            keepAlive: true
          }
        }
      ]
    }
  ]
}

export default demandManagementRouter
