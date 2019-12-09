{
    path: 'members',
    name: 'members',
    component: () => import('@/views/members'),
    meta: { title: '会员表管理' }
  },
  {
    path: 'members/edit',
    component: () => import('@/views/members/edit'),
    hidden: true,
    meta: { title: '修改' }
  },
  {
    path: 'members/add',
    component: () => import('@/views/members/add'),
    hidden: true,
    meta: { title: '添加' }
  }