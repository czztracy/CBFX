import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import FieldPage from '@/views/fieldPage'
Vue.use(Router)

// Router Modules
import demandManagementRouter from './modules/demandManagement'
import BidManagementRouter from './modules/BidManagement'
import templateManagementRouter from './modules/templateManagement'
import ReportCenterRouter from './modules/ReportCenter'
import quotationManagementRouter from './modules/quotationManagement'
import TaskOperation from './modules/taskRun'

// 公用权限路由
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          roles: ['01', '02', '03'],
          icon: 'home'
        },
        component: () => import('@/views/dashboard/index')
      }
    ]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态路由加载权限
export const asyncRouterMap = [
  {
    path: 'mynews',
    component: Layout,
    redirect: 'mynews/index',
    meta: {
      roles: ['04', 'supplier']
    },
    children: [
      {
        path: '/index',
        name: 'Mynews',
        component: () => import('@/views/mynews/index'),
        meta: { title: 'myMessage', icon: 'msg', keepAlive: true }
      }
    ]
  },
  demandManagementRouter,
  TaskOperation,
  BidManagementRouter,
  templateManagementRouter,
  ReportCenterRouter,
  {
    path: '/configure',
    component: Layout,
    redirect: 'configure/index',
    meta: {
      roles: ['10']
    },
    children: [
      {
        path: 'index',
        name: 'Configure',
        component: () => import('@/views/configure/index'),
        meta: { title: 'ruleConfiguration', icon: 'setting', keepAlive: true }
      }
    ]
  },
  {
    path: '/field',
    // component: FieldPage,
    component: Layout,
    name: 'FieldPage',
    redirect: 'field/index',
    meta: {
      roles: ['11']
    },
    children: [
      {
        path: 'index',
        name: 'Field',
        component: () => import('@/views/field/fieldMsgList'),
        meta: { title: 'fieldInTheLibrary', icon: 'code', keepAlive: true }
      },
      {
        path: 'fieldMsgList',
        name: 'FieldMsgList',
        component: () => import('@/views/field/index'),
        meta: { title: 'fieldInTheLibrary', icon: 'code' },
        hidden: true
      }
    ]
  },
  quotationManagementRouter,
  {
    path: '/history', // 历史报价单
    component: Layout,
    redirect: 'history/index',
    meta: {
      roles: ['supplier', '13']
    },
    children: [
      {
        path: 'index',
        name: 'History',
        component: () => import('@/views/historyoffersheet/index'),
        meta: { title: 'historicalQuotation', icon: 'offer', keepAlive: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'financialInfo/index',
    meta: {
      roles: ['14']
    },
    children: [
      {
        path: '/financialInfo',
        name: 'FinancialInfo',
        component: () => import('@/views/financialInfo/index'),
        meta: { title: 'financialDataMaintenance', icon: 'msg', keepAlive: true }
      }
    ]
  },
  {
    path: 'newlybuildIndex1',
    component: Layout,
    hidden: true,
    redirect: 'modle/newlybuild/index1',
    meta: {
      roles: ['01', '02', '03']
    },
    children: [
      {
        path: '/index1',
        // path: '/index2',
        name: 'newlybuildIndex1',
        component: () => import('@/views/modle/newlybuild/index1'),
        meta: { title: '更换插件的模板1', icon: 'msg', keepAlive: true }
      }
    ]
  },
  {
    path: 'newlybuildIndex2',
    component: Layout,
    hidden: true,
    redirect: 'modle/newlybuild/index2',
    meta: {
      roles: ['01', '02', '03']
    },
    children: [
      {
        // path: '/index1',
        path: '/index2',
        name: 'newlybuildIndex1',
        component: () => import('@/views/modle/newlybuild/index2'),
        meta: { title: '新建模板', icon: 'msg', keepAlive: true }
      }
    ]
  },
  {
    path: 'newlybuildIndex3',
    component: Layout,
    // hidden: true,
    redirect: 'modle/newlybuild/index3',
    meta: {
      roles: ['01', '02', '03']
    },
    children: [
      {
        path: '/index3',
        name: 'newlybuildIndex3',
        component: () => import('@/views/modle/newlybuild/index3'),
        meta: { title: '新建模板无table', icon: 'msg', keepAlive: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
