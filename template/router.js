import Layout from '@/layout'

const <%= @brick[:name_plural]%>Router = {
  path: '/<%= @brick[:name_plural]%>',
  name: '<%= @brick[:name_plural]%>',
  redirect: '/<%= @brick[:name_plural]%>/index',
  component: Layout,
  children: [{
    path: 'index',
    name: '<%= @brick[:name_plural]%>',
    component: () => import('@/views/<%= @brick[:name_plural]%>'),
    meta: { title: '<%= @brick[:cnname]%>管理', icon: 'tree' }
  }, {
    path: 'edit',
    component: () => import('@/views/<%= @brick[:name_plural]%>/edit'),
    hidden: true,
    meta: { title: '修改<%= @brick[:cnname]%>' }
  },
    {
      path: 'add',
      component: () => import('@/views/<%= @brick[:name_plural]%>/add'),
      hidden: true,
      meta: { title: '添加<%= @brick[:cnname]%>' }
    }
  ]
}
export default <%= @brick[:name_plural]%>Router
