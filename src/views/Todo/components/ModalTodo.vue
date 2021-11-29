<!--
 * @Author: pimzh
 * @Date: 2021-11-29 14:13:03
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-29 15:19:04
 * @Description: file content
-->
<template>
  <Modal
    v-model="show"
    title="编辑任务"
    :closable="false"
    :mask-closable="false"
  >
    <Form ref="form" :model="params" :rules="rules" :label-width="80">
      <FormItem label="任务名" prop="title">{{ params.title }}</FormItem>
    </Form>
    <template v-slot:footer>
      <div class="text-right">
        <Button type="default" :size="size" @click="handleCancel">取消</Button>
        <Button type="primary" :size="size" @click="handleSave">保存</Button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ModalTodo',
  data () {
    return {
      show: false,
      params: {
        id: '',
        title: ''
      },
      rules: {}
    }
  },
  computed: {
    ...mapGetters(['size'])
  },
  methods: {
    handleShow (params) {
      this.params = {
        ...this.params,
        ...params
      }
      this.show = true
    },
    getEmptyParam (param) {
      const data = {
        ...param
      }
      delete data.id
      return data
    },
    handleSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          !this.params.id
            ? await this.$store.dispatch('addTodo', this.getEmptyParam(this.params))
            : await this.$store.dispatch('editArrState', { k: 'todo', v: this.params })
          this.handleCancel()
        }
      })
    },
    handleCancel () {
      this.show = false
      this.$refs.form.resetFields()
      this.params.id = ''
    }
  }
}
</script>
