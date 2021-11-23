import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  if (store.state.isInit) {
    await store.dispatch('setDefaultStore')
  }
  // first step
  if (!store.state.setting?.uname) {
    if (to.path === '/uname') {
      next()
      return
    }
    next('/uname')
    return
  }
  next()
})
