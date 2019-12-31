
const catalogsRouter = [{
  path: 'catalogs',
  name: 'catalogs',
  component: () => import('@/views/catalogs'),
  meta: { title: '品类管理', icon: 'tree' }
}, {
  path: 'catalogs/edit',
  component: () => import('@/views/catalogs/edit'),
  hidden: true,
  meta: { title: '修改品类' }
},
{
  path: 'catalogs/add',
  component: () => import('@/views/catalogs/add'),
  hidden: true,
  meta: { title: '添加品类' }
}
]
export default catalogsRouter
