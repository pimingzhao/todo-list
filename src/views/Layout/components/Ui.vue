<!--
 * @Author: pimzh
 * @Date: 2021-11-24 10:31:17
 * @LastEditTime: 2021-11-24 11:44:38
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <ul>
    <li>
      <label>组件大小：</label>
      <Button
        v-for="(item, i) in ui.sizeOption"
        :key="i"
        :size="item"
        :type="item === ui.size ? 'primary' : 'default'"
        @click="() => $store.dispatch('setUi', { size: item })"
      >
        {{ item }}
      </Button>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Ui',
  computed: {
    ...mapState(['ui'])
  }
}
</script>

<style lang="scss" scoped>
.ivu-btn:not(:last-child) {
  margin-right: 8px;
}
</style>
