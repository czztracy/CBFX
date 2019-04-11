<!-- 报价单分解进度 (供应商 查看） -->
<template>
  <div id="resolveQ">
    <div class="inner">
      <div class="top">
        <span/>
        <h3>{{ $t('dashboard.decompositionCompletionPlan') }}</h3>
      </div>
      <div class="echartsBox flexbox">
        <div id="echartsResolveDG1">
          <el-progress :percentage="Decomposed" :stroke-width="9" color="#289DF5" type="circle" />
          <p>{{ $t('dashboard.resolved') }}</p>
          <span>共计<em>{{ reportCountForDecomposed }}</em>个</span>
        </div>
        <div id="echartsResolveDG2">
          <el-progress :percentage="Decomposition" :stroke-width="9" color="#05CD00" type="circle" />
          <p>{{ $t('dashboard.deconstructing') }}</p>
          <span>共计<em>{{ reportCountForDecomposition }}</em>个</span>
        </div>
        <div id="echartsResolveDG3">
          <el-progress :percentage="UnDecomposed" :stroke-width="9" color="#FF9E00" type="circle" />
          <p>{{ $t('dashboard.undecomposed') }}</p>
          <span>共计<em>{{ reportCountForundecomposed }}</em>个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { searchReportAnalyzeProgress } from '@/api/dashboard'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
export default {
  name: 'ResolveDG',

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
      // 已分解百分比
      Decomposed: 0,
      // 已分解百分比
      UnDecomposed: 0,
      // 分解中百分比
      Decomposition: 0,
      // 总数
      reportCountSum: '',
      // 已分解
      reportCountForDecomposed: '',
      // 分解中
      reportCountForDecomposition: '',
      // 未分解
      reportCountForundecomposed: '',
      series: []
    }
  },
  computed: {
    ...mapGetters(['name', 'avatarCode', 'token', 'loginName', 'userCode'])
  },
  mounted() {
    // Eventbus.$on('show', (show) => {
    //   this.show = show
    //   console.log('this.show111', this.show)
    //   if (this.show.supplierResolve) {
    //     this.getData()
    //   }
    // })
    this.getData()
  },
  methods: {
    // id116接口
    getData() {
      var params = {
        // receiverType: this.avatarCode, // 角色
        // receiverCode: this.loginName, // 角色编码userCode
        region: this.region, // 区域
        yearOrMonth: '' // 年月度累计标识
      }
      // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   params.receiverType = this.avatarCode
      //   params.receiverCode = this.userCode
      // }
      // if (this.name === 'supplier') {
      //   params.receiverType = '0006'
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
          this.reportCountSum = res.resultData.reportCount.reportCountSum
          this.reportCountForDecomposed = res.resultData.reportCount.reportCountForDecomposed
          this.reportCountForDecomposition = res.resultData.reportCount.reportCountForDecomposition
          this.reportCountForundecomposed = res.resultData.reportCount.reportCountForundecomposed
          this.Decomposed = Number(res.resultData.reportCount.reportRateForDecomposed)
          this.UnDecomposed = Number(res.resultData.reportCount.reportRateForundecomposed)
          this.Decomposition = Number(res.resultData.reportCount.reportRateForDecomposition)
          // this.Decomposed = Math.ceil(this.reportCountForDecomposed / this.reportCountSum)
          // this.UnDecomposed = Math.ceil(this.reportCountForundecomposed / this.reportCountSum)
          // this.Decomposition = Math.ceil(this.reportCountForDecomposition / this.reportCountSum)
        }
      ).catch(res => {
        console.log('id116请求失败')
      })
    }
  }
}
</script>

<style>
#echartsResolveDG1 .el-progress--circle .el-progress__text,
#echartsResolveDG2 .el-progress--circle .el-progress__text,
#echartsResolveDG3 .el-progress--circle .el-progress__text {
  top: 40%;
}
</style>

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
.flexbox {
  width: 94%;
  margin: 0 3%;
  margin-top: 8%;
  display: flex;
  justify-content: space-around;
}
.echartsBox {
  height: 7vw;
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
  top: 74%;
  width: 100%;
  text-align: center;
  font-size: 0.5vw;
}
.echartsBox > div > span em {
  font-style: normal;
}
#echartsResolveDG1,
#echartsResolveDG2,
#echartsResolveDG3 {
  box-sizing: border-box;
  padding-top: 2.5%;
}
</style>
