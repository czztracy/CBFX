/**
 * 模板管理
 */
import Layout from '@/views/layout/Layout'

const templateManagementRouter = {
  path: '/modle',
  // component: () => import('@/views/modle/index'),
  component: Layout,
  redirect: '/modle/edit',
  name: 'Modle',
  meta: {
    title: 'templateManager',
    icon: 'template',
    roles: ['08']
  },
  children: [
    {
      path: 'edit',
      name: 'Edit',
      component: () => import('@/views/modle/edit/index'),
      meta: {
        title: 'editModel',
        icon: 'righticon',
        roles: ['0801'],
        keepAlive: true
      },
      children: [{
        path: 'editcon',
        name: 'Editcon',
        component: () => import('@/views/modle/edit/editcon'),
        meta: {
          title: 'editModel',
          icon: 'righticon',
          keepAlive: true
        }
      }]
    },
    {
      path: 'examine',
      name: 'Examine',
      component: () => import('@/views/modle/examine/index'),
      meta: {
        title: 'reviewTemplate',
        roles: ['0802'],
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'newlybuild',
      name: 'Newlybuild',
      hidden: true,
      component: () => import('@/views/modle/newlybuild/index'),
      meta: {
        title: 'newlybuild',
        roles: ['0803'],
        icon: 'righticon',
        keepAlive: true
      }
    },
    // 导航切换修改
    {
      path: '/index2', // 新建模板
      name: 'newlybuildIndex1',
      hidden: true,
      component: () => import('@/views/modle/newlybuild/index2'),
      meta: { title: '新建模板', icon: 'msg' }
    },
    {
      path: 'modifyModle',
      name: 'ModifyModle',
      hidden: true,
      component: () => import('@/views/modle/modifyModle/index'),
      meta: {
        title: 'modifyModle',
        // roles: ['leader'],
        icon: 'righticon',
        keepAlive: true
      }
    },
    {
      path: 'review',
      name: 'Review',
      hidden: true,
      component: () => import('@/views/modle/examine/review'),
      meta: {
        title: '模板审核预览',
        icon: 'righticon',
        keepAlive: true
      }
    }
  ]
}

export default templateManagementRouter
