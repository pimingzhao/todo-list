<!--
 * @Author: pimzh
 * @Date: 2021-11-22 09:42:44
 * @LastEditTime: 2021-11-23 11:27:52
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="home">
    <Input v-focus placeholder="请输入" v-model="title" @on-enter="handleEnter" />
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
  methods: {
    async handleEnter () {
      await this.$store.dispatch('addTodo', this.title)
      this.title = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}

</style>
