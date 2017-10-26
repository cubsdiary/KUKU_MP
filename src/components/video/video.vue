<template>
  <div class="hello">
    <div class="video-css">
      <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied">
      </video-player>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'hello',
  data () {
    return {
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
  computed: {
  },
  methods: {
    onPlayerReadied () {
      if (!this.initialized) {
        this.initialized = true;
      }
    },
    enterStream () {
      this.playerOptions.sources[1].src = this.streams.hls;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
h1,h2
  font-weight: normal
.video-css
  width: 520px
  height: 600px
ul
  list-style-type: none
  padding: 0
li
  display: inline-block
  margin: 0 10px
a
  color: #42b983
.selectWrapper
  display: flex
  justify-content: center
  align-items: center
  font-size: 20px
  line-height: 30px
  margin: 20px
  vertical-align: baseline
.inputWrapper
  margin: 20px
.inputWrapper input
  width: 200px
.buttonWrapper
  text-align: center
</style>
