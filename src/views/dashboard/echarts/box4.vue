<!-- 产业线参与度 -->
<template>
  <div id="box4">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.industrialLineParticipation') }}</h3>
      </div>
      <div class="middle">
        <div>
          <p class="p1">{{ $t('dashboard.total4') }}：</p>
          <p class="p2">{{ box4Data.total.total }}{{ $t('dashboard.entries') }}</p>
        </div>
        <div>
          <p class="p1">{{ $t('dashboard.look') }}：</p>
          <p class="p2">{{ box4Data.total.view }}{{ $t('dashboard.entries') }}</p>
        </div>
        <div>
          <p class="p1">{{ $t('dashboard.returned') }}：</p>
          <p class="p2">{{ box4Data.total.reject }}{{ $t('dashboard.entries') }}</p>
        </div>
      </div>
      <div class="tablelist">
        <div>
          <span class="span1"/>
          <p>{{ $t('dashboard.total4') }}</p>
        </div>
        <div>
          <span class="span2"/>
          <p>{{ $t('dashboard.look') }}</p>
        </div>
        <div>
          <span class="span3"/>
          <p>{{ $t('dashboard.returned') }}</p>
        </div>
      </div>
      <div class="boxtop flexbox">
        <div v-for = "(item,index) in box4Data.detail" :key="index">{{ $t('dashboard.tot') }}：{{ item.total }}</div>
        <!-- <div>{{ $t('dashboard.tot') }}：23514</div>
        <div>{{ $t('dashboard.tot') }}：32976</div>
        <div>{{ $t('dashboard.tot') }}：32787</div>
        <div>{{ $t('dashboard.tot') }}：59024</div> -->
      </div>
      <div class="echartsBox flexbox">
        <el-tooltip :content="title[0]" class="item" effect="dark" visible-arrow="false" placement="top-start">
          <div v-show="len>=1" id="echartsbox1"/>
        </el-tooltip>
        <el-tooltip :content="title[1]" class="item" effect="dark" visible-arrow="false" placement="top-start">
          <div v-show="len>=2" id="echartsbox2"/>
        </el-tooltip>
        <el-tooltip :content="title[2]" class="item" effect="dark" visible-arrow="false" placement="top-start">
          <div v-show="len>=3" id="echartsbox3"/>
        </el-tooltip>
        <el-tooltip :content="title[3]" class="item" effect="dark" visible-arrow="false" placement="top-start">
          <div v-show="len>=4" id="echartsbox4"/>
        </el-tooltip>
        <el-tooltip :content="title[4]" class="item" effect="dark" visible-arrow="false" placement="top-start">
          <div v-show="len>=5" id="echartsbox5"/>
        </el-tooltip>
      </div>
      <div class="boxbottom flexbox">
        <p v-for = "(item,index) in box4Data.detail" :key="index">{{ item.industrialLine }}</p>
        <!-- <p>冰冷</p>
        <p>空气</p>
        <p>洗涤</p>
        <p>电厨</p>
        <p>智控</p> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { searchParticipationDegree } from '@/api/dashboard'
