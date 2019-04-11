<!-- 报价单分解进度 -->
<template>
  <div id="resolveC">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.decompositionCompletionPlan') }}</h3>
      </div>
      <div class="middle">
        {{ $t('dashboard.yourCurrentRanking') }}：{{ total }}
      </div>
      <div class="pic-zhan">
        <div id="echartsResolveC"/>
        <div id="echartsResolveC2"/>
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { searchReportAnalyzeProgress } from '@/api/dashboard'
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
export default {
  name: 'ResolveC',
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
      total: '',
      option: {
        color: ['rgba(34,144,255,1)'],
        title: {
          text: '完成率产业线前5', // this.datas.firstManager.option1
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
          },
          left: '9%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}<br />{c}%'
          // backgroundColor: 'rgba(255,255,255,.9)',
          // textStyle: {
          //   color: '#333'
          // },
          // borderColor: '#8DC3F0',
          // borderWidth: 1
        },
        calculable: true,
        xAxis: [
          {
            axisLabel: {
              interval: 0, // 横轴信息全部显示
              formatter: function(val) {
                return val.length > 3 ? val.substr(0, 3) + '...' : val
              }
            },
            type: 'category',
            axisTick: { show: false },
            data: [
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              }
            ]// this.datas.firstManager.xdata1
          }
        ],
        yAxis: [
          {
            show: false
            // max: 100
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: [], // this.datas.firstManager.ydata1
            // stack: 'sum',
            barWidth: '50%'
          }
        ]
      },
      option2: {
        color: ['rgba(255,158,0,1)'],
        title: {
          text: '完成率产业线后5', // this.datas.firstManager.option2
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
          },
          left: '10%'
        },
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
            axisLabel: {
              interval: 0, // 横轴信息全部显示
              formatter: function(val) {
                return val.length > 3 ? val.substr(0, 3) + '...' : val
              }
            },
            type: 'category',
            axisTick: { show: false },
            data: [
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '',
                textStyle: {
                  fontSize: 12
                }
              }
            ]// this.datas.firstManager.xdata2
          }
        ],
        yAxis: [
          {
            show: false
            // max: 100
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: [], // this.datas.firstManager.ydata2
            stack: 'sum',
            barWidth: '50%'
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['userCode', 'name', 'avatarCode', 'token'])
  },
  mounted() {
    // this.drawLine()
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
    // id116接口
    getData() {
      // console.log('this.userCode', this.userCode)
      var params = {
        // receiverType: this.avatarCode, // 角色this.avatarCode
        // receiverCode: this.token, // 角色编码userCode
        // receiverCode: this.userCode, // 角色编码userCode
        region: this.region, // 区域
        yearOrMonth: '' // 年月度累计标识
      }
      // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   params.receiverType = this.avatarCode
      //   params.receiverCode = this.userCode
      // }
      // if (this.name === 'leader') {
      //   params.receiverType = '0005'
      // } else if (this.name === 'manager') {
      //   params.receiverType = '0003'
      // }
      if (this.time === 'month') {
        params.yearOrMonth = 2
      } else if (this.time === 'year') {
        params.yearOrMonth = 1
      }
      searchReportAnalyzeProgress(params).then(
        res => {
          console.log('id116请求成功', res)
          // 对请求的数据进行处理后再赋值
          // 前5名供应商数据处理
          this.total = res.resultData.reportCountRank.rank
          for (let k = 0; k < res.resultData.reportCountRank.rankBefore.length; k++) {
            this.option.xAxis[0].data[k].value = res.resultData.reportCountRank.rankBefore[k].industryName
            this.option.series[0].data[k] = res.resultData.reportCountRank.rankBefore[k].rate
          }
          // 后5名供应商数据处理
          for (let p = 0; p < res.resultData.reportCountRank.rankAfter.length; p++) {
            this.option2.xAxis[0].data[p].value = res.resultData.reportCountRank.rankAfter[p].industryName
            this.option2.series[0].data[p] = res.resultData.reportCountRank.rankAfter[p].rate
          }
          // echarts绘制
          this.drawLine()
        }
      ).catch(res => {
        console.log('id116请求失败')
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(
        document.getElementById('echartsResolveC')
      )
      // 绘制图表
      myChart.setOption(this.option)

      // 基于准备好的dom，初始化echarts实例
      const myChart2 = this.$echarts.init(
        document.getElementById('echartsResolveC2')
      )
      // 绘制图表
      myChart2.setOption(this.option2)
    }
  }
}
</script>
<style scoped>
#resolveC {
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

.pic-zhan {
  overflow: hidden;
}
.pic-zhan div {
  float: left;
}
#echartsResolveC,
#echartsResolveC2 {
  width: 44%;
  height: 14.5vw;
  margin: 2% 3%;
  margin-top: 5%;
}
</style>
