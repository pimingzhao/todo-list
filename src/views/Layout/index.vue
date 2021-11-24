<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:44:47
 * @LastEditTime: 2021-11-24 09:28:27
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="layout">
    layout
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
.layout {
  padding: 20px;
}
</style>
