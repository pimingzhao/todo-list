<!--
 * @Author: pimzh
 * @Date: 2021-11-22 09:42:44
 * @LastEditTime: 2021-12-03 13:27:24
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="todo">
    <h1>Hi <Input ref="uname" v-if="isEdit" v-model="username" style="width: 120px;" class="uname" :size="size" @on-blur="editName" @on-enter="editName" /><span v-else @dblclick="handleDbClick">{{ uname }}</span>, what you want to do today?</h1><br/>
    <Input
      v-focus
      placeholder="请输入"
      v-model.trim="title"
      :size="size"
      @on-enter="handleEnter"
    >
      <Button slot="append" icon="md-add" :size="size" @click="handleEnter"></Button>
    </Input>
    <div class="todo-header flex justify-between items-center">
      <ul>
        <li
          v-for="(item, i) in status"
          :key="i"
          class="inline-block cursor-pointer"
          :class="{
            'active text-lg font-bold text-primary': item.value === active,
            'text-md': item.value !== active
          }"
          @click="() => active = item.value"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <router-link tag="a" class="text-primary" to="/todolist">更多 >></router-link>
    </div>
    <todo-today :isDone="active === 'done'" :data="todoToday" :handleDel="handleDel" @on-edit="handleEdit" @on-save="handleSave" />
    <!-- todo modal -->
    <modal-todo ref="todo" :save="handleSave" />
  </div>
</template>

<script>
import focus from '@/views/directives/focus'
import TodoToday from './components/TodoToday'
import ModalTodo from './components/ModalTodo'
import { mapGetters } from 'vuex'

import { addTodo, editTodo, getTodoList, delTodo } from '@/api/todo'
export default {
  name: 'Home',
  components: { TodoToday, ModalTodo },
  directives: { focus },
  data () {
    return {
      title: '',
      isEdit: false,
      username: '',
      todoToday: [],
      active: 'do',
      status: [
        {
          label: '进行中',
          value: 'do'
        },
        {
          label: '已完成',
          value: 'done'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['uname', 'size'])
  },
  created () {
    this.getTodoToday()
  },
  methods: {
    getTime (days = 0) {
      const time = new Date()
      time.setHours(0, 0, 0, 0)
      if (days) {
        const day = time.getDate()
        time.setDate(day - days)
      }
      return time.getTime()
    },
    async getTodoToday () {
      this.todoToday = await getTodoList({ start_time: this.getTime() })
    },
    async handleEnter () {
      if (!this.title) {
        this.$Message.warning('todo can not be empty')
        return
      }
      this.$Modal.confirm({
        title: '是否需要更细致化的定义任务？',
        onOk: () => this.handleEdit({ title: this.title }),
        onCancel: async () => {
          await addTodo({ title: this.title })
          this.title = ''
          this.getTodoToday()
        }
      })
    },
    handleEdit (data) {
      this.$refs.todo.handleShow(data)
    },
    handleDbClick () {
      this.isEdit = true
      this.username = this.uname
      this.$nextTick(() => {
        this.$refs.uname.$el.lastElementChild.focus()
      })
    },
    async editName () {
      if (!this.username) {
        this.$Message.warning('名称不能为空！')
        return
      }
      await this.$store.dispatch('assignState', { k: 'user', v: { uname: this.username } })
      this.isEdit = false
    },
    getEmptyParam (param) {
      const data = {
        ...param
      }
      delete data.id
      return data
    },
    async handleSave (params) {
      !params.id
        ? await addTodo(this.getEmptyParam(params))
        : await editTodo(params)
      this.title = ''
      this.getTodoToday()
    },
    handleDel (id) {
      this.$Modal.confirm({
        title: '您确定要删除？',
        onOk: async () => {
          await delTodo(id)
          this.getTodoToday()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.todo {
  ::v-deep .uname .ivu-input {
    border-style: hidden hidden solid;
    border-radius: unset;
    &:focus, &:active {
      border-style: hidden hidden solid;
      box-shadow: none;
    }
  }
  &-header {
    margin-top: 10px;
    > ul {
      margin-bottom: 5px;
      li {
        height: 38px;
        line-height: 38px;
        padding: 0 10px 5px;
        &:not(:last-child) {
          margin-right: 10px;
        }
        &.active {
          border-bottom: 2px solid #{$color_primary};
        }
      }
    }
  }
}
</style>
