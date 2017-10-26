<template>
  <div id="live_list">
    <h2>直播列表 <i class="el-icon-refresh" @click="goRefresh"></i></h2>
    <el-table  v-loading="loading" :data="arrList" style="width: 100%" :default-sort = "{prop: 'StreamName', order: 'descending'}">
      <el-table-column  prop="StreamName"  label="房间号"  sortable  width="180">
      </el-table-column>
      <el-table-column  prop="UserName"  label="昵称"  width="180">
      </el-table-column>
      <el-table-column  prop="PublishTime"  label="开播时间"  >
      </el-table-column>
      <el-table-column  prop="UserNumber"  label="在线人数"  >
      </el-table-column>
    </el-table>
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
    <el-button :plain="true" @click="errMess" v-show="false"></el-button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      zbList: [],
      arrList: [],
      loading: true,
      currentPage: 1,
      pageSizes: 10,
      imgsLength: null
    };
  },
  created () {
    this.getZBlist();
  },
  methods: {
    goRefresh () {
      this.getZBlist();
      this.errMess('刷新成功!', 'success');
    },
    errMess (err, oss) {
      this.$message({
        showClose: true,
        message: err,
        type: oss
      });
    },
    getZBlist () {
      this.$http.jsonp('http://120.55.43.144:9005/api/online')
      .then((response) => {
        response = response.body;
        console.log(response);
        if (response) {
          this.loading = false;
          this.zbList = response;
          this.imgsLength = this.zbList.length;
          this.getArray(this.currentPage, this.pageSizes, this.zbList);
        }
      });
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
    handleSizeChange (val) {
      this.pageSizes = val;
      this.getArray(this.currentPage, this.pageSizes, this.zbList);
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getArray(this.currentPage, this.pageSizes, this.zbList);
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #live_list
    width: 100%
    height: 100%
    & > h2
      height: 40px
      padding-left: 10px
      background: #4CAF50
      line-height: 40px
      color: #fff
      border-radius: 3px
      i
        float: right
        line-height: 40px
        float-right: 30px
        cursor: pointer
        padding-right: 30px
    .page
      margin: 0px auto
      padding-top: 20px
      width: 100%
      height: 60px
      text-align: center
</style>
