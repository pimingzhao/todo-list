<!--
 * @Author: pimzh
 * @Date: 2021-11-24 09:41:19
 * @LastEditTime: 2021-12-06 13:10:20
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <Poptip ref="poptip" placement="right-end">
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
        <component class="content" :is="current" v-on="$listeners" @hidden-poptip="handleHidden"></component>
      </div>
    </template>
  </Poptip>
</template>

<script>
import Ui from './Ui'
import TodoType from './TodoType'
import Namespace from './Namespace'
import Link from './Link'
import WeatherTime from './WeatherTime'

export default {
  name: 'Setting',
  components: { Ui, TodoType, Namespace, Link, WeatherTime },
  data () {
    return {
      menu: [
        {
          label: '视图',
          value: 'ui'
        },
        {
          label: '标签',
          value: 'todoType'
        },
        {
          label: '命名空间',
          value: 'namespace'
        },
        {
          label: '搜索栏',
          value: 'Link'
        },
        {
          label: '时间',
          value: 'WeatherTime'
        }
      ],
      current: 'ui'
    }
  },
  methods: {
    handleHidden () {
      this.$refs.poptip.$el.querySelector('.ivu-poptip-popper').style.display = 'none'
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
  min-width: 300px;
  min-height: 300px;
}
</style>
