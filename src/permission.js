import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/util/auth'

NProgress.configure({showSpinner: false});

//权限过滤
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true;
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

//权限白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start();
  //登录验证
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done();
    } else {

      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again')
            next({path: '/login'})
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({path: '/401', replace: true, query: {noGoBack: true}})
        }
        // 可删 ↑
      }
    }
  } else {
    // 未登录,白名单验证
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
