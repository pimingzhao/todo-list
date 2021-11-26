import Vue from 'vue'
import Vuex from 'vuex'
import { addData, delData, getDataDetail, getDataList, putData } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: [],
    todoType: [],
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
      state.todoType = payload
    },
    ADD_TODO_TYPE (state, payload) {
      if (Array.isArray(payload)) {
        state.todoType.push(...payload)
      } else {
        state.todoType.push(payload)
      }
    },
    EDIT_TODO_TYPE (state, payload) {
      const finder = state.todoType.find(item => item.id === payload.id)
      Object.keys(payload).forEach(k => {
        finder[k] = payload[k]
      })
    },
    DEL_TODO_TYPE (state, payload) {
      const i = state.todoType.findIndex(item => item.id === payload)
      i !== -1 && state.todoType.splice(i, 1)
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
      const [todo, todoType, ui, setting] = await Promise.all([
        getDataList('todo'),
        getDataList('todoType'),
        getDataDetail(1, 'ui'),
        getDataDetail(1, 'setting')
      ])
      commit('SET_TODO', todo)
      if (!ui) {
        // set default ui
        await dispatch('setUi', {
          id: 1,
          size: 'default',
          sizeOption: ['small', 'default', 'large']
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
        commit('SET_TODO_TYPE', todoType)
      }
      commit('SET_ISINIT', false)
    },
    async addTodoType ({ commit }, todoType) {
      const res = await addData(todoType, 'todoType')
      if (!Array.isArray(res)) {
        todoType.id = res
      }
      commit('ADD_TODO_TYPE', todoType)
    },
    async editTodoType ({ commit }, todoType) {
      await putData(todoType, 'todoType')
      commit('EDIT_TODO_TYPE', todoType)
    },
    async delTodoType ({ commit }, { id }) {
      await delData(id, 'todoType')
      commit('DEL_TODO_TYPE', id)
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
    async setUi ({ commit, state }, ui) {
      if (!ui.id) {
        await putData({ ...state.ui, ...ui }, 'ui')
      } else {
        await addData(ui, 'ui')
      }
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
    uname: state => state.setting.uname,
    size: state => state.ui.size
  }
})
