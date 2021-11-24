<!--
 * @Author: pimzh
 * @Date: 2021-11-24 09:41:19
 * @LastEditTime: 2021-11-24 11:04:30
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <Poptip placement="right-end">
    <Icon class="cursor-pointer" :size="26" type="md-settings" />
    <template v-slot:content>
      <div class="flex">
        <ul class="menu">
          <li
            v-for="(item, i) in menu"
            :key="i"
            class="cursor-pointer"
            :class="{ 'text-primary font-bold': item.value === current }"
            @click="() => current = item.value"
          >{{ item.label }}</li>
        </ul>
        <div class="border"></div>
        <component class="content" :is="current"></component>
      </div>
    </template>
  </Poptip>
</template>

<script>
import Ui from './Ui'
import TodoType from './TodoType'

export default {
  name: 'Setting',
  components: { Ui, TodoType },
  data () {
    return {
      menu: [
        {
          label: '视图',
          value: 'ui'
        },
        {
          label: '类型',
          value: 'todoType'
        }
      ],
      current: 'ui'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  li {
    line-height: 28px;
  }
}
.border {
  border-left: 1px solid #eee;
  margin: 0 10px;
}
.content {
  min-width: 200px;
}
</style>
