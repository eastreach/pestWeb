import {asyncRouterMap, constantRouterMap} from '@/router'
import store from '@/store'

/**
 * 菜单权限判断
 */
function hasPermission(route) {
  if (store.state.tzdOperator.account === 'root') {
    return true;
  }
  if (!route.activity || route.activity.length === 0) {
    return true;
  }
  if (store.state.tzdOperator.code === 'root') {
    return true;
  } else {
    route.flag = 0;
  }
  return route.flag === 1;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles} = data;
        commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, roles));
        resolve()
      })
    }
  }
};

export default permission
