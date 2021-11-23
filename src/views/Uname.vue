<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:43:15
 * @LastEditTime: 2021-11-23 11:56:45
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="uname">
    <h1>set your name first!</h1>
    <Input v-model="uname" @on-enter="handleEnter" />
  </div>
</template>

<script>
export default {
  name: 'Uname',
  data () {
    return {
      uname: ''
    }
  },
  methods: {
    async handleEnter () {
      await this.$store.dispatch('setUname', this.uname)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.uname {
  padding: 20px;
}
</style>
