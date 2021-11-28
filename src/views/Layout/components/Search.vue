<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:01
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-28 22:33:05
 * @Description: file content
-->
<template>
  <div class="w-full flex items-center search">
    <img style="height: 32px;" v-if="imgSrc" :src="imgSrc" />&nbsp;
    <Input ref="input" v-model.trim="keyword" placeholder="请输入" :size="size" @on-enter="handleSearch" />&nbsp;
    <Select v-model="id" style="width: 70px" :size="size">
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
      keyword: ''
    }
  },
  computed: {
    ...mapGetters(['size']),
    searchList () {
      return this.$store.state.search || []
    },
    selected () {
      return this.searchList.find(item => item.selected)
    },
    id: {
      get () {
        return this.selected?.id
      },
      set (val) {
        this.$refs.input.$el.lastElementChild.focus()
        this.$store.dispatch('setSearch', val)
      }
    },
    imgSrc () {
      return this.selected?.logo
    }
  },
  methods: {
    handleSearch () {
      window.location.href = this.selected.url + this.keyword
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
