<!--
 * @Author: pimzh
 * @Date: 2021-11-30 11:20:37
 * @LastEditTime: 2021-12-02 08:50:03
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
      default: () => {}
    }
  },
  render (h, context) {
    const { data } = context.props
    if (!data) return ''
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
