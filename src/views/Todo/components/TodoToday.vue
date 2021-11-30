<!--
 * @Author: pimzh
 * @Date: 2021-11-23 10:47:18
 * @LastEditTime: 2021-11-30 14:40:20
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <ul>
    <li v-for="(item, i) in data" :key="i">
      {{item.title}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoToday',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
