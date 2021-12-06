<!--
 * @Author: pimzh
 * @Date: 2021-11-23 10:47:18
 * @LastEditTime: 2021-12-06 10:23:04
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <ul class="todo-today">
    <template  v-for="(item, i) in list">
      <li v-if="item.data.length" :key="i" class="namespace rounded" :class="{ 'donespace': isDone, 'border': !!item.id }">
        <ul>
          <li v-if="item.id">
            <span class="title inline-block text-lg text-primary">{{ item.label }}</span>
          </li>
          <Row :gutter="10">
            <Col v-for="todo in getTodos(item)" :key="todo.id" :xs="24" :sm="12" :md="8" :lg="6">
              <div
                title="编辑"
                class="todo-item rounded cursor-pointer flex justify-between items-center"
                @click="() => $emit('on-edit', todo)"
              >
                <span @click.stop="() => {}" title="完成">
                  <Checkbox :disabled="todo.done" :value="todo.done" @on-change="handleStatus(todo)">
                    <span :class="{ 'text-line': todo.done }">{{todo.title}}</span>
                  </Checkbox>
                </span>
                <span>
                  <render-tag v-for="tag in todo.tags" :key="tag" :data="tagsMap[tag]"></render-tag>
                  <span class="text-error" @click.stop="handleDel(todo.id)">删除</span>
                </span>
              </div>
            </Col>
          </Row>
        </ul>
      </li>
    </template>
    <li v-if="isEmpty" class="empty flex items-center justify-center">
      <span class="text-tip">
        {{ isDone ? '革命尚未成功，同志还需努力呀！' : '任务已经做完啦！再接再厉！' }}
      </span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TodoToday',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isDone: {
      type: Boolean,
      default: false
    },
    handleDel: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['namespaceMap', 'tagsMap']),
    list () {
      const { isDone, data, namespaceMap } = this
      const listMap = Object.create(null)
      const list = Object.keys(namespaceMap).map((key, i) => {
        listMap[key] = i
        return { ...namespaceMap[key], data: [] }
      })
      data.forEach(item => {
        if (item.done !== isDone) {
          return
        }
        if (item.namespace in namespaceMap) {
          list[listMap[item.namespace]].data.push(item)
        } else {
          list[0].data.push(item)
        }
      })
      return list.filter(item => namespaceMap[item.id].show)
    },
    isEmpty () {
      return this.list.every(item => item.data.length === 0)
    }
  },
  methods: {
    handleStatus (todo) {
      this.$emit('on-save', { ...todo, done: true, end_time: Date.now() })
    },
    getTodos (item) {
      if (this.isDone) {
        return item.data
      }
      return item.data.slice(0, item.limit)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-today {
  .namespace {
    &:first-child {
      margin-bottom: -10px;
    }
    &:not(:first-child) {
      margin-top: 15px;
      .title {
        margin-bottom: 4px;
      }
    }
  }
  .border {
    margin-top: 10px;
    border: 1px solid #{$color_warning};
    padding: 10px 10px 0;
  }
  .donespace {
    border-color: #{$color_success};
  }
  .ivu-col {
    margin-bottom: 10px;
  }
  .todo-item {
    border: 1px solid #{$color_primary};
    height: 40px;
    padding: 0 8px;
    .text-line {
      text-decoration: line-through;
    }
  }
  .empty {
    min-height: 200px;
  }
}
</style>
