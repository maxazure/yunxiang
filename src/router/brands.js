

const brandsRouter = [{
    path: 'brands',
    name: 'brands',
    component: () => import('@/views/brands'),
    meta: { title: '品牌管理', icon: 'tree' }
  }, {
    path: 'brands/edit',
    component: () => import('@/views/brands/edit'),
    hidden: true,
    meta: { title: '修改品牌' }
  },
    {
      path: 'brands/add',
      component: () => import('@/views/brands/add'),
      hidden: true,
      meta: { title: '添加品牌' }
    }
  ]


export default brandsRouter
