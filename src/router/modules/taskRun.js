/**
 * 任务运行管理
 */

import Layout from '@/views/layout/Layout'

const TaskOperation = {
  path: '/quoteoperational',
  component: Layout,
  redirect: '/quoteoperational/demanddimension',
  name: 'Quoteoperational',
  meta: {
    title: 'runTaskManager',
    icon: 'quotation',
    roles: ['06']
  },
  children: [
    {
      path: 'demanddimension',
      name: 'Demanddimension',
      component: () => import('@/views/quoteoperational/demanddimension/index'),
      meta: {
        title: 'demandForTask',
        roles: ['0601'],
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'demanddimensionMaterieldimension',
      name: 'DemanddimensionMaterieldimension',
      hidden: true,
      component: () => import('@/views/quoteoperational/materieldimension/index'),
      meta: {
        title: 'demandForTask',
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'materieldimension',
      name: 'Materieldimension',
      component: () =>
        import('@/views/quoteoperational/materieldimension/index'),
      meta: {
        title: 'materielNumForTask',
        roles: ['0602'],
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'editingtask',
      name: 'Editingtask',
      hidden: true,
      component: () => import('@/views/quoteoperational/editingtask/index'),
      meta: {
        title: 'editingTaskForTask',
        keepAlive: true
      }
    }
  ]
}

export default TaskOperation
