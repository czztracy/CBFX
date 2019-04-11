<!-- 报价单分解进度 -->
<template>
  <div id="box1">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.decompositionCompletionPlan') }}</h3>
      </div>
      <div class="middle">
        <div>
          <p class="p1">{{ $t('dashboard.total') }}:</p>
          <!-- 报价单总数 -->
          <p class="p2">{{ total }}{{ $t('dashboard.entries') }}</p>
        </div>
        <div>
          <p class="p1">{{ $t('dashboard.resolved') }}:</p>
          <!-- 已分解 -->
          <p class="p2">{{ Decomposed }}{{ $t('dashboard.entries') }}</p>
        </div>
        <div>
          <p class="p1">{{ $t('dashboard.deconstructing') }}:</p>
          <!-- 分解中 -->
          <p class="p2">{{ Decomposition }}{{ $t('dashboard.entries') }}</p>
        </div>
        <div>
          <p class="p1">{{ $t('dashboard.undecomposed') }}:</p>
          <!-- 未分解 -->
          <p class="p2">{{ UnDecomposed }}{{ $t('dashboard.entries') }}</p>
        </div>
      </div>
      <div id="echartsBox1"/>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
import { searchReportAnalyzeProgress } from '@/api/dashboard'
// import { judgeUrl } from '@/utils/api'
export default {
  name: 'Box1',
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
      total: 0, // 总数
      Decomposed: 0, // 已分解
      Decomposition: 0, // 分解中
      UnDecomposed: 0, // 未分解
      option: {
        color: [
          'rgba(5,205,0,1)',
          'rgba(34,144,255,1)',
          'rgba(255,158,0,1)',
          'rgba(204,204,204,1)'
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // data: this.datas.firstMicro.dataMark,
          orient: 'vertical',
          left: 0
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLabel: {
              formatter: function(val) {
                return val.length > 3 ? val.substr(0, 3) + '...' : val
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
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // },
              // {
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // },
              // {
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // },
              // {
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // },
              // {
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // },
              // {
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // },
              // {
              //   value: '',
              //   textStyle: {
              //     fontSize: 16
              //   }
              // }
            ] // this.datas.firstMicro.xdata
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
            // max: 900
          }
        ],
        series: [
          {
            name: '已分解', // this.datas.firstMicro.dataMark[0]
            type: 'bar',
            data: [], // this.datas.firstMicro.ydata1 this.data1
            // stack: 'sum',
            barWidth: 10
          },
          {
            name: '分解中', // this.datas.firstMicro.dataMark[1]
            type: 'bar',
            data: [], // this.datas.firstMicro.ydata2 this.data2
            // stack: 'sum',
            barWidth: 10
          },
          {
            name: '未分解', // this.datas.firstMicro.dataMark[2]
            type: 'bar',
            data: [], // this.datas.firstMicro.ydata3 this.data3
            // stack: 'sum',
            barWidth: 10
          },
          {
            name: '总量', // this.datas.firstMicro.dataTotal
            type: 'bar',
            data: [], // this.datas.firstMicro.ydata4 this.data4
            // label: {
            //   show: true,
            //   color: '#000',
            //   position: 'insideBottom',
            //   fontSize: 14
            // },
            // stack: 'sum',
            barWidth: 10
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'avatarCode', 'token', 'userCode'])
  },
  mounted() {
    // console.log('this.region', this.region)
    // console.log('this.time', this.time)
    // this.$axios('http://localhost:53000/test').then(res => {
    //   this.datas.firstMicro = res.data.resultData.data
    //   console.log(res)
    // })
    // Eventbus.$on('show', (show) => {
    //   this.show = show
    //   // console.log('this.show1', this.show)
    //   if (this.show.box1) {
    //     console.log('box1')
    //     this.getData()
    //   }
    // })
    this.getData()
  },
  methods: {
    // id116接口
    getData() {
      var params = {
        // receiverType: this.avatarCode, // 角色this.avatarCode
        // receiverCode: this.token, // 角色编码userCode
        // receiverCode: this.userCode, // 角色编码userCode
        region: this.region, // 区域
        yearOrMonth: '' // 年月度累计标识
      }
      // // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   params.receiverType = this.avatarCode
      //   params.receiverCode = this.userCode
      // }
      // if (this.name === 'micro') {
      //   params.receiverType = '0001'
      // }
      if (this.time === 'month') {
        params.yearOrMonth = 2
      } else if (this.time === 'year') {
        params.yearOrMonth = 1
      }
      // console.log('首页9999params', params)
      searchReportAnalyzeProgress(params).then(
        res => {
          console.log('id116请求成功', res)
          // 对请求的数据进行处理后再赋值
          // 判断长度最多显示4条
          // if (res.resultData.reportCountForIndustry.length >= 6) {
          //   res.resultData.reportCountForIndustry.length = 5
          // }
          for (let m = 0; m < res.resultData.reportCountForIndustry.length; m++) {
            this.option.series[0].data[m] = res.resultData.reportCountForIndustry[m].reportCountForDecomposed // 已分解
            this.option.series[1].data[m] = res.resultData.reportCountForIndustry[m].reportCountForDecomposition // 分解中
            this.option.series[2].data[m] = res.resultData.reportCountForIndustry[m].reportCountForundecomposed // 未分解
            this.option.series[3].data[m] = res.resultData.reportCountForIndustry[m].reportCountSum // 总数
            // x轴数据更改
            this.option.xAxis[0].data.push({
              value: res.resultData.reportCountForIndustry[m].industryName,
              textStyle: {
                fontSize: 16
              }
            })
            // 产业线名称
            // this.option.xAxis[0].data[m].value = res.resultData.reportCountForIndustry[m].industryName // 产业线名称
          }

          this.total = res.resultData.reportCount.reportCountSum
          this.Decomposed = res.resultData.reportCount.reportCountForDecomposed
          this.Decomposition = res.resultData.reportCount.reportCountForDecomposition
          this.UnDecomposed = res.resultData.reportCount.reportCountForundecomposed
          // echarts绘制
          this.drawLine()
        }
      ).catch(res => {
        console.log('id116请求失败')
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echartsBox1'))
      // 绘制图表
      myChart.setOption(this.option)
      // console.log('this.option', this.option)
    }
  }
}
</script>
<style scoped>
#box1 {
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
  margin-right: 2%;
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
#echartsBox1 {
  width: 94%;
  height: 16vw;
  margin: 3% 3%;
}
</style>
