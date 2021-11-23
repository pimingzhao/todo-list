import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  if (store.state.isInit) {
    await store.dispatch('setDefaultStore')
  }

  next()
})
