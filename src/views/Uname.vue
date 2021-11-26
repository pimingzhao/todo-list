<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:43:15
 * @LastEditTime: 2021-11-24 11:54:53
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="uname">
    <h1>set your name first!</h1>
    <Input v-focus v-model="uname" placeholder="请输入" :size="size" @on-enter="handleEnter" />
  </div>
</template>

<script>
import focus from '@/views/directives/focus'
import { mapGetters } from 'vuex'
export default {
  name: 'Uname',
  data () {
    return {
      uname: ''
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  directives: { focus },
  methods: {
    async handleEnter () {
      await this.$store.dispatch('assignState', { k: 'user', v: { uname: this.uname } })
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
