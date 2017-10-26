<template>
  <div id="login">
    <img src="../../common/img/login.jpg" alt="">
    <div class="login">
      <div class="login-con">
        <div class="login-logo">KUKU</div>
        <div class="login-user">
          <div class="user-icon icon"></div>
          <input type="text" name="" value="" v-model="user">
        </div>
        <div class="login-password">
          <div class="password-icon icon"></div>
          <input type="password" name="" value="" v-model="password">
        </div>
        <div class="login-btn" @click="login">login</div>
        <div class="login-err" v-show="errmsg">密码或用户名错误</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'js-md5';
export default {
  data () {
    return {
      user: null,
      password: null,
      errmsg: false
    };
  },
  methods: {
    login () {
      console.log(md5(this.password));
      this.$http.jsonp(
        'http://120.55.43.144:9005/api/login',
        {
          params: {
            user: this.user,
            pswd: md5(this.password)
          }
        })
        .then((response) => {
          response = response.body;
          console.log(response);
          if (response.code === 0) {
            sessionStorage.setItem('user', this.user);
            sessionStorage.setItem('password', md5(this.password));
            this.$emit('loginshow', true);
          } else {
            this.errmsg = true;
            setTimeout(() => {
              this.errmsg = false;
            }, 2000);
          }
        });
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #login
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 100
    & > img
      display: block;
      width: 100%
      height: 100%
      -webkit-filter:blur(5px);
    .login
      position: absolute;
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: 10
      .login-con
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        width: 500px
        height: 500px
        border-radius: 5px
        .login-logo
          width: 150px
          height: 150px
          background: #fff
          border-radius: 150px
          margin: 0 auto
          text-align: center
          line-height: 150px
          font-size: 30px
          color: #4CAF50
          margin-bottom: 120px
        .login-user, .login-password
          width: 300px
          height: 40px
          border-radius: 40px
          margin: 0 auto
          margin-bottom: 30px
          border: 1px solid #fff
          overflow: hidden
          .icon
            width: 60px
            height: 40px
            float: left
          .user-icon
            background: url(../../common/img/user.png) no-repeat center center
            background-size: 20px 20px
          .password-icon
            background: url(../../common/img/password.png) no-repeat center center
            background-size: 25px 25px
          input
            padding: 0 10px
            width: 220px
            height: 40px
            float: right
            outline: none
            border: none
            font-size: 18px
            color: #fff
            background: none
        .login-btn
          width: 300px
          height: 40px
          background: #fff
          border-radius: 40px
          line-height: 40px
          text-align: center
          font-size: 20px
          color: #4CAF50
          margin: 0 auto
          cursor: pointer
        .login-err
          width: 300px
          height: 40px
          border-radius: 5px
          border:1px solid rgba(255,0,0,0.6)
          text-align: center
          line-height: 40px
          background: rgba(255,21,0,0.3)
          color: #fff
          margin: 0 auto
          margin-top:30px
</style>
