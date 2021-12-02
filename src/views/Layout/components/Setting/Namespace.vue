<!--
 * @Author: pimzh
 * @Date: 2021-11-25 09:00:39
 * @LastEditTime: 2021-12-02 09:58:48
 * @LastEditors: pimzh
 * @Description: Namespace
-->
<template>
  <div style="max-width: 450px">
    <Button style="margin-bottom: 10px;" :size="size" @click="handleAdd">添加</Button>
    <Table :max-height="250" border :columns="columns" :data="tableData">
      <template v-slot:label="{row, index}">
        <Input v-if="row.isEdit" v-model.trim="row.label" :size="size" @on-change="e => changeRow(index, 'label', e)" />
        <template v-else>{{ row.label }}</template>
      </template>
      <template v-slot:show="{row, index}">
        <i-switch
          :disabled="!row.isEdit"
          v-model="row.show"
          :size="size"
          @on-change="v => $set(tableData[index], 'show', v)"
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
  name: 'Namespace',
  data () {
    return {
      columns: [
        {
          title: '名称',
          slot: 'label',
          width: 200
        },
        {
          title: '显示',
          slot: 'show',
          width: 80
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      origin: Object.create(null),
      tableData: [],
      baseData: {
        id: '',
        label: '',
        show: true
      }
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  created () {
    this.tableData = deepClone(this.$store.state.namespace)
  },
  methods: {
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
      await this.$store.dispatch('delArrState', { k: 'namespace', v: id })
      this.tableData.splice(index, 1)
    },
    async handleSave (row, index) {
      if (!row.label) {
        this.$Message.warning('名称不能为空！')
        return
      }
      const data = { ...this.baseData }
      Object.keys(data).forEach(k => { data[k] = row[k] })
      const id = await this.$store.dispatch('editNamespace', data)
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
