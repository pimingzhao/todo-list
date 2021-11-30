import Vue from 'vue'
import Vuex from 'vuex'
import { addData, delData, getDataDetail, getDataList, putData } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    ui: {},
    user: {},
    search: [],
    weather: {},
    time: {},
    namespace: [],
    isInit: true
  },
  mutations: {
    SET_STATE (state, payload) {
      Object.keys(payload).forEach(k => { state[k] = payload[k] })
    },
    PUSH_STATE (state, payload) {
      Object.keys(payload).forEach(k => { state[k].push(payload[k]) })
    },
    ASSIGN_STATE (state, payload) {
      state[payload.k] = Array.isArray(payload.v)
        ? [
          ...state[payload.k],
          ...payload.v
        ] : {
          ...state[payload.k],
          ...payload.v
        }
    },
    EDIT_ARR_STATE (state, payload) {
      const finder = state[payload.k].find(item => item.id === payload.v.id)
      Object.keys(payload.v).forEach(k => {
        finder[k] = payload.v[k]
      })
    },
    DEL_ARR_STATE (state, payload) {
      const i = state[payload.k].findIndex(item => item.id === payload.v)
      i !== -1 && state[payload.k].splice(i, 1)
    },
    SET_ISINIT (state, payload) {
      state.isInit = payload
    },
    EDIT_SEARCH (state, payload) {
      Vue.set(state.search, payload.i, payload.v)
    }
  },
  actions: {
    async setDefaultStore ({ commit, dispatch }) {
      const [tags, ui, user, search, weather, time, namespace] = await Promise.all([
        getDataList('tags'),
        getDataDetail(1, 'ui'),
        getDataDetail(1, 'user'),
        getDataList('search'),
        getDataDetail(1, 'weather'),
        getDataDetail(1, 'time'),
        getDataList('namespace')
      ])
      if (!ui) {
        // set default ui
        await dispatch('assignState', {
          k: 'ui',
          v: {
            id: 1,
            size: 'default',
            sizeOption: ['small', 'default', 'large'],
            showSearch: true,
            showWeather: true,
            showTime: true
          }
        })
      } else {
        commit('SET_STATE', { ui })
      }
      if (!user) {
        // set default user
        await dispatch('assignState', {
          k: 'user',
          v: { id: 1 }
        })
      } else {
        commit('SET_STATE', { user })
      }
      if (tags.length === 0) {
        // set default tags
        await dispatch('addArrState', {
          k: 'tags',
          v: [
            {
              id: 0,
              color: ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'],
              size: ['default', 'medium', 'large'],
              type: ['unset', 'border', 'dot']
            },
            {
              id: 1,
              type: 'unset',
              color: 'default',
              size: 'default',
              label: 'today',
              sort: 1
            }
          ]
        })
      } else {
        commit('SET_STATE', { tags })
      }
      if (search.length === 0) {
        await dispatch('addArrState', {
          k: 'search',
          v: [
            {
              id: 1,
              logo: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
              label: '百度',
              url: 'https://baidu.com/s?wd=',
              selected: true
            },
            {
              id: 2,
              logo: 'https://dlweb.sogoucdn.com/pcsearch/web/index/images/logo_150x58_0192f43.png',
              label: '搜狗',
              url: 'https://www.sogou.com/web?query=',
              selected: false
            }
          ]
        })
      } else {
        commit('SET_STATE', { search })
      }
      if (!weather) {
        await dispatch('assignState', {
          k: 'weather',
          v: {
            id: 1,
            url: 'https://baidu.com'
          }
        })
      } else {
        commit('SET_STATE', { weather })
      }
      if (!time) {
        await dispatch('assignState', {
          k: 'time',
          v: {
            id: 1,
            format: 'yyyy 年 MM 月 dd 日 星期W HH 时 mm 分 ss 秒'
          }
        })
      } else {
        commit('SET_STATE', { time })
      }
      if (namespace.length === 0) {
        // set default namespace
        await dispatch('addArrState', {
          k: 'namespace',
          v: [
            {
              id: 1,
              label: 'todo-today',
              show: true
            },
            {
              id: 2,
              label: 'done',
              show: true
            }
          ]
        })
      } else {
        commit('SET_STATE', { namespace })
      }
      commit('SET_ISINIT', false)
    },
    async delTodoType ({ commit }, { id }) {
      await delData(id, 'tags')
      commit('DEL_ARR_STATE', { k: 'tags', v: id })
    },
    async setSearchSelected ({ commit, state }, id) {
      const oldI = state.search.findIndex(item => !!item.selected)
      const old = { ...state.search[oldI] }
      old.selected = false
      const newI = state.search.findIndex(item => item.id === id)
      const now = { ...state.search[newI] }
      now.selected = true
      await Promise.all([
        putData(old, 'search'),
        putData(now, 'search')
      ])
      commit('EDIT_SEARCH', { i: oldI, v: old })
      commit('EDIT_SEARCH', { i: newI, v: now })
    },
    async editSearch ({ commit, dispatch }, search) {
      if (!search.id) {
        delete search.id
        const id = await addData(search, 'search')
        search.id = id
        commit('PUSH_STATE', { search })
        return id
      } else {
        await dispatch('editArrState', { k: 'search', v: search })
      }
    },
    async editNamespace ({ commit, dispatch }, namespace) {
      if (!namespace.id) {
        delete namespace.id
        const id = await addData(namespace, 'namespace')
        namespace.id = id
        commit('PUSH_STATE', { namespace })
        return id
      } else {
        await dispatch('editArrState', { k: 'namespace', v: namespace })
      }
    },
    async assignState ({ commit, state }, { k, v }) {
      if (!v.id) {
        await putData({ ...state[k], ...v }, k)
      } else {
        await addData(v, k)
      }
      commit('ASSIGN_STATE', { k, v })
    },
    async editArrState ({ commit }, { k, v }) {
      await putData(v, k)
      commit('EDIT_ARR_STATE', { k, v })
    },
    async addArrState ({ commit }, { k, v }) {
      const res = await addData(v, k)
      if (!Array.isArray(res)) {
        v.id = res
        commit('PUSH_STATE', { [k]: v })
      } else {
        commit('ASSIGN_STATE', { k, v })
      }
    },
    async delArrState ({ commit }, { k, v }) {
      await delData(v, k)
      commit('DEL_ARR_STATE', { k, v })
    }
  },
  getters: {
    uname: state => state.user.uname,
    size: state => state.ui.size,
    namespaceMap: state => {
      const obj = Object.create(null)
      state.namespace.forEach(item => { obj[item.id] = item })
      return obj
    },
    tagsMap: state => {
      const obj = Object.create(null)
      state.tags.forEach(item => { obj[item.id] = item })
      return obj
    }
  }
})
