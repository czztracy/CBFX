<!-- 报价单分解质量（供应商） -->
<template>
  <div id="supplierResolveQ">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.quotationBreakdownQuality') }}</h3>
      </div>
      <div class="echartsBox flexbox">
        <el-tooltip placement="top">
          <div slot="content">{{ $t('dashboard.total4') }}:  {{ num.GZ }}<br>{{ $t('dashboard.returnNum') }}: {{ num.GT }}</div>
          <div id="echartsSupplier">
            <el-progress :percentage="returnPer" :stroke-width="9" color="#289DF5" type="circle" />
            <p>{{ $t('dashboard.quotationReturnRate') }}</p>
            <span>{{ num.GT }}次<br>退回数量</span>
          </div>
        </el-tooltip>

        <div id="echartsSupplier2"/>
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
import { suggestions, types } from '@/api/dashboard'
export default {
  name: 'SupplierResolveQ',
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
      num: {
        'GZ': '0', // (总数)
        'GT': '0' // (退回数)
      },
      returnPer: 0, // (退回率)
      option2: {
        color: ['rgba(255,158,0,1)'],
        title: {
          text: '报价单退回原因',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
          },
          left: 'center',
          bottom: 0
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
              {
                value: '缺少材料',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '数据逻辑',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '缺少材料',
                textStyle: {
                  fontSize: 12
                }
              },
              {
                value: '数据逻辑',
                textStyle: {
                  fontSize: 12
                }
              }
            ]
          }
        ],
        yAxis: [
          {
            show: false
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: [20, 40, 60, 80],
            stack: 'sum',
            label: {
              formatter: '{c}次',
              show: true,
              color: '#4A4A4A',
              position: 'top',
              fontSize: 14
            },
            barWidth: '40%'
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['avatarCode', 'loginName'])
  },
  mounted() {
    // Eventbus.$on('show', (show) => {
    //   this.show = show
    //   // console.log('this.show1', this.show)
    //   if (this.show.supplierResolveQ) {
    //     this.getData()
    //   }
    // })
    this.getData()
  },
  methods: {
    getData() {
      // id 120 查询报价单质量分布
      // var params = {
      //   // 供应商
      //   region: this.region,
      //   receiverType: this.avatarCode, // 审核人角色	receiverType
      //   supplierCode: this.loginName // 供应商编码
      // }
      var params = {
        // 供应商
        region: this.region
      }
      // if (judgeUrl() !== '002') {
      //   params.receiverType = this.avatarCode
      //   params.supplierCode = this.loginName
      // }

      if (this.time === 'month') {
        params.yearOrMonth = '2'
      } else if (this.time === 'year') {
        params.yearOrMonth = '1'
      }
      suggestions(params).then(res => {
        // var resultData = res.resultData
        // var resultData = [
        //   {
        //     name: '包运储费异常数量',
        //     value: '1212'
        //   }
        // ]
        var resultData = res.resultData.sort(this.sortNumber)
        // var sum = this.sum(resultData)
        var _this = this
        this.option2.series[0].data = resultData.map(function(value, index, array) {
          if (index <= 3) {
            _this.option2.xAxis[0].data[index].value = value.name
            return value.value
          }
        })
        // var params1 = {
        // // 供应商
        //   region: this.region,
        //   receiverType: this.avatarCode,
        //   supplierCode: this.loginName// 供应商编码
        // }
        var params1 = {
        // 供应商
          region: this.region
        }
        // if (judgeUrl() !== '002') {
        //   params1.receiverType = this.avatarCode
        //   params1.supplierCode = this.loginName
        // }
        if (this.time === 'month') {
          params1.yearOrMonth = 2
        } else if (this.time === 'year') {
          params1.yearOrMonth = 1
        }
        types(params1).then(res => {
          this.num = res.resultData
          if (res.resultData.GZ !== 0 && res.resultData.GZ !== '0') {
            this.returnPer = Math.round(this.num.GT / this.num.GZ * 100)
            if (isNaN(this.returnPer)) {
              this.returnPer = 0
            }
            // console.log('this.returnPer', isNaN(this.returnPer))
          }
          this.drawLine()
          // console.log('supplierResolveQ')
        })
      })
    },
    // 排序
    sortNumber(a, b) {
      return b.value - a.value
    },
    // 求和
    sum(arr) {
      var s = 0
      for (var i = arr.length - 1; i >= 0; i--) {
        s += parseInt(arr[i].value)
      }
      return s
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart2 = this.$echarts.init(
        document.getElementById('echartsSupplier2')
      )
      // 绘制图表
      myChart2.setOption(this.option2)
    }
  }
}
</script>

<style>
#echartsSupplier .el-progress--circle .el-progress__text,
#echartsSupplier2 .el-progress--circle .el-progress__text {
  top: 40%;
}
</style>

<style scoped>
#supplierResolveQ {
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
.flexbox {
  width: 94%;
  margin: 0 3%;
  margin-top: 2%;
  display: flex;
  justify-content: space-around;
}
.echartsBox {
  height: 14vw;
}
.echartsBox > div {
  width: 33.3%;
  text-align: center;
  position: relative;
}
.echartsBox > div > p {
  margin-top: 4%;
}
.echartsBox > div > span {
  position: absolute;
  left: 0;
  top: 40%;
  width: 100%;
  text-align: center;
  font-size: 0.5vw;
}
.echartsBox > div > span em {
  font-style: normal;
}
#echartsSupplier,
#echartsSupplier2 {
  box-sizing: border-box;
  padding-top: 2%;
}
#echartsSupplier {
  width: 40%;
  margin-top: 2vw;
}
#echartsSupplier2 {
  width: 60%;
  height: 12vw;
}
</style>
