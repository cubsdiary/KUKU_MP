<template>
  <div id="menu">
    <el-menu  class="el-menu-vertical-demo" @select="subSelect" @open="handleOpen" @close="handleClose"  background-color="#393D49" text-color="#f0f0f0" active-text-color="#ffd04b" @router="true">
      <el-submenu index="1"  >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>直播监控</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="livelist"><router-link to="livelist" tag="div">直播列表</router-link></el-menu-item>
          <el-menu-item index="monitordesk"><router-link to="monitordesk" tag="div">直播截图</router-link></el-menu-item>
          <el-menu-item index="liveinfo"><router-link to="liveinfo" tag="div">直播详情</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>直播封停</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="stoplist"><router-link to="stoplist" tag="div">封停列表</router-link></el-menu-item>
          <!-- <el-menu-item index="closestop"><router-link to="closestop" tag="div">解封处理</router-link></el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>机器粉丝</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="anchorlist"><router-link to="anchorlist" tag="div">主播列表</router-link></el-menu-item>
          <el-menu-item index="addfans"><router-link to="addfans" tag="div">加粉列表</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    subSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #menu
    width: 100%
    height: 100%

</style>
