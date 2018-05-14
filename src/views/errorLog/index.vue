<template>
  <div class="errPage-container">
    <errorA></errorA>
    <errorB></errorB>
    <!-- $t is vue-i18n global function to translate lang -->
    <h3>{{$t('errorLog.tips')}}</h3>
    <code>
      {{$t('errorLog.description')}}
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/#/error?id=%e4%bb%a3%e7%a0%81">
        {{$t('errorLog.documentation')}}
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
