<!--
 * @Author: pimzh
 * @Date: 2021-11-26 17:31:15
 * @LastEditors: pimzh
 * @LastEditTime: 2021-12-03 13:41:06
 * @Description: file content
-->
<template>
  <div>
    <p style="margin-bottom: 10px;"><Button :size="size" @click="handleAdd">添加</Button></p>
    <Table :max-height="250" border :columns="columns" :data="tableData">
      <template v-slot:label="{row, index}">
        <Input v-if="row.isEdit" v-model.trim="row.label" :size="size" @on-change="e => changeRow(index, 'label', e)" />
        <template v-else>{{ row.label }}</template>
      </template>
      <template v-slot:logo="{row, index}">
        <Input v-if="row.isEdit" v-model.trim="row.logo" :size="size" @on-change="e => changeRow(index, 'logo', e)" />
        <template v-else>{{ row.logo }}</template>
      </template>
      <template v-slot:url="{row, index}">
        <Input v-if="row.isEdit" v-model.trim="row.url" :size="size" @on-change="e => changeRow(index, 'url', e)" />
        <template v-else>{{ row.url }}</template>
      </template>
      <template v-slot:selected="{row, index}">
        <i-switch
          :disabled="row.isEdit || row.selected"
          :value="row.selected"
          :size="size"
          @on-change="handleChange(row, index)"
        />
      </template>
      <template v-slot:action="{row,index}">
        <template v-if="!row.isEdit">
          <Button size="small" type="primary" @click="handleEdit(row, index)">编辑</Button>&nbsp;
          <Button size="small" type="error" @click="handleDel(row, index)">删除</Button>
        </template>
        <template v-else>
          <Button size="small" type="primary" @click="handleSave(row, index)">保存</Button>&nbsp;
          <Button size="small" @click="handleCancel(row, index)">取消</Button>
        </template>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { deepClone } from '@/utils'
export default {
  name: 'Link',
  data () {
    return {
      columns: [
        {
          title: '名称',
          slot: 'label',
          width: 80
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
      origin: Object.create(null),
      tableData: [],
      baseData: {
        id: '',
        label: '',
        logo: '',
        url: '',
        selected: false
      }
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  created () {
    this.tableData = deepClone(this.$store.state.search)
  },
  methods: {
    async handleChange (row, index) {
      await this.$store.dispatch('setSearchSelected', row.id)
      const finder = this.tableData.find(item => !!item.selected)
      this.$set(finder, 'selected', false)
      this.$set(this.tableData[index], 'selected', true)
    },
    handleAdd () {
      this.tableData.push({
        isNew: true,
        isEdit: true,
        ...this.baseData
      })
    },
    handleEdit (row, index) {
      this.origin[index] = { ...row }
      this.$set(this.tableData[index], 'isEdit', true)
    },
    async handleDel ({ id }, index) {
      await this.$store.dispatch('delArrState', { k: 'search', v: id })
      this.tableData.splice(index, 1)
    },
    async handleSave (row, index) {
      if (!row.label || !row.url) {
        this.$Message.warning('名称或地址不能为空！')
        return
      }
      const data = { ...this.baseData }
      Object.keys(data).forEach(k => { data[k] = row[k] })
      const id = await this.$store.dispatch('editSearch', data)
      this.$delete(this.tableData[index], 'isNew')
      this.$delete(this.tableData[index], 'isEdit')
      id && this.$set(this.tableData[index], 'id', id)
    },
    changeRow (index, k, e) {
      this.$set(this.tableData[index], k, e.currentTarget.value)
    },
    handleCancel (row, index) {
      if (row.isNew) {
        this.tableData.splice(index, 1)
        return
      }
      const ori = this.origin[index]
      Object.keys(ori).forEach(k => {
        this.$set(this.tableData[index], k, ori[k])
      })
      this.$set(this.tableData[index], 'isEdit', false)
    }
  }
}
</script>
