<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:10
 * @LastEditors: pimzh
 * @LastEditTime: 2021-12-06 13:19:18
 * @Description: file content
-->
<template>
  <h3 class="text-right">
    <template  v-if="weather.type">
      <Icon v-if="weather.type === '晴'" :size="20" type="md-sunny" />
      <Icon v-else-if="weather.type === '多云'" :size="22" type="md-cloud" />
      <Icon v-else-if="weather.type.indexOf('晴') !== -1" :size="20" type="md-partly-sunny" />
      <Icon v-else-if="weather.type.indexOf('雪') !== -1" :size="20" type="md-snow" />
      <Icon v-else-if="weather.type.indexOf('雨') !== -1" :size="20" type="md-rainy" />
    </template>
    <span style="margin-left: 8px;">{{ weather.wendu }}</span> ℃
    <p class="text-sm">
      {{ weather.type }}
      <span>{{ weather.low }}</span> ~ <span>{{ weather.high }}</span> ℃
    </p>
  </h3>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Weather',
  data () {
    return {
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=上海',
      weather: {
        type: '',
        wendu: '',
        low: '',
        high: ''
      }
    }
  },
  async created () {
    const res = (await axios.get(this.url, { responseType: 'text' })).data.data
    const today = res.forecast[0]
    this.weather.type = today.type
    this.weather.wendu = res.wendu
    this.weather.low = this.getC(today.low)
    this.weather.high = this.getC(today.high)
  },
  methods: {
    getC (str) {
      return str.replace(/^[\u4E00-\u9FA5]*\s*([0-9]+).*/, '$1')
    }
  }
}
</script>
