<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:44:47
 * @LastEditTime: 2021-12-02 10:54:12
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="layout flex flex-col text-normal">
    <Row justify="center" :gutter="10">
      <Col :xs="24" :sm="24" :md="12" :lg="12">
        <Search v-if="ui.showSearch" style="margin-bottom: 10px;" />
      </Col>
      <Col :xs="24" :sm="24" :md="12" :lg="12">
        <Weather v-if="ui.showWeather" style="margin-bottom: 10px;" />
      </Col>
    </Row>
    <router-view class="flex-1 container overflow-y-auto" />
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
  padding: 15px;
  .container {
    padding: 0 15px;
    margin: 15px 0;
  }
}
</style>
