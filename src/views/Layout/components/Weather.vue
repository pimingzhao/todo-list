<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:10
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-27 19:22:07
 * @Description: file content
-->
<template>
  <div>
    <time-show :format="time.format" />
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
