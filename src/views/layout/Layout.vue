<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="logo">系统</div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
      <foot></foot>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, Foot } from '@/views/layout/components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Foot
  },
  mixins: [ResizeMixin],
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
