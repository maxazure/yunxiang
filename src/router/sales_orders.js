import Layout from '@/layout'

const sales_ordersRouter = {
  path: '/sales_orders',
  name: 'sales_orders',
  redirect: '/sales_orders/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'sales_orders',
    component: () => import('@/views/sales_orders'),
    meta: { title: '销售订单管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/sales_orders/edit'),
    hidden: true,
    meta: { title: '修改销售订单' }
  },
  {
    path: 'add',
    component: () => import('@/views/sales_orders/add'),
    hidden: true,
    meta: { title: '添加销售订单' }
  }
  ]
}
export default sales_ordersRouter
