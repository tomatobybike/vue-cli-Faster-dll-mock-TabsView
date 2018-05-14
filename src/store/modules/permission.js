import { asyncRouterMap, constantRouterMap, notExitMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission (roles, route) {
//   if (route.meta && route.meta.roles) {
//     return true // roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, owerMenus) {
  console.log('====================')
  console.log('asyncRouterMap', asyncRouterMap)
  console.log('owerMenus', owerMenus)
  const lastMenus = []
  for (let item of owerMenus) {
    for (let i of asyncRouterMap) {
      if (item.name && item.name === i.name) {
        var that = Object.assign({}, item, i)
        if (item.meta) {
          that.meta.title = item.meta.title
        }
        that.path = item.path
        console.log('that', that, i)
        if (that.children && that.children.length) {
          that.children = filterAsyncRouter(i.children, item.children)
        }
        lastMenus.push(that)
      }
    }
  }
/*  const lastMenus = owerMenus.filter(item => {
    asyncRouterMap.filter(i => {
      if (item.name === asyncRouterMap.name) {

      }
    })
  }) */
  console.log('lastMenus', lastMenus)
  // for (var a = 0; a < owerMenus.length; a++) {
  //   for (var b = 0; b < asyncRouterMap.length; b++) {
  //     if (owerMenus[a].name === asyncRouterMap[b].name) {
  //       owerMenus[a] = Object.assign({}, owerMenus[a], asyncRouterMap[b])
  //     }
  //   }
  //   if (owerMenus[a].children && route.owerMenus.length) {
  //     owerMenus[a].children = filterAsyncRouter(asyncRouterMap, owerMenus[a].children)
  //   }
  // }
  // const accessedRouters = owerMenus.filter(route => {
  //   route.
  //   if (route.children && route.children.length) {
  //     route.children = filterAsyncRouter(route.children, owerMenus)
  //   }
  // })
  return lastMenus
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { userData } = data
        console.log('userData', userData)
        let accessedRouters
        if (userData.roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, userData.owerMenus)
        }
        accessedRouters = accessedRouters.concat(notExitMap)
        console.log('accessedRouters xxxx', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
