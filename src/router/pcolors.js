
const pcolorsRouter = [{
  path: 'pcolors',
  name: 'pcolors',
  component: () => import('@/views/pcolors'),
  meta: { title: '颜色管理', icon: 'tree' }
}, {
  path: 'pcolors/edit',
  component: () => import('@/views/pcolors/edit'),
  hidden: true,
  meta: { title: '修改颜色' }
},
{
  path: 'pcolors/add',
  component: () => import('@/views/pcolors/add'),
  hidden: true,
  meta: { title: '添加颜色' }
}
]
export default pcolorsRouter
