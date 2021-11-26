<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:44:47
 * @LastEditTime: 2021-11-26 14:10:31
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="layout flex flex-col">
    <div class="flex justify-between">
      <div class="w-6-12">
        <Search v-if="ui.showSearch" />
      </div>
      <div class="w-6-12">
        <Weather v-if="ui.showWeather" />
      </div>
    </div>
    <router-view class="flex-1 container" />
    <modal-type ref="modal" />
    <Setting @on-modal-show="val => $refs['modal'].handleShow(val)" />
  </div>
</template>

<script>
import Search from './components/Search'
import Weather from './components/Weather'
import Setting from './components/Setting'
import ModalType from './components/ModalType'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: { Search, Weather, Setting, ModalType },
  computed: {
    ...mapState(['ui'])
  }
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
