<!--
 * @Author: pimzh
 * @Date: 2021-11-25 11:20:08
 * @LastEditTime: 2021-11-25 17:54:55
 * @LastEditors: pimzh
 * @Description: RenderButton
-->
<script>
export default {
  name: 'RenderButton',
  functional: true,
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    size: String
  },
  render (h, context) {
    const { data, size } = context.props
    return (
      <Button
        size={size}
        type={data.type}
        shape={data.shape ? 'circle' : undefined}
        ghost={data.ghost}
      >{ data.label || 'hi' }</Button>
    )
  }
}
</script>
