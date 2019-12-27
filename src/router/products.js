import Layout from '@/layout'

const productsRouter = {
  path: '/products',
  name: 'products',
  redirect: '/products/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'products',
    component: () => import('@/views/products'),
    meta: { title: '产品信息管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/products/edit'),
    hidden: true,
    meta: { title: '修改产品信息' }
  },
  {
    path: 'add',
    component: () => import('@/views/products/add'),
    hidden: true,
    meta: { title: '添加产品信息' }
  }
  ]
}
export default productsRouter
