import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  if (store.state.isInit) {
    await store.dispatch('setDefaultStore')
  }
  // first step
  if (!store.getters.uname) {
    if (to.path === '/uname') {
      next()
      return
    }
    next('/uname')
    return
  } else if (to.path === '/uname') {
    next('/')
  }
  next()
})
