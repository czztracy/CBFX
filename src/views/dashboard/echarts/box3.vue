<!-- 报价单分解质量（小微） -->
<template>
  <div id="box3">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.quotationBreakdownQuality') }}</h3>
      </div>
      <div id="echartsBox3"/>
    </div>
  </div>
</template>

<script>
import { weiTypes } from '@/api/dashboard'
export default {
  name: 'Box3',
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
      option: {
        color: ['rgba(34,144,255,1)', 'rgba(255,158,0,1)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['采购经理查看退回率', '商务小微查看退回率'],
          left: 0
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: []
          }
        ],
        yAxis: [
          {
            show: false
          }
        ],
        series: [
          {
            name: '采购经理查看退回率',
            type: 'bar',
            data: [],
            label: {
              formatter: '{c}%',
              show: true,
              color: '#4A4A4A',
              position: 'top',
              fontSize: 14
            },
            barWidth: 25
          },
          {
            name: '商务小微查看退回率',
            type: 'bar',
            data: [],
            label: {
              formatter: '{c}%',
              show: true,
              color: '#4A4A4A',
              position: 'top',
              fontSize: 14
            },
            barWidth: 25
          }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // 接口数据 id 134
      // var resultData = [
      //   {
      //     'manager': '0.20',
      //     'micro': '0.80',
      //     'name': '冰冷'
      //   }
      // ]
      var params = {
        region: this.region
      }
      if (this.time === 'month') {
        params.yearOrMonth = '2'
      } else if (this.time === 'year') {
        params.yearOrMonth = '1'
      }
      weiTypes(params).then(res => {
        this.option.xAxis[0].data = res.resultData.map(function(value, index, array) {
          return ({
            value: value.name,
            textStyle: {
              fontSize: 16
            }
          })
        })
        this.option.series[0].data = res.resultData.map(function(value, index, array) {
          return value.manager * 100
        })
        this.option.series[1].data = res.resultData.map(function(value, index, array) {
          return value.micro * 100
        })
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echartsBox3'))
      // 绘制图表
      myChart.setOption(this.option)
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
#echartsBox3 {
  width: 94%;
  height: 16vw;
  margin: 2% 3%;
}
</style>
