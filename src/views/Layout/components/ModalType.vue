<!--
 * @Author: pimzh
 * @Date: 2021-11-25 09:39:21
 * @LastEditTime: 2021-11-30 11:06:47
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <Modal
    v-model="show"
    :title="title"
  >
    <Form ref="form" :model="params" :rules="rules" :label-width="80">
      <FormItem label="名称" prop="label">
        <Input ref="input" v-model.trim="params.label" placeholder="请输入" :size="size" />
      </FormItem>
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="params.type">
          <Radio v-for="(item, i) in todoTypes" :key="i" :label="item"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="开启圆角" prop="shape">
        <i-switch v-model="params.shape" :size="size" />
      </FormItem>
      <FormItem label="背景透明" prop="ghost">
        <i-switch v-model="params.ghost" :size="size" />
      </FormItem>
      <FormItem label="效果预览">
        <render-button :size="size" :data="params" />
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
import focus from '@/views/directives/focus'
export default {
  name: 'ModalType',
  directives: { focus },
  data () {
    return {
      show: false,
      params: {
        id: '',
        label: '',
        type: undefined,
        shape: false,
        ghost: false
      },
      rules: {
        label: { required: true, message: '名称不能为空', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['size']),
    todoTypes () {
      return this.tags[0]?.list || []
    },
    title () {
      return this.params.id ? '编辑' : '添加'
    }
  },
  methods: {
    handleShow (data) {
      this.show = true
      if (data) {
        this.params = {
          ...this.params,
          ...data
        }
      }
      this.$nextTick(() => {
        this.$refs.input.$el.lastElementChild.focus()
      })
    },
    handleCancel () {
      this.show = false
      this.$refs.form.resetFields()
      this.params.id = ''
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
          this.params.id
            ? await this.$store.dispatch('editArrState', { k: 'tags', v: this.params })
            : await this.$store.dispatch('addArrState', { k: 'tags', v: this.getEmptyParam(this.params) })
          this.handleCancel()
        }
      })
    }
  }
}
</script>
