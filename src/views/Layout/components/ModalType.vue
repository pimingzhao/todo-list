<!--
 * @Author: pimzh
 * @Date: 2021-11-25 09:39:21
 * @LastEditTime: 2021-11-30 13:17:45
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
      <FormItem label="颜色" prop="color">
        <RadioGroup v-model="colorType">
          <Radio label="system">系统</Radio>
          <Radio label="custom">自定义</Radio>
        </RadioGroup><br/>
        <RadioGroup v-if="colorType === 'system'" v-model="params.color">
          <Radio v-for="(item, i) in colors" :key="i" :label="item"></Radio>
        </RadioGroup>
        <ColorPicker v-else v-model="params.color" alpha />
      </FormItem>
      <FormItem label="大小" prop="size">
        <RadioGroup v-model="params.size">
          <Radio v-for="(item, i) in sizes" :key="i" :label="item"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="效果预览">
        <render-tag :data="params" />
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
import { mapGetters } from 'vuex'
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
        type: 'unset',
        color: 'default',
        size: 'default'
      },
      colorType: 'system',
      rules: {
        label: { required: true, message: '名称不能为空', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapGetters(['size']),
    setting () {
      return this.$store.state.tags[0] || {}
    },
    todoTypes () {
      return this.setting.type || []
    },
    colors () {
      return this.setting.color || []
    },
    sizes () {
      return this.setting.size || []
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
