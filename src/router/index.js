import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
      component: () => import('@/views/members/index'),
      meta: { title: '收银台', icon: 'example' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'members',
      name: 'Members',
      component: () => import('@/views/members/index'),
      meta: { title: '会员管理', icon: 'people' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'seeking',
        name: 'Seeking',
        component: () => import('@/views/members/index'),
        meta: { title: '顾客要货', icon: 'form' }
      }]
  },



  {
    path: '/distribution',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Distribution',
      component: () => import('@/views/members/index'),
      meta: { title: '导购分销', icon: 'tree' }
    }]
  },

  {
    path: '/production',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Production',
      component: () => import('@/views/members/index'),
      meta: { title: '门店理货', icon: 'nested' }
    }]
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

  {
    path: '/',
    component: Layout,
    children: [{
      path: '/yunxiang',
      name: 'Yunxiang',
      component: () => import('@/views/members/index'),
      meta: { title: '云想尖货', suffixicon: 'el-icon-star-on' }
    }]
  },

  {
    path: '/',
    component: Layout,
    children: [{
      path: '/plugin',
      name: 'Plugin',
      component: () => import('@/views/members/index'),
      meta: { title: '百宝箱', suffixicon: 'el-icon-star-on' }
    }]
  },

  {
    path: '/management',
    component: Layout,
    meta: { title: '后台管理', icon: 'tab' },
    children: [{
      path: '/users',
      name: 'Users',
      component: () => import('@/views/management/users'),
      meta: { title: '用户管理', suffixicon: 'el-icon-star-on' }
    }, {
      path: '/user2',
      name: 'User2',
      component: () => import('@/views/management/users2'),
      meta: { title: '用户管理2', suffixicon: 'el-icon-star-on' }
    }
    ]
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
