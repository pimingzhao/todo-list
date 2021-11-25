<!--
 * @Author: pimzh
 * @Date: 2021-11-23 11:44:47
 * @LastEditTime: 2021-11-25 11:13:41
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="layout flex flex-col">
    <router-view class="flex-1 container" />
    <modal-type ref="modal" />
    <Setting @on-modal-show="val => $refs['modal'].handleShow(val)" />
  </div>
</template>

<script>
import Setting from './components/Setting'
import ModalType from './components/ModalType'

export default {
  name: 'Layout',
  components: { Setting, ModalType }
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
