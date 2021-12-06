<!--
 * @Author: pimzh
 * @Date: 2021-11-30 13:29:25
 * @LastEditTime: 2021-12-06 10:03:50
 * @LastEditors: pimzh
 * @Description: TodoList
-->
<template>
  <div class="flex flex-col">
    <router-link to="/todo">
      <Icon type="ios-arrow-back" /> back todo
    </router-link><br/><br/>
    <render-header
      :data="header"
      :headOpt="{ props: { rules } }"
      @on-query="getTableList"
    />
    <div ref="tableWrapper" class="flex-1 overflow-hidden">
      <Table :data="tableData" :columns="columns" border :max-height="maxHeight">
        <template v-slot:status="{ row }">
          <template v-if="row.done">
            <span class="text-success"><Icon type="md-checkbox" />已完成</span>
          </template>
          <template v-else>
            <span class="text-warning"><Icon type="md-checkbox-outline" />进行中</span>
          </template>
        </template>
        <template v-slot:start_time="{ row }">
          {{ timeFormat(row.start_time) }}
        </template>
        <template v-slot:namespace="{ row }">
          {{ (row.namespace in namespaceMap) ? namespaceMap[row.namespace].label : '' }}
        </template>
        <template v-slot:tags="{ row }">
          <template v-for="item in row.tags">
            <render-tag :key="item" v-if="item in tagsMap" :data="tagsMap[item]" />
          </template>
        </template>
        <template v-slot:action="{ row }">
          <template v-for="(item, i) in actions">
            <span :key="i" class="act text-primary cursor-pointer" @click="item.event(row)">{{ item.label }}</span>
          </template>
        </template>
      </Table>
    </div>
    <p style="margin-top: 10px" class="text-right">
      <Page
        :current="params.page"
        :page-size="params.size"
        :total="total" show-total
        show-elevator show-sizer
        @on-change="page => {params.page = page;getTableList()}"
        @on-page-size-change="size => {params.page = 1;params.size = size;getTableList()}"
      />
    </p>
    <modal-todo ref="modal" :save="handleSave" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ModalTodo from '@/views/Todo/components/ModalTodo'

import { getTimeRange, timeFormat } from '@/utils'
import { getTodoList, editTodo, delTodo } from '@/api/todo'
export default {
  name: 'TodoList',
  components: { ModalTodo },
  data () {
    return {
      rules: {
        start_time: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value[0] && !value[1]) {
                callback(new Error('开始时间不能为空'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      },
      columns: [
        {
          title: '状态',
          slot: 'status',
          minWidth: 100
        },
        {
          title: '任务名',
          key: 'title',
          minWidth: 110
        },
        {
          title: '开始时间',
          slot: 'start_time',
          minWidth: 170
        },
        {
          title: '命名空间',
          slot: 'namespace',
          minWidth: 120
        },
        {
          title: '标签',
          slot: 'tags',
          minWidth: 120
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 105
        }
      ],
      tableData: [],
      actions: [
        {
          label: '编辑',
          event: row => this.$refs.modal.handleShow(row)
        },
        {
          label: '删除',
          event: this.handleDel
        }
      ],
      params: {
        page: 1,
        size: 10
      },
      maxHeight: 'auto',
      total: 0
    }
  },
  computed: {
    ...mapState(['namespace', 'tags']),
    ...mapGetters(['namespaceMap', 'tagsMap']),
    header () {
      return [
        {
          tag: 'date',
          name: 'start_time',
          label: '开始时间',
          value: getTimeRange(null, 0),
          grids: {
            xl: 5
          }
        },
        {
          tag: 'select',
          name: 'done',
          label: '状态',
          value: 'false',
          data: [
            {
              label: '已完成',
              id: 'true'
            },
            {
              label: '进行中',
              id: 'false'
            }
          ],
          grids: {
            xl: 3
          }
        },
        {
          tag: 'select',
          name: 'namespace',
          label: '命名空间',
          data: this.namespace
        },
        {
          tag: 'select',
          name: 'tags',
          label: '标签',
          data: this.tags.slice(1)
        }
      ]
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.maxHeight = this.$refs.tableWrapper.clientHeight
    },
    async getTableList (params) {
      if (params) {
        this.params = {
          ...this.params,
          ...params,
          page: 1,
          start_time: params.start_time.map(date => date.getTime())
        }
      }
      const res = await getTodoList(this.params)
      this.tableData = res.data
      this.total = res.total
    },
    timeFormat (time) {
      return timeFormat(time)
    },
    async handleSave (params) {
      await editTodo(params)
      this.getTableList()
    },
    handleDel ({ id }) {
      this.$Modal.confirm({
        title: '您确定要删除？',
        onOk: async () => {
          await delTodo(id)
          this.getTableList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.act:not(:last-child) {
  margin-right: 6px;
}
</style>
