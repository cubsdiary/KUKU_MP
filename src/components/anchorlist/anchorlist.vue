<template>
  <div id="anchor_list">
    <h2>主播列表<i class="el-icon-refresh" @click="goRefresh"></i></h2>
    <el-table  v-loading="loading" :data="arrList" style="width: 100%">
      <el-table-column   type="index" width="100">
      </el-table-column>
      <el-table-column   prop="id" label="房间" width="150" >
      </el-table-column>
      <el-table-column  prop="name"  label="昵称" >
      </el-table-column>
      <el-table-column  prop="gh"  label="工会"  width="250">
      </el-table-column>
      <el-table-column  prop="online"  label="在线状态"  width="100"
        :filters="[{ text: '在线', value: 1 }, { text: '离线', value: 0 }]"
        :filter-method="filterTag"  filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.online === 0 ? 'primary' : 'success'"
            close-transition  v-html="scope.row.online===0?'离线':'在线'"></el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  type="danger"  size="mini" v-show="scope.row.online===1" style="margin-left:10px">加粉</el-button>
          <el-button @click="handleClick(scope.row)"  type="danger"  size="mini" v-show="scope.row.online===0" plain disabled>加粉</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        v-show="anchorLength>0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="anchorLength">
      </el-pagination>
    </div>
    <el-dialog title="增加粉丝" width="30%" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="房间号" :label-width="formLabelWidth" >
          <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" >
          <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="在线状态" :label-width="formLabelWidth" >
          <el-input v-model="form.online===0?'离线':'在线'" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="粉丝数量" :label-width="formLabelWidth" >
          <el-input v-model="form.fans" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFans">立即增加</el-button>
      </div>
    </el-dialog>
    <el-button :plain="true" @click="errMess" v-show="false"></el-button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      anchorList: [],
      loading: true,
      currentPage: 1,
      anchorLength: 0,
      pageSizes: 50,
      arrList: [],
      dialogFormVisible: false,
      form: {
        id: null,
        online: null,
        name: null,
        fans: null
      },
      formLabelWidth: '120px'
    };
  },
  created () {
    this.getAnchorList();
  },
  methods: {
    goRefresh () {
      this.getAnchorList();
      this.errMess('刷洗成功！', 'success');
    },
    getAnchorList () {
      this.$http.jsonp('http://120.55.43.144:9005/api/zblist')
      .then((response) => {
        response = response.body;
        console.log(response);
        if (response.code === 0) {
          this.anchorList = response.data;
          this.anchorLength = this.anchorList.length;
          this.loading = false;
          this.getArray(this.currentPage, this.pageSizes, this.anchorList);
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
    addFans () {
      this.$http.jsonp(
        'http://120.55.43.144:9005/api/roomuser',
        {
          params: {
            room: this.form.id,
            count: this.form.fans
          }
        })
        .then((response) => {
          response = response.body;
          console.log(response);
          if (response.code === 0) {
            this.getAnchorList();
            this.dialogFormVisible = false;
          } else {
            this.dialogFormVisible = false;
            this.errMess('加粉操作失败，请稍后重新操作', 'error');
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
      return row.online === value;
    },
    handleSizeChange (val) {
      this.pageSizes = val;
      this.getArray(this.currentPage, this.pageSizes, this.anchorList);
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getArray(this.currentPage, this.pageSizes, this.anchorList);
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
  #anchor_list
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