export default {
  name: 'Box4',
  components: {},
  props: {
    time: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    show: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      series: [],
      'box4Data': {
        'total': {
          'total': '',
          'reject': '',
          'view': ''
        },
        'detail': [
          {
            'IndustrialLine': '冰冷', // 产业线名称
            'total': '', // 总数
            'reject': '', // 退回数
            'view': '' // 查看数
          }
        ]
      },
      len: '5',
      title: ['', '', '', '', '']
    }
  },

  computed: {},
  mounted() {
    this.setData()
  },
  methods: {
    setData() {
      // var percentage = [
      //   [1, 0.6, 0.3],
      //   [1, 0.8, 0.15],
      //   [1, 0.4, 0.3],
      //   [1, 0.8, 0.65],
      //   [1, 0.7, 0.25]
      // ]
      var _this = this
      const params = { region: this.region }
      if (this.time === 'month') {
        params.yearOrMonth = '2'
      } else if (this.time === 'year') {
        params.yearOrMonth = '1'
      }
      searchParticipationDegree(params).then(res => {
        this.box4Data = res.resultData
        this.len = res.resultData.detail.length
        var percentage = this.box4Data.detail.map(function(value, index, array) {
          var tmp = [1]
          tmp.push(value.view / value.total)
          tmp.push(value.reject / value.total)
          _this.title[index] = '总数:' + value.total + '  查看:' + value.view + '  退回:' + value.reject
          return tmp
        })
        var colors = ['#D4D4D4', '#2290FF', '#FF9E00']
        var labels = ['≥500元：33%', '≥200元：66%', '≥100元：100%']
        var top = 0.6
        var series = this.series
        for (var j = 0; j < percentage.length; j++) {
          var radius = [0.75]
          for (var g = 1; g < percentage[j].length; ++g) {
            radius.push(
              radius[0] / Math.sqrt(percentage[j][0] / percentage[j][g])
            )
          }
          var arr = []
          for (var i = 0; i < percentage[j].length; ++i) {
            arr.push({
              type: 'pie',
              silent: true,
              name: labels[percentage[j].length - i - 1],
              radius: [0, radius[i] * 100 + '%'],
              label: {
                normal: {
                  show: false
                }
              },
              color: [colors[i]],
              center: ['50%', (top + (-radius[i] + radius[0]) / 2) * 90 + '%'],
              data: [
                {
                  value: 1,
                  itemStyle: {
                    normal: {
                      color: colors[i],
                      shadowBlur: 30,
                      shadowColor: 'rgba(0, 0, 0, 0.25)'
                    }
                  }
                }
              ],
              animationType: 'scale'
            })
          }
          series.push(arr)
        }
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.getDom('echartsbox1')
      const myChart2 = this.getDom('echartsbox2')
      const myChart3 = this.getDom('echartsbox3')
      const myChart4 = this.getDom('echartsbox4')
      const myChart5 = this.getDom('echartsbox5')
      // 绘制图表
      myChart1.setOption({ tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      }, series: this.series[0] })
      myChart2.setOption({ series: this.series[1] })
      myChart3.setOption({ series: this.series[2] })
      myChart4.setOption({ series: this.series[3] })
      myChart5.setOption({ series: this.series[4] })
    },
    getDom(text) {
      return this.$echarts.init(document.getElementById(text))
    }
  }
}
</script>
<style scoped>
#box4 {
  width: 100%;
}
.inner {
  width: 100%;
  height: 0;
  padding-bottom: 52%;
  border: 1px solid #d1d1d1;
}
.top {
  width: 100%;
  margin: 3% 0 2.5%;
  display: flex;
  align-items: flex-start;
}
.top h3 {
  margin: 0 3%;
  font-size: 1.25vw;
  color: #4a4a4a;
  font-family: 'PingFangSC';
  font-weight: 500;
}
.top span {
  display: inline-block;
  width: 0.52%;
  height: 0;
  padding-bottom: 3.92%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA8CAYAAABb5PswAAACdklEQVRIS31Vy1ITQRS9pyPg2nLBH4iCoYzlA0TwgWIUy51fkXLBlwTLGB+RstQSFZ9QUhrK+PgH4p5fgIWZmZpr3Z6Z7p5XejM9M6f7nnP73Nu48yfcJ9AeM3dZqc7WHHbJGbj9O+DkHUBIoPbYEbWyMQlPvmP5V8AgaAwTk56De4ePVuoCwvJPuwMBRMwkTwVqbS5UGrjVcwBubEKIUVXFzR8BQ1ZKCGaSuTxlVBSaGuCyTs/RR30nEGZl4wA3dkTFkD2Wur6RmYVp2UvfhWT0K1aonyZ5AkhYJwpSqq5/C2SneMhEtks+gHBt2xfxhSzlKxa3LclsovSxLH71XUrx9smOLAAhWcaBCFe3fPM/oWcYAYQrmw7JgkTg8hcBRCHELMY0iYEEUBZDy7z0WVSU5FpkLnyyMrMkdV7nPw4DMGH+g5OonE4iXHzvWQ65E2HC3IZv/FB0YhpgHOLUhXH5hXfuYRX4YfatV+pJnd3ZN54xTNYPOpMz66IiHhkOwg0z65ZDbgdJ9fnXnjVt3hCEc688W7xxfzArJIUCcMok78mzL71yy4mKMy+cEJn+oPMgAKeQoqJy/XP6uWSyeGh/CsDkKUNRh6itDRyZ6dLVmaytuTLzoVB7JjKjKIV1capj82Al2AWYfmo5GIm2fxCmnzgkixIlAKfhpGtTFlQfOyqy1S1+OPloUNqKRRWm2oPcfeG0PcLUQ2eHIk9OtoaEAA5w4kG5TCjqa0BZrwehieP3ByX3BUKAqxGguBG3/t4bbWBi9V++PwC9yvhIffcuPBxrCsnkvkCoFLXV+MiK/NQWmFj19kPmPRC6lUPc6TfGUlfzf0npeCkVfufUAAAAAElFTkSuQmCC)
    no-repeat;
  background-size: 100%;
}
.middle {
  display: flex;
  margin: 0 3.52%;
}
.middle div {
  display: flex;
  margin-right: 3%;
  align-items: center;
}
.middle .p1 {
  font-size: 0.85vw;
  color: #7f8390;
  font-family: 'PingFangSC';
}
.middle .p2 {
  font-size: 0.92vw;
  color: #4a4a4a;
  font-family: 'PingFangSC';
}
.tablelist {
  display: flex;
  margin: 1vw 3.52% 1.5vw;
}
.tablelist div {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 0.75vw;
  color: #4a4a4a;
}
.tablelist span {
  display: inline-block;
  width: 0.7vw;
  height: 0.7vw;
  border-radius: 50%;
  margin-right: 5px;
}
.span1 {
  background: #dfdfdf;
}
.span2 {
  background: #2290ff;
}
.span3 {
  background: #ff9e00;
}
.flexbox {
  width: 94%;
  margin: 0 3%;
  display: flex;
  justify-content: space-around;
}
.echartsBox {
  height: 7vw;
}
.echartsBox > div {
  width: 20%;
}
.boxtop,
.boxbottom {
  font-size: 0.75vw;
  color: #4a4a4a;
}
.boxbottom {
  border-top: 1px solid #d4d4d4;
  padding: 10px 0;
}
</style>
