<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb  class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" content="screenfull" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>


      <el-tooltip effect="dark" content="navbar.theme" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span class="username">{{username}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              dashboard
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">logOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--<el-dropdown class="avatar-container" trigger="click">-->
      <!--<div class="avatar-wrapper">-->
        <!--{{username}}-->
        <!--<i class="el-icon-caret-bottom"></i>-->
      <!--</div>-->
      <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
        <!--<router-link class="inlineBlock" to="/">-->
          <!--<el-dropdown-item>-->
            <!--公告-->
          <!--</el-dropdown-item>-->
        <!--</router-link>-->
        <!--<el-dropdown-item divided>-->
          <!--<span @click="logout" style="display:block;">退出</span>-->
        <!--</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import ThemePicker from '@/components/ThemePicker'
/* import avatar from '@/assets/img/user.png' */
export default {
  data () {
    return {
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    username () {
      let username = localStorage.getItem('os_username')
      return username || this.name
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: 15px;
    }
    .right-menu {
      float: right;
      height: 100%;
      padding: 4px 0;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .username{
        height: 40px;
        display: inline-block;
        /* width: 40px; */
        line-height: 100%;
        vertical-align: middle;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 8px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

