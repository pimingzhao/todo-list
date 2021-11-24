<!--
 * @Author: pimzh
 * @Date: 2021-11-24 09:33:09
 * @LastEditTime: 2021-11-24 09:37:00
 * @LastEditors: pimzh
 * @Description:
-->
<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1>Sorry, the page is lost!</h1>
    <router-link to="/">
      <Button type="text">back to home</Button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
