import throttle from 'lodash.throttle'

export default {
  mounted () {
    this.handleResize()
    this.handleResize = throttle(this.throttle, 200, { trailing: true })
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    this.handleResize.cancel()
    window.removeEventListener('resize', this.handleResize)
  }
}
