
const productsRouter = [{
  path: 'products',
  name: 'products',
  component: () => import('@/views/products'),
  meta: { title: '产品信息管理', icon: 'tree' }
}, {
  path: 'products/edit',
  component: () => import('@/views/products/edit'),
  hidden: true,
  meta: { title: '修改产品信息' }
},
{
  path: 'products/add',
  component: () => import('@/views/products/add'),
  hidden: true,
  meta: { title: '添加产品信息' }
}
]
export default productsRouter
