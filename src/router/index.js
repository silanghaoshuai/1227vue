/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 声明使用vue插件
Vue.use(VueRouter)
/* 
解决2: 修正Vue原型上的push和replace方法 (优秀)
*/
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重新指定原型上的push方法
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  console.log('push()', location, onComplete, onAbort)
  // this是路由器对象 $router
  if (onComplete || onAbort) {
    // 让原来的push方法进行处理
    originPush.call(this, location, onComplete, onAbort)
  } else { 
    return originPush.call(this, location).catch((error) => {
      console.log('catch 到重复请求的error')
      return new Promise(() => {}) 
    })   
  }
}

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort) 
  } else {
    return originReplace.call(this, location).catch(() => {
      console.log('catch error2')
      return new Promise(() => {})
    })   
  }
}


const router = new VueRouter({
  mode: 'history', // 不带#的模式
  routes, // 配置所有路由
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }  
  }
})
// 所有需要进行登陆检查的路由路径的数组
const checkPaths = ['/trade', '/pay', '/center']  
/* a.只有登陆了, 才能查看交易/支付/个人中心界面 */
router.beforeEach((to, from, next) => { 
  const targetPath = to.path  
  // 如果目标路由是需要进行登陆检查的
  const isCheckPath = checkPaths.some(path => targetPath.indexOf(path)===0)
  if (isCheckPath) {
    // 如果已经登陆了, 放行
    if (store.state.user.userInfo.name) {
      next()
    } else { 
      next('/login?redirect=' + targetPath)
    }
  } else { 
    next()
  }
})

export default router


