import Vue from 'vue'
import Vuex from 'vuex'
import { addData, getDataDetail, getDataList, putData } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: [],
    todo_type: [],
    ui: {},
    setting: {},
    isInit: true
  },
  mutations: {
    SET_STATE (state, payload) {
      state[payload.name] = payload.value
    },
    SET_TODO (state, payload) {
      state.todo = payload
    },
    PUT_TODO (state, payload) {
      state.todo.push(payload)
    },
    SET_TODO_TYPE (state, payload) {
      state.todo_type = payload
    },
    PUT_TODO_TYPE (state, payload) {
      if (Array.isArray(payload)) {
        state.todo_type.push(...payload)
      } else {
        state.todo_type.push(payload)
      }
    },
    SET_UI (state, payload) {
      state.ui = {
        ...state.ui,
        ...payload
      }
    },
    SET_SETTING (state, payload) {
      state.setting = {
        ...state.setting,
        ...payload
      }
    },
    SET_ISINIT (state, payload) {
      state.isInit = payload
    }
  },
  actions: {
    async setDefaultStore ({ commit, dispatch }) {
      const [todo, todo_type, ui, setting] = await Promise.all([
        getDataList('todo'),
        getDataList('todo_type'),
        getDataDetail(1, 'ui'),
        getDataDetail(1, 'setting')
      ])
      commit('SET_TODO', todo)
      if (!ui) {
        // set default ui
        await dispatch('setUi', {
          size: 'default',
          sizeOption: ['large', 'samll', 'default'],
          isCircle: true
        })
      } else {
        commit('SET_UI', ui)
      }
      if (!setting) {
        // set default setting
        await dispatch('setSetting', {
          id: 1
        })
      } else {
        commit('SET_SETTING', setting)
      }
      if (todo_type.length === 0) {
        // set default todo_type
        await dispatch('addTodoType', [
          {
            id: 0,
            list: ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error']
          },
          {
            id: 1,
            type: 'primary',
            ghost: false,
            shape: undefined
          }
        ])
      } else {
        commit('SET_TODO_TYPE', todo_type)
      }
      commit('SET_ISINIT', false)
    },
    async addTodoType ({ commit }, todo_type) {
      await addData(todo_type, 'todo_type')
      commit('PUT_TODO_TYPE', todo_type)
    },
    async addTodo ({ commit }, title) {
      const todo = {
        title,
        start_time: Date.now(),
        type: 1
      }
      await addData(todo, 'todo')
      commit('PUT_TODO', todo)
    },
    async setUi ({ commit }, ui) {
      await addData(ui, 'ui')
      commit('SET_UI', ui)
    },
    async setSetting ({ commit }, setting) {
      await addData(setting, 'setting')
      commit('SET_SETTING', setting)
    },
    async setUname ({ commit, state }, uname) {
      await putData({ id: state.setting.id, uname }, 'setting')
      commit('SET_SETTING', { uname })
    }
  },
  getters: {
    uname: state => {
      console.log('setting', state.setting)
      return state.setting.uname
    }
  }
})
