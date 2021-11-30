<!--
 * @Author: pimzh
 * @Date: 2021-11-24 10:54:46
 * @LastEditTime: 2021-11-25 22:46:20
 * @LastEditors: pimzh
 * @Description: TodoType
-->
<template>
  <div class="btn-wrapper overflow-y-auto">
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
    <Button
      :size="size"
      type="primary"
      shape="circle"
      icon="md-add"
      @click="() => {$emit('on-modal-show');$emit('hidden-poptip')}"
    />
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
          event: item => {
            this.$emit('on-modal-show', item)
            this.$emit('hidden-poptip')
          }
        },
        {
          label: '删除',
          event: (item) => this.$store.dispatch('delTodoType', item)
        }
      ]
    }
  },
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['size']),
    menu () {
      return this.tags.slice(1)
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
.btn-wrapper {
  max-width: 350px;
  white-space: normal;
}
::v-deep .ivu-poptip{
  &-popper {
    min-width: 70px;
  }
}
</style>
