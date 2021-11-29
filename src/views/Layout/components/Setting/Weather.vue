<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:10
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-29 13:17:46
 * @Description: file content
-->
<template>
  <ul>
    <li v-for="(item, i) in selection" :key="i">
      <label>{{item.label}}：</label>
      <span>{{item.value.join('，')}}</span>
    </li>
    <li>
      <label>自定义格式：</label>
      <Input v-model="format" style="width: 200px" @on-enter="handleChange" />
    </li>
    <li>
      <label>效果预览：</label>
      <time-show :format="timeFormat" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Weather',
  data () {
    return {
      selection: [
        {
          label: '年',
          value: ['yyyy']
        },
        {
          label: '月',
          value: ['MM', 'M']
        },
        {
          label: '日',
          value: ['dd', 'd']
        },
        {
          label: '周',
          value: ['W']
        },
        {
          label: '时',
          value: ['HH', 'H', 'hh', 'h']
        },
        {
          label: '分',
          value: ['mm', 'm']
        },
        {
          label: '秒',
          value: ['ss', 's']
        }
      ],
      format: ''
    }
  },
  computed: {
    timeFormat () {
      return this.$store.state.time.format
    }
  },
  created () {
    this.format = this.timeFormat
  },
  methods: {
    handleChange () {
      this.$store.dispatch('assignState', {
        k: 'time',
        v: {
          format: this.format
        }
      })
    }
  }
}
</script>
