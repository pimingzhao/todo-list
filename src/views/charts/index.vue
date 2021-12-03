<!--
 * @Author: pimzh
 * @Date: 2021-12-03 11:20:42
 * @LastEditors: pimzh
 * @LastEditTime: 2021-12-03 11:57:52
 * @Description: file content
-->
<template>
  <div class="charts">
    <h2>hi {{ uname }}, 今天是 <time-show tag="b" format="yyyy年MM月dd日 星期W" /></h2>
    <Row :gutter="15">
      <Col v-bind="gridsOpt">
        <div class="chart w-full" ref="chart"></div>
      </Col>
      <Col v-bind="gridsOpt">
        <div class="chart w-full" ref="chart1"></div>
      </Col>
      <Col v-bind="gridsOpt">
        <div class="chart w-full" ref="chart2"></div>
      </Col>
      <Col v-bind="gridsOpt">
        <div class="chart w-full" ref="chart3"></div>
      </Col>
    </Row>
  </div>
</template>

<script>
import echarts from './echarts'
import resize from '@/views/mixins/resize'

import { mapGetters } from 'vuex'
export default {
  name: 'charts',
  mixins: [resize],
  data () {
    return {
      gridsOpt: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 6
      },
      chart: {}
    }
  },
  computed: {
    ...mapGetters(['uname'])
  },
  mounted () {
    const mychart = echarts.init(this.$refs.chart)
    const mychart1 = echarts.init(this.$refs.chart1)
    const mychart2 = echarts.init(this.$refs.chart2)
    const mychart3 = echarts.init(this.$refs.chart3)
    const options = {
      title: {
        text: 'ECharts 示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    mychart.setOption(options)
    mychart1.setOption(options)
    mychart2.setOption(options)
    mychart3.setOption(options)
    this.chart = {
      mychart,
      mychart1,
      mychart2,
      mychart3
    }
  },
  methods: {
    handleResize () {
      Object.values(this.chart).forEach(chart => {
        chart.resize()
      })
    },
    beforeDestroy () {
      Object.values(this.chart).forEach(chart => {
        chart.dispose()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.charts {
  padding: 15px;
  .chart {
    height: 200px;
  }
}
</style>
