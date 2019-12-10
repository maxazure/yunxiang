{
  path: '<%= @brick[:name_plural]%>',
  name: '<%= @brick[:name_plural]%>',
  component: () => import('@/views/management/<%= @brick[:name_plural]%>'),
  meta: { title: '<%= @brick[:cnname]%>管理' }
},
{
  path: '<%= @brick[:name_plural]%>/edit',
  component: () => import('@/views/management/<%= @brick[:name_plural]%>/edit'),
  hidden: true,
  meta: { title: '修改<%= @brick[:cnname]%>' }
},
{
  path: '<%= @brick[:name_plural]%>/add',
  component: () => import('@/views/management/<%= @brick[:name_plural]%>/add'),
  hidden: true,
  meta: { title: '添加<%= @brick[:cnname]%>' }
},
