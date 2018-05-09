<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="logo">系统</div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
      <foot></foot>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Foot } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Foot
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  height: 100%;
  width: 100%;
}

</style>
