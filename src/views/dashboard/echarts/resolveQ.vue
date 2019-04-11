<!-- 报价单分解质量 （采购经理）-->
<template>
  <div id="resolveQ">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.quotationBreakdownQuality') }}</h3>
      </div>
      <div class="tablelist">
        <div>
          <span class="span1"/>
          <p>{{ $t('dashboard.quotationsTotal') }}</p>
        </div>
        <div>
          <span class="span2"/>
          <p>{{ $t('dashboard.auditTotalViewTotal') }}</p>
        </div>
        <div>
          <span class="span3"/>
          <p>{{ $t('dashboard.returnTheTotal') }}</p>
        </div>
      </div>
      <div class="echartsBox flexbox">
        <el-tooltip class="item" effect="dark" content="" placement="top">
          <div slot="content">报价单总数:{{ zong1 }}<br>稽核总数/查看总数:{{ cha1 }}<br>退回总数:{{ tui1 }}</div>
          <div id="echartsResolve1"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="" placement="top">
          <div slot="content">报价单总数:{{ zong2 }}<br>稽核总数/查看总数:{{ cha2 }}<br>退回总数:{{ tui2 }}</div>
          <div id="echartsResolve2"/>
        </el-tooltip>
        <div id="echartsResolve3">
          <el-progress :percentage="thirdManager.dataCircle1" :stroke-width="9" :width="90" color="#8400D3" type="circle" />
        </div>
        <div id="echartsResolve4">
          <el-progress :percentage="thirdManager.dataCircle2" :stroke-width="9" :width="90" color="#2FC25B" type="circle" />
        </div>
      </div>
      <div class="boxbottom flexbox">
        <p>{{ $t('dashboard.smallMicro') }}</p>
        <p>{{ $t('dashboard.CPPM') }}</p>
        <p>{{ $t('dashboard.minorAuditReturnRate') }}</p>
        <p>{{ $t('dashboard.returnRateOfPurchasing') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
import { types } from '@/api/dashboard'
export default {
  name: 'ResolveQ',
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
      // 提示信息第一个图
      cha1: '',
      zong1: '',
      tui1: '',
      // 提示信息第二个图
      cha2: '',
      zong2: '',
      tui2: '',
      series: [],
      thirdManager: {
        // 前两个百分比图
        data: [[], []],
        // 圆环信息
        dataCircle1: 0,
        dataCircle2: 0
      }
    }
  },

  computed: {
    ...mapGetters(['avatarCode', 'userCode'])
  },
  mounted() {
    this.setData()
  },
  methods: {
    setData() {
      var params = {
        region: this.region
      }
      // if (judgeUrl() !== '002') {
      //   params.receiverCode = this.userCode
      //   params.receiverType = this.avatarCode
      // }
      // 采购经理,小微主,接口人
      // var params = {
      //   // receiverCode: this.token, // 角色编码
      //   receiverCode: this.userCode, // 角色编码
      //   receiverType: this.avatarCode, // 审核人角色
      //   // userRole: '0002', // 审核人角色
      //   region: this.region
      // }

      if (this.time === 'month') {
        params.yearOrMonth = '2'
      } else if (this.time === 'year') {
        params.yearOrMonth = '1'
      }
      types(params).then(res => {
        var tmp1 = res.resultData
        if (isNaN(tmp1.WT / tmp1.WC * 100)) {
          this.thirdManager.dataCircle1 = 0
        } else {
          this.thirdManager.dataCircle1 = parseInt(tmp1.WT / tmp1.WC * 100)
        }
        if (isNaN(tmp1.CT / tmp1.CC * 100)) {
          this.thirdManager.dataCircle2 = 0
        } else {
          this.thirdManager.dataCircle2 = parseInt(tmp1.CT / tmp1.CC * 100)
        }
        this.$set(this.thirdManager.data, 0, [1, tmp1.WC / tmp1.WZ, tmp1.WT / tmp1.WZ])
        // 第一个图提示信息赋值
        this.cha1 = tmp1.WC
        this.zong1 = tmp1.WZ
        this.tui1 = tmp1.WT
        this.$set(this.thirdManager.data, 1, [1, tmp1.CC / tmp1.CZ, tmp1.CT / tmp1.CZ])
        // 第二个图提示信息赋值
        this.cha2 = tmp1.CC
        this.zong2 = tmp1.CZ
        this.tui2 = tmp1.CT
        // this.thirdManager.data = [[1, tmp1.Cha / tmp1.Zong, tmp1.Tui / tmp1.Zong], [1, tmp2.Cha / tmp2.Zong, tmp2.Tui / tmp2.Zong]]
        // console.log('this.thirdManager.data', this.thirdManager.data)
        var percentage = this.thirdManager.data
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
              tooltip: {
                show: true,
                trigger: 'item',
                axisPointer: {
                  type: 'shadow'
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
        return this.thirdManager
      }).then(res => {
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.getDom('echartsResolve1')
      const myChart2 = this.getDom('echartsResolve2')
      // 绘制图表
      myChart1.setOption({ series: this.series[0] })
      myChart2.setOption({ series: this.series[1] })
    },
    getDom(text) {
      return this.$echarts.init(document.getElementById(text))
    }
  }
}
</script>

<style scoped>
#resolveQ {
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
.tablelist {
  display: flex;
  margin: 1vw 3.52% 2vw;
}
.tablelist div {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 0.8vw;
  color: #4a4a4a;
}
.tablelist span {
  display: inline-block;
  width: 1.5vw;
  height: 0.8vw;
  border-radius: 3px;
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
  margin-top: 12%;
  display: flex;
  justify-content: space-around;
}
.echartsBox {
  height: 7vw;
}
.echartsBox > div {
  width: 25%;
  text-align: center;
}
#echartsResolve3,
#echartsResolve4 {
  box-sizing: border-box;
  padding-top: 2.5%;
}
.boxtop,
.boxbottom {
  font-size: 0.75vw;
  color: #4a4a4a;
}
.boxbottom {
  width: 94%;
  margin: 0 3%;
}
.boxbottom p {
  width: 25%;
  text-align: center;
  margin-top: 1.5%;
}
</style>
