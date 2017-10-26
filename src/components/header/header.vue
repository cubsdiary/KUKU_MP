<template>
  <div id="header">
    <div class="logo">KUKU Live</div>

    <div class="login">
      <div class="user-img">
        <!-- <img :src="" alt="" v-show=""> -->
        <img src="../../common/img/headimg.png" alt="" v-show="true">
      </div>
      <div class="user-name">admin</div>
      <div class="user-back" @click="_goback"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        deskShow: true
      };
    },
    methods: {
      _goback () {
        sessionStorage.clear();
        this.$emit('getloginstate', true);
      }
    }
  };
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #header
    width: 100%
    height: 100%
    .logo
      float: left
      width: 280px
      height: 100%
      text-align: center;
      line-height: 80px
      font-size: 30px
      font-weight: 300
      color: #4CAF50
    .login
      float: right
      min-width: 180px
      height: 65px
      padding-top: 15px
      .user-img
        float: left
        width: 50px
        height: 50px
        border-radius: 50px
        overflow: hidden
        cursor: pointer
        img
          display: block
          width: 50px
          height: 50px
      .user-name
        float: left
        min-width: 60px
        height: 50px
        padding: 0px 10px
        text-align: center
        line-height: 50px
        color: #fff
        font-size: 14px
        cursor: pointer
      .user-back
        float: left
        width: 50px
        height: 50px
        background: url(../../common/img/back.png) no-repeat center center
        background-size: 30px 30px
        cursor: pointer
</style>
