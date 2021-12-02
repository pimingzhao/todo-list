<!--
 * @Author: pimzh
 * @Date: 2021-11-29 14:13:03
 * @LastEditors: pimzh
 * @LastEditTime: 2021-12-02 10:36:23
 * @Description: file content
-->
<template>
  <Modal
    v-model="show"
    :title="title"
    :closable="false"
    :mask-closable="false"
  >
    <Form ref="form" :model="params" :rules="rules" :label-width="80">
      <FormItem label="任务名" prop="title">
        <template v-if="isAdd || params.done">{{ params.title }}</template>
        <Input v-else v-model="params.title" :size="size" />
      </FormItem>
      <FormItem label="命名空间" prop="namespace">
        <Select v-model="params.namespace" clearable>
          <Option v-for="item in namespace" :key="item.id" :value="item.id">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="标签" prop="tags">
        <Select v-model="params.tags" clearable multiple>
          <Option v-for="item in tags" :key="item.id" :value="item.id">{{ item.label }}</Option>
        </Select>
      </FormItem>
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
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'ModalTodo',
  props: {
    save: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      show: false,
      params: {
        id: '',
        title: '',
        namespace: '',
        tags: []
      },
      rules: {}
    }
  },
  computed: {
    ...mapState(['namespace']),
    ...mapGetters(['size']),
    tags () {
      return this.$store.state.tags.slice(1)
    },
    isAdd () {
      return !this.params.id
    },
    title () {
      return this.isAdd ? '添加任务' : '编辑任务'
    }
  },
  methods: {
    handleShow (params) {
      this.params = {
        ...this.params,
        ...params
      }
      this.show = true
    },
    handleSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await this.save(this.params)
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
