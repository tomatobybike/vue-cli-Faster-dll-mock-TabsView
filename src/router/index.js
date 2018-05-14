import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {path: '/401', component: () => import('@/views/401'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {title: '公告', icon: 'dashboard'}
    }]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    name: 'hello',
    meta: {title: 'hello', icon: 'rule', roles: ['admin', 'editor']},
    children: [
      {
        path: 'hello',
        name: 'Kickerteam',
        component: resolve => require(['@/views/kickerteam/index'], resolve),
        meta: {title: '瓦伦西亚', icon: 'kickerteam', roles: ['admin', 'editor']}
      }
    ]
  },
  {
    path: '/kicker',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'noredirect',
    name: 'regulation',
    meta: {title: '踢球者', icon: 'rule'},
    children: [
      {
        path: 'kickerteam',
        name: 'Kickerteam',
        component: resolve => require(['@/views/kickerteam/index'], resolve),
        meta: {title: '球队1', icon: 'kickerteam', roles: ['admin', 'editor']}
      },
      {
        path: 'hotspots',
        name: 'Hotspots',
        component: resolve => require(['@/views/rule/hotSpots/index'], resolve),
        meta: {title: '球员1', icon: 'hotspots'}
      },
      {
        path: 'table',
        name: 'Table',
        component: resolve => require(['@/views/table/index'], resolve),
        meta: {title: '表格1', icon: 'table'}
      },
      {
        path: 'table2',
        name: 'Table2',
        component: resolve => require(['@/views/table/table2'], resolve),
        meta: {title: '表格21', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: '树1', icon: 'tree'}
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'sys',
    meta: {title: '系统管理', icon: 'rule'},
    children: [
      {
        path: 'user',
        name: 'User',
        component: resolve => require(['@/views/sys/user/index'], resolve),
        meta: {title: '用户', icon: 'kickerteam'}
      },
      {
        path: 'group',
        name: 'group',
        component: resolve => require(['@/views/sys/group/index'], resolve),
        meta: {title: '用户组', icon: 'kickerteam'}
      },
      {
        path: 'menu',
        name: 'Menu',
        component: resolve => require(['@/views/sys/menu/index'], resolve),
        meta: {title: '系统菜单', icon: 'hotspots'}
      }
    ]
  },
  {
    path: '/other',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form'}
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{path: 'log', component: resolve => require(['@/views/errorLog/index'], resolve), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  }
]

export const notExitMap = [
  { path: '*', redirect: '/404', hidden: true }
]

console.warn('asyncRouterMap', asyncRouterMap)
