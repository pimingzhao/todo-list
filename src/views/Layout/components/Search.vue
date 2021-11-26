<!--
 * @Author: pimzh
 * @Date: 2021-11-26 09:17:01
 * @LastEditors: pimzh
 * @LastEditTime: 2021-11-26 14:54:13
 * @Description: file content
-->
<template>
  <div class="w-full flex items-center search">
    <img style="height: 32px; margin-right: 4px;" v-if="imgSrc" :src="imgSrc" />
    <Input v-model.trim="keyword" placeholder="请输入" :size="size" @on-enter="handleSearch">
      <Select v-model="id" slot="append" style="width: 70px" :size="size">
        <Option v-for="item in searchList" :key="item.id" :value="item.id">{{ item.label }}</Option>
      </Select>
    </Input>
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
      set (id) {
        this.$store.dispatch('setSearch', id)
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
    outline: none;
    border-style: none none solid;
    &:focus, &:active {
      border-style: none none solid;
    }
  }
}
</style>
