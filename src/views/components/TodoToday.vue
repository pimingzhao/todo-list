<!--
 * @Author: pimzh
 * @Date: 2021-11-23 10:47:18
 * @LastEditTime: 2021-11-23 11:16:17
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <ul>
    <li v-for="(item, i) in todo" :key="i">
      {{item.title}}
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TodoToday',
  computed: {
    ...mapState(['todo'])
  }
}
</script>
