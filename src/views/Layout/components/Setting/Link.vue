<!--
 * @Author: pimzh
 * @Date: 2021-11-26 17:31:15
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-27 09:59:43
 * @Description: file content
-->
<template>
  <div>
    <Table border :columns="columns" :data="search">
      <template v-slot:label="{row}">
        <Input :value="row.label" :size="size" />
      </template>
      <template v-slot:logo="{row}">
        <Input :value="row.logo" :size="size" />
      </template>
      <template v-slot:url="{row}">
        <Input :value="row.url" :size="size" />
      </template>
      <template v-slot:selected="{row}">
        <i-switch
          :disabled="row.selected"
          :value="row.selected"
          :size="size"
          @on-change="() => $store.dispatch('setSearch', row.id)"
        />
      </template>
    </Table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Link',
  data () {
    return {
      columns: [
        {
          title: '名称',
          slot: 'label',
          width: 120
        },
        {
          title: '图标',
          slot: 'logo',
          width: 120
        },
        {
          title: '地址',
          slot: 'url',
          width: 120
        },
        {
          title: '默认',
          slot: 'selected',
          width: 80
        }
      ]
    }
  },
  computed: {
    ...mapState(['search']),
    ...mapGetters(['size'])
  }
}
</script>
