<!--
 * @Author: pimzh
 * @Date: 2021-11-22 09:42:44
 * @LastEditTime: 2021-11-26 09:36:02
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="todo">
    <h1>Hi {{ uname }}, what you want to do today?</h1>
    <Input v-focus placeholder="请输入" v-model.trim="title" :size="size" @on-enter="handleEnter" />
    <ul>
      <li
        v-for="item in list"
        :key="item.comp"
        @click="() => currentComp = item.comp"
      >{{ item.label }}</li>
    </ul>
    <component :is="currentComp" />
  </div>
</template>

<script>
import focus from '@/views/directives/focus'
import TodoToday from './components/TodoToday'
import Done from './components/Done'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TodoToday,
    Done
  },
  directives: { focus },
  data () {
    return {
      title: '',
      list: [
        {
          label: 'todo today',
          comp: 'todo-today'
        },
        {
          label: 'done',
          comp: 'done'
        }
      ],
      currentComp: 'todo-today'
    }
  },
  computed: {
    ...mapGetters(['uname', 'size'])
  },
  methods: {
    async handleEnter () {
      if (!this.title) {
        this.$Message.warning('todo can not be empty')
        return
      }
      await this.$store.dispatch('addTodo', { title: this.title })
      this.title = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
