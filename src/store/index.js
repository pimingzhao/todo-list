import Vue from 'vue'
import Vuex from 'vuex'
import { addData, delData, getDataDetail, getDataList, putData } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: [],
    todoType: [],
    ui: {},
    user: {},
    search: [],
    weather: {},
    time: {},
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
      Object.keys(payload).forEach(k => {
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
      const [todo, todoType, ui, user, search, weather, time] = await Promise.all([
        getDataList('todo'),
        getDataList('todoType'),
        getDataDetail(1, 'ui'),
        getDataDetail(1, 'user'),
        getDataList('search'),
        getDataDetail(1, 'weather'),
        getDataDetail(1, 'time')
      ])
      commit('SET_STATE', { todo })
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
      if (todoType.length === 0) {
        // set default todoType
        await dispatch('addTodoType', [
          {
            id: 0,
            list: ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error']
          },
          {
            id: 1,
            type: 'primary',
            ghost: false,
            shape: false,
            label: 'today',
            sort: 1
          }
        ])
      } else {
        commit('SET_STATE', { todoType })
      }
      if (search.length === 0) {
        await dispatch('addSearch', [
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
        ])
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
      commit('SET_ISINIT', false)
    },
    async addTodoType ({ commit }, todoType) {
      const res = await addData(todoType, 'todoType')
      if (!Array.isArray(res)) {
        todoType.id = res
        commit('PUSH_STATE', { todoType })
      } else {
        commit('ASSIGN_STATE', {
          k: 'todoType',
          v: todoType
        })
      }
    },
    async editTodoType ({ commit }, todoType) {
      await putData(todoType, 'todoType')
      commit('EDIT_ARR_STATE', { k: 'todoType', v: todoType })
    },
    async delTodoType ({ commit }, { id }) {
      await delData(id, 'todoType')
      commit('DEL_ARR_STATE', { k: 'todoType', v: id })
    },
    async addTodo ({ commit }, { title, type = 1 }) {
      const todo = {
        title,
        start_time: Date.now(),
        type
      }
      todo.id = await addData(todo, 'todo')
      commit('PUSH_STATE', { todo })
    },
    async addSearch ({ commit }, search) {
      const res = await addData(search, 'search')
      if (!Array.isArray(res)) {
        search.id = res
        commit('PUSH_STATE', { search })
      } else {
        commit('ASSIGN_STATE', {
          k: 'search',
          v: search
        })
      }
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
    async editSearch ({ commit }, search) {
      if (!search.id) {
        const id = await addData(search, 'search')
        search.id = id
        commit('PUSH_STATE', { search })
        return id
      } else {
        await putData(search)
        commit('EDIT_ARR_STATE', { k: 'search', v: search })
      }
    },
    async delSearch ({ commit }, { id }) {
      await delData(id, 'search')
      commit('DEL_ARR_STATE', { k: 'search', v: id })
    },
    async assignState ({ commit, state }, { k, v }) {
      if (!v.id) {
        await putData({ ...state[k], ...v }, k)
      } else {
        await addData(v, k)
      }
      commit('ASSIGN_STATE', { k, v })
    }
  },
  getters: {
    uname: state => state.user.uname,
    size: state => state.ui.size
  }
})
