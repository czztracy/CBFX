<!-- 供应商分解进度（采购经理 查看） -->
<template>
  <div id="box3">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.supplierBreakdownSchedule') }}</h3>
      </div>
      <div id="echartsToeflC"/>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
import { supplierDecompositionProgress } from '@/api/dashboard'
export default {
  name: 'ToeflC',
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
      // show: {},
      option: {
        color: ['rgba(34,144,255,1)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}<br />{c}%'
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLabel: {
              formatter: function(val) {
                return val.length > 4 ? val.substr(0, 3) + '...' : val
              },
              textStyle: {
                fontSize: 12,
                width: 20
              },
              interval: 0
              // rotate: 15
            },
            data: [
              // {
              //   value: '供应商A',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // }
            ]
          }
        ],
        yAxis: [
          {
            show: true,
            max: 100,
            axisLine: {
              lineStyle: {
                width: 0,
                color: '#CCC'
              }
            },
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: [45, 50, 69, 38, 69, 58],
            label: {
              formatter: '{c}%',
              show: true,
              color: '#4A4A4A',
              position: 'top',
              fontSize: 14
            },
            barWidth: '40%'
          }
        ]
      },
      'resultData': [{
        'supplierName': '供应商A',
        'progress': '0'
      }, {
        'supplierName': '供应商B',
        'progress': '0'
      }]

    }
  },

  computed: {
    ...mapGetters(['avatarCode', 'userCode'])
  },
  mounted() {
    // Eventbus.$on('show', (show) => {
    //   this.show = show
    //   // console.log('this.show1', this.show)
    //   if (this.show.resolveCManager) {
    //     this.getData()
    //   }
    // })
    this.getData()
  },
  methods: {
    getData() {
      // var resultData = [{
      //   'supplierName': '供应商A',
      //   'progress': '80'
      // }, {
      //   'supplierName': '供应商B',
      //   'progress': '70'
      // }]
      // var params = { region: this.region, managercode: this.userCode }
      var params = { region: this.region }
      // if (judgeUrl() !== '002') {
      //   params.managercode = this.userCode
      // }
      if (this.time === 'month') {
        params.yearOrMonth = '2'
      } else if (this.time === 'year') {
        params.yearOrMonth = '1'
      }
      // 查询供应商分解进度 id109
      supplierDecompositionProgress(params).then(res => {
        this.resultData = res.resultData
        // console.log('this.resultData', this.resultData)
        this.option.xAxis[0].data = this.resultData.map(function(value, index, array) {
          var tmp1 =
          {
            value: value.supplierName
            // textStyle: {
            //   fontSize: 16
            // }
          }
          return tmp1
        })
        this.option.series[0].data = this.resultData.map(function(value, index, array) {
          return value.progress
        })
        // console.log(this.option.xAxis.data)
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(
        document.getElementById('echartsToeflC')
      )
      // 绘制图表
      myChart.setOption(this.option)
      // console.log(this.option)
    }
  }
}
</script>
<style scoped>
#box3 {
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
#echartsToeflC {
  width: 94%;
  height: 16vw;
  margin: 2% 3%;
}
</style>
