<!--
 * @Author: pimzh
 * @Date: 2021-11-23 10:47:18
 * @LastEditTime: 2021-12-01 14:02:06
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <ul class="todo-today">
    <template  v-for="(item, i) in list">
      <li v-if="item.data.length" :key="i" class="namespace rounded" :class="{ 'border': 'key' in item }">
        <ul>
          <li v-if="('key' in item)">
            <span class="title inline-block text-lg text-primary">{{ item.label }}</span>
          </li>
          <Row :gutter="10">
            <Col v-for="todo in item.data" :key="todo.id" :xs="24" :sm="12" :md="8" :lg="6">
              <div
                class="todo-item rounded cursor-pointer flex justify-between items-center text-primary"
                @click="() => $emit('on-edit', todo)"
              >
                <span @click.stop="() => {}">
                  <Checkbox v-model="todo.done">{{todo.title}}</Checkbox>
                </span>
                <span>
                  <render-tag v-for="item in todo.tags" :key="item" :data="tagsMap[item]"></render-tag>
                </span>
              </div>
            </Col>
          </Row>
        </ul>
      </li>
    </template>
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
    }
  },
  computed: {
    ...mapGetters(['namespaceMap', 'tagsMap']),
    list () {
      const { data, namespaceMap } = this
      const listMap = Object.create(null)
      const list = Object.keys(namespaceMap).map((key, i) => {
        listMap[key] = i + 1
        return { key, data: [], label: namespaceMap[key].label }
      })
      list.unshift({ data: [] })
      data.forEach(item => {
        if (item.namespace in namespaceMap) {
          list[listMap[item.namespace]].data.push(item)
        } else {
          list[0].data.push(item)
        }
      })
      return list.filter(item => !('key' in item) || namespaceMap[item.key].show)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-today {
  .namespace {
    margin-top: 20px;
    .title {
      margin-bottom: 4px;
    }
  }
  .border {
    margin-top: 10px;
    border: 1px solid #{$color_primary};
    padding: 10px;
  }
  .todo-item {
    border: 1px solid #{$color_primary};
    height: 40px;
    padding: 0 4px;
    margin-bottom: 10px;
  }
}
</style>
