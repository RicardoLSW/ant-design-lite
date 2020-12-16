// eslint-disable-next-line no-unused-vars
import { BasicLayout, RouteView, TabsView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/hello-world',
    meta: { title: '首页' },
    children: [
      {
        path: 'hello-world',
        name: 'helloWorld',
        component: () => import('@/views/HelloWorld'),
        meta: { title: 'HelloWorld' }
      }
    ]
  }
]
