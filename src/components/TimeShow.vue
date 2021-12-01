<!--
 * @Author: pimzh
 * @Date: 2021-11-27 17:39:29
 * @LastEditTime: 2021-12-01 13:51:47
 * @LastEditors: pimzh
 * @Description:
-->
<script>
import { timeFormat } from '@/utils'
export default {
  name: 'Time',
  props: {
    format: {
      required: true,
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'span'
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
  render (h) {
    const { tag, time } = this
    return h(tag, time)
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
