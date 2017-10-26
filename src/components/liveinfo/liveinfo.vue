<template>
  <div id="live_info" >
    <div class="videoform">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间号">
          <el-input v-model="form.room"></el-input>
        </el-form-item>
        <el-form-item label="封停时间">
          <el-select v-model="form.flag" placeholder="请选择封停时间">
            <el-option label="1小时禁止推流" value="1"></el-option>
            <el-option label="一周禁止推流" value="2"></el-option>
            <el-option label=" 一个月禁止推流" value="3"></el-option>
            <el-option label="永久禁止" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封停原因">
          <el-input type="textarea" v-model="form.why"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPush">立即查看</el-button>
          <el-button type="danger" @click="onSubmit">立即封停</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="video">
      <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied">
      </video-player>
    </div>
    <el-button :plain="true" @click="errMess" v-show="false"></el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vvideo from '../video/video';
  export default {
    props: {
      userid: {
        type: String
      }
    },
    data () {
      return {
        form: {
          room: '',
          flag: '',
          why: '',
          isSub: true
        },
        initialized: false,
        playerOptions: {
          autoplay: false,
          controls: true,
          width: 520,
          height: 600,
          techOrder: ['html5'],
          sourceOrder: true,
          flash: { hls: { withCredentials: false } },
          html5: { hls: { withCredentials: false } },
          sources: [{
            type: 'rtmp/mp4',
            src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
          }, {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
          }],
          poster: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/cover.jpg'
        }
      };
    },
    created () {
      if (this.userid) {
        this.form.room = this.userid;
        this.getPush();
      }
    },
    methods: {
      onPlayerReadied () {
        if (!this.initialized) {
          this.initialized = true;
        }
      },
      errMess (err, omg) {
        this.$message({
          message: err,
          type: omg
        });
      },
      getPush () {
        this.$http.jsonp(
          'http://120.55.43.144:9005/api/bofdz',
          {
            params: {
              streamname: this.form.room,
              type: 3
            }
          })
          .then((response) => {
            response = response.body;
            if (response.code === 0) {
              console.log(response.auth);
              this.playerOptions.sources[1].src = response.auth;
              this.playerOptions.autoplay = true;
            } else {
              this.errMess('拉流失败，请稍后重新操作', 'error');
            }
          });
      },
      onSubmit () {
        if (this.form.room === null || this.form.room === '') {
          this.form.isSub = false;
        }
        if (this.form.flag === null || this.form.falg === '') {
          this.form.isSub = false;
        }
        if (this.form.why === null || this.form.why === '') {
          this.form.isSub = false;
        }
        console.log(this.form.isSub);
        if (this.form.isSub) {
          this.$http.jsonp(
            'http://120.55.43.144:9005/api/forbid',
            {
              params: {
                room: this.form.room,
                flag: this.form.flag,
                why: this.form.why
              }
            })
            .then((response) => {
              response = response.body;
              console.log(response);
              if (response.code === 0) {
                this.errMess('封停处理成功！', 'success');
              } else {
                this.errMess('封停处理失败，请稍后重新操作', 'error');
              }
            });
        }
      }
    },
    components: {
      'v-video': Vvideo
    }
  };
</script>

<style  lang="stylus" rel="stylesheet/stylus">
#live_info
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  margin: auto
  width: 1220px
  height: 600px
  background: #fff
  .videoform
    padding-top: 150px
    width: 500px
    height: 450px
    float: left
    margin-left: 100px
  .video
    width: 520px
    height: 600px
    float: left
    margin-left: 100px
    img
      display: block
      width: 520px
      height: 600px
</style>
