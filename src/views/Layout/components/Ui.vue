<!--
 * @Author: pimzh
 * @Date: 2021-11-24 10:31:17
 * @LastEditTime: 2021-11-26 13:15:32
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
        @click="() => $store.dispatch('assignState', { k: 'ui', v: { size: item } })"
      >
        {{ item }}
      </Button>
    </li>
    <li>
      <label>显示搜索：</label>
      <i-switch v-model="showSearch" :size="ui.size" />
    </li>
    <li>
      <label>显示天气：</label>
      <i-switch v-model="showWeather" :size="ui.size" />
    </li>
    <li>
      <label>显示时间：</label>
      <i-switch v-model="showTime" :size="ui.size" />
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Ui',
  computed: {
    ...mapState(['ui']),
    showSearch: {
      get () {
        return this.ui.showSearch
      },
      set (showSearch) {
        this.$store.dispatch('assignState', { k: 'ui', v: { showSearch } })
      }
    },
    showWeather: {
      get () {
        return this.ui.showWeather
      },
      set (showWeather) {
        this.$store.dispatch('assignState', { k: 'ui', v: { showWeather } })
      }
    },
    showTime: {
      get () {
        return this.ui.showTime
      },
      set (showTime) {
        this.$store.dispatch('assignState', { k: 'ui', v: { showTime } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-btn:not(:last-child) {
  margin-right: 8px;
}
ul li:not(:last-child) {
  margin-bottom: 8px;
}
</style>
