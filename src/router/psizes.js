
const psizesRouter =
 [{
   path: 'psizes',
   name: 'psizes',
   component: () => import('@/views/psizes'),
   meta: { title: '尺码管理', icon: 'tree' }
 }, {
   path: 'psizes/edit',
   component: () => import('@/views/psizes/edit'),
   hidden: true,
   meta: { title: '修改尺码' }
 },
 {
   path: 'psizes/add',
   component: () => import('@/views/psizes/add'),
   hidden: true,
   meta: { title: '添加尺码' }
 }
 ]

export default psizesRouter
