
import Layout from '@/layout'

const inventoriesRouter = {
  path: '/inventories',
  name: 'inventories',
  redirect: '/inventories/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'inventories',
    component: () => import('@/views/inventories'),
    meta: { title: '库存管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/inventories/edit'),
    hidden: true,
    meta: { title: '修改库存' }
  },
  {
    path: 'add',
    component: () => import('@/views/inventories/add'),
    hidden: true,
    meta: { title: '添加库存' }
  }
  ]
}

export default inventoriesRouter
