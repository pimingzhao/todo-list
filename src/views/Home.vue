<!--
 * @Author: pimzh
 * @Date: 2021-11-22 09:42:44
 * @LastEditTime: 2021-11-22 21:29:24
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="home">
    <Input placeholder="请输入" v-model="title" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}
</style>
