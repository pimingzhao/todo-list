<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:10
 * @LastEditors: pimzh
 * @LastEditTime: 2021-12-01 13:52:15
 * @Description: file content
-->
<template>
  <div>
    <time-show :format="time.format" tag="h3" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Weather',
  computed: {
    ...mapState(['time'])
  }
}
</script>
