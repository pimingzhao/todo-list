<!--
 * @Author: pimzh
 * @Date: 2021-11-26 17:31:15
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-28 22:29:18
 * @Description: file content
-->
<template>
  <div>
    <p style="margin-bottom: 10px;"><Button :size="size" @click="handleAdd">添加</Button></p>
    <Table max-height="250px" border :columns="columns" :data="search">
      <template v-slot:label="{row}">
        <Input v-if="row.isEdit" :value="row.label" :size="size" />
        <template v-else>{{ row.label }}</template>
      </template>
      <template v-slot:logo="{row}">
        <Input v-if="row.isEdit" :value="row.logo" :size="size" />
        <template v-else>{{ row.logo }}</template>
      </template>
      <template v-slot:url="{row}">
        <Input v-if="row.isEdit" :value="row.url" :size="size" />
        <template v-else>{{ row.url }}</template>
      </template>
      <template v-slot:selected="{row}">
        <i-switch
          :disabled="!row.isEdit || row.selected"
          :value="row.selected"
          :size="size"
          @on-change="() => $store.dispatch('setSearch', row.id)"
        />
      </template>
      <template v-slot:action="{row,index}">
        <template v-if="!row.isEdit">
          <Button size="small" type="primary" @click="handleEdit(row, index)">编辑</Button>&nbsp;
          <Button size="small" type="error" @click="handleDel(row, index)">删除</Button>
        </template>
        <template v-else>
          <Button size="small" type="primary" @click="handleSave(row)">保存</Button>&nbsp;
          <Button size="small" @click="handleCancel(row, index)">取消</Button>
        </template>
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
        },
        {
          title: '操作',
          slot: 'action',
          width: 135
        }
      ],
      origin: Object.create(null)
    }
  },
  computed: {
    ...mapState(['search']),
    ...mapGetters(['size'])
  },
  methods: {
    handleAdd () {},
    handleEdit (row, index) {
      this.origin[index] = { ...row }
      this.$set(row, 'isEdit', true)
    },
    handleDel () {},
    handleSave () {},
    handleCancel (row, index) {
      const ori = this.origin[index]
      Object.keys(ori).forEach(k => {
        this.$set(row, k, ori[k])
      })
      this.$set(row, 'isEdit', false)
    }
  }
}
</script>
