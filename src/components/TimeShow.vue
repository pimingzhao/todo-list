<!--
 * @Author: pimzh
 * @Date: 2021-11-27 17:39:29
 * @LastEditTime: 2021-11-27 19:19:47
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <span>{{ time }}</span>
</template>

<script>
import { timeFormat } from '@/utils'
export default {
  name: 'Time',
  props: {
    format: {
      required: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      date: new Date(),
      timeout: 0
    }
  },
  computed: {
    time () {
      return timeFormat(this.date, this.format)
    }
  },
  mounted () {
    this.date = new Date()
    this.timeout = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    !!this.timeout && clearInterval(this.timeout)
  }
}
</script>
