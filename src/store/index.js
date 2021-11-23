import Vue from 'vue'
import Vuex from 'vuex'
import { addData, getDataDetail, getDataList, putData } from '../utils'
import { postTodo } from '@/api/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: null,
    todo_type: null,
    ui: null,
    setting: null,
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
    SET_UI (state, payload) {
      state.ui = payload
    },
    SET_SETTING (state, payload) {
      state.setting = payload
    },
    SET_UNAME (state, payload) {
      state.setting.uname = payload
    },
    SET_ISINIT (state, payload) {
      state.isInit = payload
    }
  },
  actions: {
    async setDefaultStore ({ commit }) {
      const [todo, todo_type, ui, setting] = await Promise.all([
        getDataList('todo'),
        getDataList('todo_type'),
        getDataDetail(1, 'ui'),
        getDataDetail(1, 'setting')
      ])
      commit('SET_TODO', todo)
      commit('SET_TODO_TYPE', todo_type)
      commit('SET_UI', ui)
      commit('SET_SETTING', setting)
      commit('SET_ISINIT', false)
    },
    async addTodo ({ commit }, title) {
      const todo = {
        title,
        start_time: Date.now(),
        type: 1
      }
      await postTodo(todo)
      commit('PUT_TODO', todo)
    },
    async setUname ({ commit, state }, uname) {
      if (state.setting.id) {
        await putData({ id: state.setting.id, uname }, 'setting')
      } else {
        await addData({ id: 1, uname }, 'setting')
        commit('SET_UNAME', uname)
      }
    }
  }
})
