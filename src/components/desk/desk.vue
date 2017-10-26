<template>
  <div id="desk">
    <div id="wrapper" >
			<div id="scroller" ref="scroller">
			  <ul>
          <li  v-for="(item,index) in arrList" @click="getUserId(item.StreamName)">
            <div class="mask">{{item.StreamName}}</div>
            <img :src="item.image_url" alt="">
          </li>
			  </ul>
			</div>
		</div>
    <div class="page">
      <el-pagination
        v-show="imgsLength>0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="imgsLength">
      </el-pagination>
    </div>
    <div class="stoproom" v-if="showRoom">
      <i class="el-icon-circle-close" @click="closeStop"></i>
      <stop-room :userid="userid"></stop-room>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
import stopRoom from '../liveinfo/liveinfo';
export default {
  data () {
    return {
      anchor: [],
      arrList: [],
      currentPage: 1,
      pageSizes: 20,
      imgsLength: null,
      timer: null,
      userid: null,
      showRoom: false
    };
  },
  created () {
    this.getImgsInfo();
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.getImgsInfo();
    }, 15000);
  },
  methods: {
    closeStop () {
      this.showRoom = false;
    },
    getUserId (id) {
      this.userid = id;
      this.showRoom = true;
    },
    getArray (page, num, arr) {
      var arrBox = [];
      for (let [index, elem] of arr.entries()) {
        if (index < (page * num) &&
         index > ((page - 1) * num - 1)) {
          arrBox.push(elem);
        }
      }
      this.arrList = arrBox;
    },
    getImgsInfo () {
      this.$http.jsonp('http://120.55.43.144:9005/api/alimage')
      .then((response) => {
        response = response.body;
        console.log(response);
        this.anchor = response;
        this.imgsLength = this.anchor.length;
        this.getArray(this.currentPage, this.pageSizes, this.anchor);
      });
    },
    handleSizeChange (val) {
      this.pageSizes = val;
      this.getArray(this.currentPage, this.pageSizes, this.anchor);
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getArray(this.currentPage, this.pageSizes, this.anchor);
    }
  },
  components: {
    'stop-room': stopRoom
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #desk
    width: 100%
    height: 100%
    position: relative
    .page
      margin: 0px auto
      padding-top: 10px
      width: 100%
      height: 50px
      text-align: center
    #wrapper
      overflow: hidden
      #scroller
        width: 100%
        height: 100%
        li
          position: relative
          width: 210px
          height: 350px
          float: left
          border-radius: 5px
          overflow:hidden
          margin: 5px
          cursor: pointer
          .mask
            position: absolute
            width: 100%
            height: 50px
            left: 0
            bottom: 0
            background: rgba(255, 255, 255, 0.5)
            text-align: center
            line-height: 50px
            font-size: 20px
            color: #212121
          img
            display: block
            width: 100%
            height: 100%
    .stoproom
      position: absolute
      left: 0
      top:0
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.8)
      z-index: 100
      i
        position: absolute
        right: 0
        top: 0
        font-size: 30px
        color: #fff
        cursor: pointer

</style>
