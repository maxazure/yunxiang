import Layout from '@/layout'

const psizesRouter = {
  path: '/psizes',
  name: 'psizes',
  redirect: '/psizes/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'psizes',
    component: () => import('@/views/psizes'),
    meta: { title: '尺码管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/psizes/edit'),
    hidden: true,
    meta: { title: '修改尺码' }
  },
  {
    path: 'add',
    component: () => import('@/views/psizes/add'),
    hidden: true,
    meta: { title: '添加尺码' }
  }
  ]
}
export default psizesRouter
