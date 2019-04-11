<!-- 报价单质量分布 -->
<template>
  <div id="box2">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.quotationQualityDistribution') }}</h3>
        <div class="seleBox">
          <el-select v-model="value" placeholder="" @change="drawLine()">
            <el-option v-for="item in seleOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div id="echartsBox2"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box2',

  components: {},
  data() {
    return {
      seleOptions: [
        {
          value: '选项1',
          label: '冰冷'
        },
        {
          value: '选项2',
          label: '空气'
        },
        {
          value: '选项3',
          label: '洗涤'
        },
        {
          value: '选项4',
          label: '电厨'
        },
        {
          value: '选项5',
          label: '智控'
        }
      ],
      value: '选项1',
      optionDatas: {
        选项1: [[0, 0.3, 420], [1, 0.4, 1025], [2, 0.5, 220], [2.5, 0.3, 151]],
        选项2: [[0, 0.3, 420], [1, 0.4, 1125], [2, 0.5, 220], [2.5, 0.3, 151]],
        选项3: [[0, 0.3, 420], [1, 0.4, 1025], [2, 0.5, 210], [2.5, 0.3, 151]],
        选项4: [[0, 0.3, 320], [1, 0.4, 1025], [2, 0.5, 220], [2.5, 0.3, 151]],
        选项5: [[0, 0.3, 420], [1, 0.4, 1025], [2, 0.5, 220], [2.5, 0.3, 161]]
      }
    }
  },

  computed: {},
  mounted() {
    this.drawLine()
    // for (var i = 0; i < 5; i++) {
    // var a = Math.floor(Math.random() * 100) + 400
    // var a = Math.floor(Math.random() * 100) + 400
    // var a = Math.floor(Math.random() * 100) + 400
    // var a = Math.floor(Math.random() * 100) + 400
    // }
    // console.log(this.datas[this.value][3])
  },
  methods: {
    drawLine() {
      var option = {
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '缺少物料\n' + this.optionDatas[this.value][0][2],
            data: [this.optionDatas[this.value][0]],
            type: 'scatter',
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 5
            },
            itemStyle: {
              color: '#05CD00'
            },
            label: {
              show: true,
              formatter: '{a}',
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          {
            name: '数据逻辑\n' + this.optionDatas[this.value][1][2],
            data: [this.optionDatas[this.value][1]],
            type: 'scatter',
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 5
            },
            itemStyle: {
              color: '#289DF5'
            },
            label: {
              show: true,
              formatter: '{a}',
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          {
            name: '胡填\n' + this.optionDatas[this.value][2][2],
            data: [this.optionDatas[this.value][2]],
            type: 'scatter',
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 5
            },
            itemStyle: {
              color: '#FF9E00'
            },
            label: {
              show: true,
              formatter: '{a}',
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          {
            name: '其他\n' + this.optionDatas[this.value][3][2],
            data: [this.optionDatas[this.value][3]],
            type: 'scatter',
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 5
            },
            itemStyle: {
              color: '#8400D3'
            },
            label: {
              show: true,
              formatter: '{a}',
              fontSize: 16,
              fontWeight: 'bold'
            }
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echartsBox2'))
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
#box2 {
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
  align-items: center;
  position: relative;
}
.seleBox {
  position: absolute;
  right: 20px;
  top: 0;
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
#echartsBox2 {
  width: 74%;
  height: 16vw;
  margin: 2% 13%;
}
</style>
