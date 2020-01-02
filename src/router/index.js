import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import catalogsRouter from '@/router/catalogs'
import inventoriesRouter from '@/router/inventories'
import productsRouter from '@/router/products'
import sales_ordersRouter from '@/router/sales_orders'
import colorsRouter from '@/router/pcolors'
import sizesRouter from '@/router/psizes'
import fabricsRouter from '@/router/pfabrics'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/test',
    component: () => import('@/views/test/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/pos',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Pos',
      component: () => import('@/views/pos/index'),
      meta: { title: '收银台', icon: 'example' }
    }]
  },

  {
    path: '/warehouse',
    name: 'warehouse',
    component: Layout,
    redirect: '/warehouse/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'warehouse',
        component: () => import('@/views/warehouse'),
        meta: { title: '入库', icon: 'tree' }
      }]
  },
  inventoriesRouter,
  sales_ordersRouter,

  {
    path: '/members',
    name: 'members',
    redirect: '/members/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'members',
      component: () => import('@/views/members'),
      meta: { title: '会员管理', icon: 'tree' }
    }, {
      path: 'edit',
      component: () => import('@/views/members/edit'),
      hidden: true,
      meta: { title: '修改会员' }
    },
    {
      path: 'add',
      component: () => import('@/views/members/add'),
      hidden: true,
      meta: { title: '添加会员' }
    }
    ]
  },
  {
    path: '/infoManagement',
    component: Layout,
    meta: { title: '信息管理', icon: 'tab' },
    children: [
      ...productsRouter,
      ...catalogsRouter,
      ...colorsRouter,
      ...sizesRouter,
      ...fabricsRouter
    ]
  },
  {
    path: '/management',
    component: Layout,
    meta: { title: '系统管理', icon: 'tab' },
    children: [{
      path: 'users',
      name: 'Users',
      component: () => import('@/views/management/users'),
      meta: { title: '用户管理' }
    },
    {
      path: 'users/edit',
      component: () => import('@/views/management/users/edit'),
      hidden: true,
      meta: { title: '修改' }
    },
    {
      path: 'users/add',
      component: () => import('@/views/management/users/add'),
      hidden: true,
      meta: { title: '新用户' }
    },
    {
      path: 'companies',
      name: 'Companies',
      component: () => import('@/views/management/companies'),
      meta: { title: '公司管理' }
    },
    {
      path: 'companies/edit',
      component: () => import('@/views/management/companies/edit'),
      hidden: true,
      meta: { title: '修改' }
    },
    {
      path: 'companies/add',
      component: () => import('@/views/management/companies/add'),
      hidden: true,
      meta: { title: '添加' }
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('@/views/management/roles'),
      meta: { title: '角色管理' }
    },
    {
      path: 'roles/edit',
      component: () => import('@/views/management/roles/edit'),
      hidden: true,
      meta: { title: '修改' }
    },
    {
      path: 'roles/add',
      component: () => import('@/views/management/roles/add'),
      hidden: true,
      meta: { title: '添加' }
    }
    ]

  },

  {
    path: '/sitting',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Sitting',
      component: () => import('@/views/members/index'),
      meta: { title: '设置', icon: 'tab' }
    }]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
