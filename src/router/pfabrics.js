
const pfabricsRouter = [{
  path: 'pfabrics',
  name: 'pfabrics',
  component: () => import('@/views/pfabrics'),
  meta: { title: '面料管理', icon: 'tree' }
}, {
  path: 'pfabrics/edit',
  component: () => import('@/views/pfabrics/edit'),
  hidden: true,
  meta: { title: '修改面料' }
},
{
  path: 'pfabrics/add',
  component: () => import('@/views/pfabrics/add'),
  hidden: true,
  meta: { title: '添加面料' }
}
]
export default pfabricsRouter
