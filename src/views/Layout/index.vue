<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:44:47
 * @LastEditTime: 2021-11-24 10:10:42
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="layout flex flex-col">
    <router-view class="flex-1 container" />
    <Setting />
  </div>
</template>

<script>
import Setting from './components/Setting'

export default {
  name: 'Layout',
  components: { Setting }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  .container {
    padding: 20px;
  }
}
</style>
