<template>
  <div class="errPage-container">
    <errorA></errorA>
    <errorB></errorB>
    <!-- $t is vue-i18n global function to translate lang -->
    <h3>请点击右上角bug小图标</h3>
    <code>
      现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/#/error?id=%e4%bb%a3%e7%a0%81">
        文档介绍
      </a>
    </code>
    <a href="#">

    </a>
  </div>
</template>

<script>
import errorA from './errorTestA'
import errorB from './errorTestB'

export default {
  name: 'errorLog',
  components: { errorA, errorB }
}
</script>

<style scoped>
  .errPage-container {
    padding: 30px;
  }
</style>
