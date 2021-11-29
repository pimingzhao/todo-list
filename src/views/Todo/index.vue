<!--
 * @Author: pimzh
 * @Date: 2021-11-22 09:42:44
 * @LastEditTime: 2021-11-29 14:32:50
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="todo">
    <h1>Hi {{ uname }}, what you want to do today?</h1><br/>
    <Input v-focus placeholder="请输入" v-model.trim="title" :size="size" @on-enter="handleEnter" />
    <todo-today />
    <!-- todo modal -->
    <modal-todo ref="todo" />
  </div>
</template>

<script>
import focus from '@/views/directives/focus'
import TodoToday from './components/TodoToday'
import ModalTodo from './components/ModalTodo'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: { TodoToday, ModalTodo },
  directives: { focus },
  data () {
    return {
      title: ''
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
      this.$Modal.confirm({
        title: '是否需要更细致化的定义任务？',
        onOk: () => {
          this.$refs.todo.handleShow({ title: this.title })
          this.title = ''
        },
        onCancel: () => {
          this.$store.dispatch('addTodo', { title: this.title })
          this.title = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
