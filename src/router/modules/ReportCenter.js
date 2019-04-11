/**
 * 报表中心
 */

import Journaling from '@/views/journaling/index'
// import Layout from '@/views/layout/Layout'

const ReportCenterRouter = {
  path: '/journaling',
  component: Journaling,
  // component: Layout,
  redirect: '/journaling/schedule/index',
  meta: {
    title: 'dataexport',
    icon: 'reportcenter',
    roles: ['09']
  },
  children: [
    {
      path: 'dataexport',
      name: 'Dataexport',
      component: () => import('@/views/journaling/dataexport/index'),
      meta: {
        title: 'dataexport',
        icon: 'reportcenter'
      }
    }
  ]
}

export default ReportCenterRouter
/* import Layout from '@/views/layout/Layout'
import Journaling from '@/views/journaling/index'

const ReportCenterRouter = {
  path: '/journaling',
  component: Journaling,
  redirect: '/journaling/schedule/index',
  name: 'Journaling',
  meta: {
    title: 'reportCenter',
    icon: 'reportcenter',
    roles: ['leader', 'micro', 'manager']
  },
  children: [
    {
      path: 'schedule',
      name: 'Schedule',
      component: Layout,
      children: [{
        path: 'index',
        name: 'Index',
        component: () => import('@/views/journaling/schedule/index'),
        meta: {
          title: 'progressClerk',
          icon: 'righticon'
        }
      }]
    },
    {
      path: 'quality',
      name: 'Quality',
      component: Layout,
      children: [{
        path: 'qualityindex',
        name: 'QualityIndex',
        component: () => import('@/views/journaling/quality/index'),
        meta: {
          title: 'qualityStatistics',
          icon: 'righticon'
        }
      }]
    },
    {
      path: 'dataexport',
      name: 'Dataexport',
      component: () => import('@/views/journaling/dataexport/index'),
      meta: {
        title: 'dataexport',
        icon: 'righticon'
      },
      children: [{
        path: 'dataexportcon',
        name: 'Dataexportcon',
        component: () => import('@/views/journaling/dataexport/dataexportcon'),
        meta: {
          title: 'dataexport',
          icon: 'righticon'
        }
      }]
    }
  ]
}*/
