<template>
  <div class="app">
    <v-login v-show="loginState" @loginshow="loginShow"></v-login>
    <el-container>
      <el-header style="height: 80px">
        <v-header @getloginstate="getloginState"></v-header>
      </el-header>
      <el-container>
        <el-aside>
          <v-menu></v-menu>
        </el-aside>
        <el-container>
          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer>
            <v-footer></v-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import header from './components/header/header';
import menu from './components/menu/menu';
import footer from './components/footer/footer';
import login from './components/login/login';
export default {
  data () {
    return {
      loginState: true,
      loginInfo: {
        user: null,
        password: null
      }
    };
  },
  created () {
    this.loginInfo.user = sessionStorage.getItem('user');
    this.loginInfo.password = sessionStorage.getItem('password');
    if (this.loginInfo.user === null) {
      this.loginState = true;
    } else {
      this.loginState = false;
    }
  },
  methods: {
    loginShow (res) {
      if (res === true) {
        this.loginState = false;
      }
    },
    getloginState (res) {
      console.log(res);
      if (res === true) {
        this.loginState = true;
      }
    }
  },
  components: {
    'v-header': header,
    'v-menu': menu,
    'v-footer': footer,
    'v-login': login
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">

  body, html
    height: 100%
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    & > .app
      height: 100%
      & > .el-container
        width: 100%
        height: 100%
        .el-header
          height: 80px
          background: #23262E
        .el-footer
          height: 60px
          background: #eeeeee
        .el-aside
          background-color: #393D49
        .el-main
          background-color: #fff
</style>
