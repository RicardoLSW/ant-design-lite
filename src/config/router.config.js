// eslint-disable-next-line no-unused-vars
import { BasicLayout, RouteView } from '../layouts'

export const asyncRouterMap = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/ele-list/elevators',
    meta: { title: '首页' },
    children: [
      {
        path: 'ele-list',
        name: 'EleList',
        component: RouteView,
        meta: { title: '电梯清单管理', permission: ['REMES_SYSTEM_MANAGER', 'MNT_EUP_ADMIN'] },
        children: [
          {
            path: 'elevators',
            name: 'Elevators',
            component: () => import('../views/HelloWorld'),
            meta: { title: '制动器整改记录', permission: ['REMES_SYSTEM_MANAGER', 'MNT_EUP_ADMIN'] }
          }
        ]
      },
      {
        path: 'branch-ele-list',
        name: 'BranchEleList',
        component: RouteView,
        meta: { title: '分公司电梯清单', permission: ['MSIS_BRANCH_MAINTENANCE_MGR'] },
        children: [
          {
            path: 'branch-elevators',
            name: 'BranchElevators',
            component: () => import('../views/BranchList'),
            meta: { title: '制动器整改记录', permission: ['MSIS_BRANCH_MAINTENANCE_MGR'] }
          }
        ]
      },
      {
        path: 'record',
        name: 'Record',
        hidden: true,
        component: () => import('../views/Record'),
        meta: {
          title: '整改记录',
          permission: ['REMES_SYSTEM_MANAGER', 'MNT_EUP_ADMIN', 'MSIS_BRANCH_MAINTENANCE_MGR']
        }
      }
    ]
  }
]

export const constantRouterMap = []
