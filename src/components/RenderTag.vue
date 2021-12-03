<!--
 * @Author: pimzh
 * @Date: 2021-11-30 11:20:37
 * @LastEditTime: 2021-12-03 09:19:44
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
      >{ data.label }</Tag>
    )
  }
}
</script>
