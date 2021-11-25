<!--
 * @Author: pimzh
 * @Date: 2021-11-24 10:54:46
 * @LastEditTime: 2021-11-25 11:55:02
 * @LastEditors: pimzh
 * @Description: TodoType
-->
<template>
  <div class="table-wrapper overflow-y-auto">
    <Poptip
      v-for="(item, i) in menu"
      :key="i"
      padding="4px 8px"
    >
      <template v-slot:content>
        <span
          v-for="(row, ind) in actions"
          :key="ind"
          class="act cursor-pointer text-primary"
          @click="row.event(item)"
        >{{ row.label }}</span>
      </template>
      <render-button :size="size" :data="item" />
    </Poptip>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'TodoType',
  data () {
    return {
      actions: [
        {
          label: '修改',
          event: item => this.$emit('on-modal-show', item)
        },
        {
          label: '删除',
          event: () => {}
        }
      ]
    }
  },
  computed: {
    ...mapState(['todoType']),
    ...mapGetters(['size']),
    menu () {
      return this.todoType.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.act:not(:last-child) {
  margin-right: 6px;
}
.ivu-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
::v-deep .ivu-poptip{
  &-popper {
    min-width: 70px;
  }
}
</style>
