<template>
  <div id="stoplist">
    <h2>封停列表 <i class="el-icon-refresh" @click="goRefresh"></i></h2>

    <el-table  v-loading="loading" :data="arrList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="封停原因">
              <span>{{ props.row.why }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column   type="index" width="100">
      </el-table-column>
      <el-table-column   prop="id" label="房间" width="150" >
      </el-table-column>
      <el-table-column  prop="ali_no"  label="任务ID" >
      </el-table-column>
      <el-table-column  prop="do_time"  label="封停时间" >
      </el-table-column>
      <el-table-column  prop="end_time"  label="解除时间"  width="250">
      </el-table-column>
      <el-table-column  prop="state"  label="封停状态"  width="100"
        :filters="[{ text: '封号中（禁止推流）', value: 1 }, { text: '已解封', value: 2 }, { text: '自动解封（暂时停止推流）', value: 3 }]"
        :filter-method="filterTag"  filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === 2 ? 'success' : 'primary'"
            close-transition  v-html="scope.row.state===2?'已解封':'已封号'"></el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  type="danger" size="mini" v-show="scope.row.state!==2" style="margin-left:10px">解除封号</el-button>
          <el-button @click="handleClick(scope.row)"  type="danger" size="mini" v-show="scope.row.state===2" plain disabled>解除封号</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        v-show="overLength>0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="overLength">
      </el-pagination>
    </div>
    <el-dialog title="解除封号" width="30%" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="房间号" :label-width="formLabelWidth" >
          <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="封停时间" :label-width="formLabelWidth" >
          <el-input v-model="form.do_time" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="解封时间" :label-width="formLabelWidth" >
          <el-input v-model="form.end_time" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-alert  title="封停原因" type="info" :closable="false"  :description="form.why" show-icon>
        </el-alert>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="killOver">立即解封</el-button>
      </div>
    </el-dialog>
    <el-button :plain="true" @click="errMess" v-show="false"></el-button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      overList: [],
      loading: true,
      currentPage: 1,
      overLength: 0,
      pageSizes: 10,
      arrList: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px'
    };
  },
  created () {
    this.getOverList();
  },
  methods: {
    goRefresh () {
      this.getOverList();
      this.errMess('刷新成功！', 'success');
    },
    getOverList () {
      this.$http.jsonp('http://120.55.43.144:9005/api/getlist')
      .then((response) => {
        response = response.body;
        console.log(response);
        if (response.code === 0) {
          this.overList = response.data;
          this.overLength = this.overList.length;
          this.loading = false;
          this.getArray(this.currentPage, this.pageSizes, this.overList);
        }
      });
    },
    errMess (err, oss) {
      this.$message({
        showClose: true,
        message: err,
        type: oss
      });
    },
    killOver () {
      this.$http.jsonp(
        'http://120.55.43.144:9005/api/getbid',
        {
          params: {
            room: this.form.id
          }
        })
        .then((response) => {
          response = response.body;
          console.log(response);
          if (response.code === 0) {
            this.getOverList();
            this.dialogFormVisible = false;
          } else {
            this.dialogFormVisible = false;
            this.errMess('解除封号失败，请稍后继续操作！', 'error');
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
    filterTag (value, row) {
      return row.state === value;
    },
    handleSizeChange (val) {
      this.pageSizes = val;
      this.getArray(this.currentPage, this.pageSizes, this.overList);
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getArray(this.currentPage, this.pageSizes, this.overList);
    },
    handleClick (row) {
      console.log(row);
      this.form = row;
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  #stoplist
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
