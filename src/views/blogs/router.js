{
    path: 'blogs',
    name: 'blogs',
    component: () => import('@/views/blogs'),
    meta: { title: '文章表1管理' }
  },
  {
    path: 'blogs/edit',
    component: () => import('@/views/blogs/edit'),
    hidden: true,
    meta: { title: '修改' }
  },
  {
    path: 'blogs/add',
    component: () => import('@/views/blogs/add'),
    hidden: true,
    meta: { title: '添加' }
  }