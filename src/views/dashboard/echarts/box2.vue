<!-- 报价单质量分布 -->
<template>
  <div id="box2">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.quotationQualityDistribution') }}</h3>
        <div class="seleBox">
          <el-select v-model="value" placeholder="" @change="getData()">
            <el-option v-for="item in seleOptions" :key="item.industry_id" :label="item.industry_name" :value="item.industry_id"/>
          </el-select>
        </div>
      </div>
      <div id="echartsBox2"/>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
import { getIndustry, suggestions } from '@/api/dashboard'
import { judgeUrl } from '@/utils/api'
export default {
  name: 'Box2',
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
      seleOptions: [
        // {
        //   'industry_id': '2f70fd4408d911e9b460fa163e23d187',
        //   'industry_name': '公开需求'
        // },
        // {
        //   'industry_id': '2f7100ce08d911e9b460fa163e23d187',
        //   'industry_name': '冰冷'
        // },
        // {
        //   'industry_id': '2f71015b08d911e9b460fa163e23d187',
        //   'industry_name': '空调'
        // },
        // {
        //   'industry_id': '2f7101d908d911e9b460fa163e23d187',
        //   'industry_name': '热水器'
        // },
        // {
        //   'industry_id': '2f71025308d911e9b460fa163e23d187',
        //   'industry_name': '电厨'
        // },
        // {
        //   'industry_id': '2f7102b908d911e9b460fa163e23d187',
        //   'industry_name': '智控'
        // },
        // {
        //   'industry_id': '2f71031f08d911e9b460fa163e23d187',
        //   'industry_name': '洗涤'
        // }
      ],
      value: '',
      optionDatas: [[0, 0.3, 420, '缺少物料'], [1, 0.4, 1025, '数据逻辑'], [2, 0.5, 220, '胡填'], [2.5, 0.3, 151, '其它']]
      // optionDatas: {
      //   '': [[0, 0.3, 420], [1, 0.4, 1025], [2, 0.5, 220], [2.5, 0.3, 151]],
      //   选项2: [[0, 0.3, 420], [1, 0.4, 1125], [2, 0.5, 220], [2.5, 0.3, 151]],
      //   选项3: [[0, 0.3, 420], [1, 0.4, 1025], [2, 0.5, 210], [2.5, 0.3, 151]],
      //   选项4: [[0, 0.3, 320], [1, 0.4, 1025], [2, 0.5, 220], [2.5, 0.3, 151]],
      //   选项5: [[0, 0.3, 420], [1, 0.4, 1025], [2, 0.5, 220], [2.5, 0.3, 161]]
      // }
    }
  },

  computed: {
    ...mapGetters(['avatarCode', 'userCode'])
  },
  created() {},
  mounted() {
    var params = {}
    getIndustry(params).then(res => {
      this.seleOptions = res.resultData
      this.value = res.resultData[0].industry_id
      this.getData()
    })
  },
  methods: {
    getData() {
      // id 120 查询报价单质量分布
      var params = {
        industryId: this.value, // 产业线标识
        region: this.region
      }
      this.getSuggestions(params)
      // // 小微
      // console.log(judgeUrl())
      if (judgeUrl() !== '002') {
        if (this.show.box2Micro) {
          // if (this.show.box2Micro === 'micro') {
          // params.receiverCode = this.token // 角色编码
          // params.receiverCode = this.userCode // 角色编码
          // params.receiverType = this.avatarCode
          this.getSuggestions(params)
          // 采购经理
        } else if (this.show.box2Manager) {
          // } else if (this.name === 'manager' || this.name === 'leader') {
          // params.receiverCode = this.token // 角色编码
          // params.receiverCode = this.userCode // 角色编码
          // params.receiverType = this.avatarCode
          this.getSuggestions(params)
        }
      }
    },
    getSuggestions(params) {
      if (this.time === 'month') {
        params.yearOrMonth = 2
      } else if (this.time === 'year') {
        params.yearOrMonth = 1
      }
      suggestions(params).then(res => {
        var resultData = res.resultData
        resultData = resultData.sort(this.sortNumber)
        var sum = this.sum(resultData)
        if (sum !== 0) {
          this.optionDatas[0] = [0.1, resultData[1].value / sum, resultData[1].value, resultData[1].name]
          this.optionDatas[1] = [1, resultData[0].value / sum, resultData[0].value, resultData[0].name]
          this.optionDatas[2] = [1.9, resultData[2].value / sum, resultData[2].value, resultData[2].name]
          this.optionDatas[3] = [2.5, resultData[3].value / sum, resultData[3].value, resultData[3].name]
        } else {
          this.optionDatas[0] = [0.1, 0, resultData[1].value, resultData[1].name]
          this.optionDatas[1] = [1, 1, resultData[0].value, resultData[0].name]
          this.optionDatas[2] = [1.9, 0, resultData[2].value, resultData[2].name]
          this.optionDatas[3] = [2.5, 0, resultData[3].value, resultData[3].name]
        }
        this.drawLine()
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
      var option = {
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: this.optionDatas[0][3] + '\n' + this.optionDatas[0][2],
            data: [this.optionDatas[0]],
            type: 'scatter',
            symbolSize: function(data) {
              if (data[2] <= '200') {
                return Math.sqrt(200) * 5
              } else if (data[2] >= '1000') {
                return Math.sqrt(1000) * 5
              } else {
                return Math.sqrt(data[2]) * 5
              }
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
            name: this.optionDatas[1][3] + '\n' + this.optionDatas[1][2],
            data: [this.optionDatas[1]],
            type: 'scatter',
            symbolSize: function(data) {
              if (data[2] <= '200') {
                return Math.sqrt(200) * 5
              } else if (data[2] >= '2000') {
                return Math.sqrt(2000) * 5
              } else {
                return Math.sqrt(data[2]) * 5
              }
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
            name: this.optionDatas[2][3] + '\n' + this.optionDatas[2][2],
            data: [this.optionDatas[2]],
            type: 'scatter',
            symbolSize: function(data) {
              if (data[2] <= '200') {
                return Math.sqrt(200) * 5
              } else if (data[2] >= '1000') {
                return Math.sqrt(1000) * 5
              } else {
                return Math.sqrt(data[2]) * 5
              }
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
            name: this.optionDatas[3][3] + '\n' + this.optionDatas[3][2],
            data: [this.optionDatas[3]],
            type: 'scatter',
            symbolSize: function(data) {
              if (data[2] <= '200') {
                return Math.sqrt(200) * 5
              } else if (data[2] >= '1000') {
                return Math.sqrt(1000) * 5
              } else {
                return Math.sqrt(data[2]) * 5
              }
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
