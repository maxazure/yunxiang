import Layout from '@/layout'

const pcolorsRouter = {
  path: '/pcolors',
  name: 'pcolors',
  redirect: '/pcolors/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'pcolors',
    component: () => import('@/views/pcolors'),
    meta: { title: '颜色管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/pcolors/edit'),
    hidden: true,
    meta: { title: '修改颜色' }
  },
  {
    path: 'add',
    component: () => import('@/views/pcolors/add'),
    hidden: true,
    meta: { title: '添加颜色' }
  }
  ]
}
export default pcolorsRouter
