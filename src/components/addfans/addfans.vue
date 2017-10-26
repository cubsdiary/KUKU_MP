<template>
  <div id="add_fans">
    <h2>加粉历史<i class="el-icon-refresh" @click="goRefresh"></i></h2>
    <el-table  v-loading="loading" :data="arrList" style="width: 100%">
      <el-table-column   type="index" width="100">
      </el-table-column>
      <el-table-column   prop="userid" label="房间" width="150" >
      </el-table-column>
      <el-table-column  prop="ctime"  label="增加时间" width="250">
      </el-table-column>
      <el-table-column  prop="fans"  label="粉丝数量" >
      </el-table-column>
      <el-table-column  prop="state"  label="增加状态"  >
      </el-table-column>
      <el-table-column  prop="online"  label="在线状态"  width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.online === 0 ? 'primary' : 'success'"
            close-transition  v-html="scope.row.online===0?'离线':'在线'"></el-tag>
        </template>
      </el-table-column>
      <el-table-column  prop="state"  label="成功状态"  width="100"
        :filters="[{ text: '成功', value: '增加完成' }, { text: '失败', value: '已增加' }]"
        :filter-method="filterTag"  filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === '已增加' ? 'primary' : 'success'"
            close-transition  v-html="scope.row.state==='已增加'?'增加失败':'增加成功'"></el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  type="danger" size="mini" v-show="scope.row.state==='增加完成'" style="margin-left:10px">移除粉丝</el-button>
          <el-button @click="handleClick(scope.row)"  type="danger" size="mini" v-show="scope.row.state==='已增加'" plain disabled>移除粉丝</el-button>
          <el-button @click="handleClick(scope.row)"  type="danger" size="mini" v-show="scope.row.state==='已取消'" plain disabled>移除粉丝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        v-show="fansLength>0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="fansLength">
      </el-pagination>
    </div>
    <el-dialog title="移除粉丝" width="30%" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="房间号" :label-width="formLabelWidth" >
          <el-input v-model="form.userid" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="粉丝数量" :label-width="formLabelWidth" >
          <el-input v-model="form.fans" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="在线状态" :label-width="formLabelWidth" >
          <el-input v-model="form.online===0?'离线':'在线'" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-alert  title="移除粉丝说明" type="info" :closable="false"  description="只有当主播离线才能移除粉丝，并且一次移除全部机器粉丝" show-icon>
        </el-alert>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="moveFans">立即移除</el-button>
      </div>
    </el-dialog>
    <el-button :plain="true" @click="errMess" v-show="false"></el-button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      fansList: [],
      loading: true,
      currentPage: 1,
      fansLength: 0,
      pageSizes: 10,
      arrList: [],
      dialogFormVisible: false,
      form: {
        userid: null,
        online: null,
        fans: null
      },
      formLabelWidth: '120px'
    };
  },
  created () {
    this.getFansList();
  },
  methods: {
    goRefresh () {
      this.getFansList();
      this.errMess('刷新成功！', 'success');
    },
    getFansList () {
      this.$http.jsonp('http://120.55.43.144:9005/api/getroomuserlog')
      .then((response) => {
        response = response.body;
        console.log(response);
        if (response.code === 0) {
          this.fansList = response.data;
          this.fansLength = this.fansList.length;
          this.loading = false;
          this.getArray(this.currentPage, this.pageSizes, this.fansList);
        }
      });
    },
    errMess (msg, err) {
      this.$message({
        showClose: true,
        message: msg,
        type: err
      });
    },
    moveFans () {
      console.log(this.form.userid);
      this.$http.jsonp(
        'http://120.55.43.144:9005/api/removeuser',
        {
          params: {
            room: this.form.userid
          }
        })
        .then((response) => {
          response = response.body;
          console.log(response);
          if (response.code === 0) {
            this.getFansList();
            this.dialogFormVisible = false;
          } else {
            this.dialogFormVisible = false;
            this.errMess('移除粉丝操作失败，请稍后重新操作', 'error');
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
      this.getArray(this.currentPage, this.pageSizes, this.fansList);
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getArray(this.currentPage, this.pageSizes, this.fansList);
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
  #add_fans
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
