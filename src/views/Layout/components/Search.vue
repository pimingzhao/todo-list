<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:01
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-29 09:11:51
 * @Description: file content
-->
<template>
  <div class="w-full flex items-center search">
    <img style="height: 32px;" v-if="imgSrc" :src="imgSrc" />&nbsp;
    <Input ref="input" v-model.trim="keyword" placeholder="请输入" :size="size" @on-enter="handleSearch" />&nbsp;
    <Select v-model="id" style="width: 70px" :size="size" @on-change="handleChange">
      <Option v-for="item in searchList" :key="item.id" :value="item.id">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      id: ''
    }
  },
  computed: {
    ...mapGetters(['size']),
    searchList () {
      return this.$store.state.search || []
    },
    active () {
      return this.searchList.find(item => item.id === this.id)
    },
    selected () {
      return this.searchList.find(item => item.selected)
    },
    imgSrc () {
      return this.active?.logo
    }
  },
  watch: {
    'selected.id': {
      handler (val) {
        this.id = val
      },
      immediate: true
    }
  },
  methods: {
    handleSearch () {
      window.location.href = this.active?.url + this.keyword
    },
    handleChange () {
      this.$refs.input.$el.lastElementChild.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 50%;
  ::v-deep .ivu-input {
    border-style: hidden hidden solid;
    &:focus, &:active {
      border-style: hidden hidden solid;
      box-shadow: none;
    }
  }
}
</style>
