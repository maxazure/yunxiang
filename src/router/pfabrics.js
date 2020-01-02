import Layout from '@/layout'

const pfabricsRouter = {
  path: '/pfabrics',
  name: 'pfabrics',
  redirect: '/pfabrics/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'pfabrics',
    component: () => import('@/views/pfabrics'),
    meta: { title: '面料管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/pfabrics/edit'),
    hidden: true,
    meta: { title: '修改面料' }
  },
  {
    path: 'add',
    component: () => import('@/views/pfabrics/add'),
    hidden: true,
    meta: { title: '添加面料' }
  }
  ]
}
export default pfabricsRouter
