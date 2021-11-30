<!--
 * @Author: pimzh
 * @Date: 2021-11-30 11:20:37
 * @LastEditTime: 2021-11-30 11:40:07
 * @LastEditors: pimzh
 * @Description:
-->
<script>
export default {
  name: 'RenderTag',
  functional: true,
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  render (h, context) {
    const { data } = context.props
    return (
      <Tag
        size={data.size}
        type={data.type === 'unset' ? undefined : data.type}
        color={data.color}
      >{ data.label || 'hi' }</Tag>
    )
  }
}
</script>
