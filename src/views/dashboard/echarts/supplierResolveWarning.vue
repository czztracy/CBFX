<!-- 报价单进度预警(供应商) -->
<template>
  <div id="resolveQ">
    <div class="inner">
      <div class="top">
        <span/>
        <!-- 报价单进度预警 -->
        <h3>{{ $t('dashboard.quotationProgressWarning') }}</h3>
      </div>
      <div class="echartsBox flexbox">
        <el-table
          v-loading = "loading"
          :data="tableData"
          :cell-style="{'text-align': 'center'}"
          :header-cell-style="{'text-align': 'center'}"
          stripe
          class="table-style1"
          style="width: 100%">
          <el-table-column
            prop="moduleCode"
            label="物料号"
          />
          <el-table-column
            prop="demandCode"
            label="需求号"
          />
          <el-table-column
            prop="differDay"
            label="距离填报截止日期还有"
            width="170"/>
          <el-table-column
            prop="moduleDescribe"
            label="模块描述"
            width="170"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
import { searchReportProgressWarning } from '@/api/dashboard'
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
      // show: {},
      loading: true,
      tableData: [
        // {
        //   moduleCode: '物料0001',
        //   demandCode: '9000765',
        //   differDay: '3天',
        //   moduleDescribe: '上海市普陀区金沙江路'
        // }
      ]
    }
  },

  computed: {
    ...mapGetters(['loginName'])
  },
  mounted() {
    // Eventbus.$on('show', (show) => {
    //   this.show = show
    //   console.log('this.show1', this.show)
    //   if (this.show.supplierResolveWarning) {
    //     this.getData()
    //   }
    // })
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      // var params = { receiverCode: this.loginName, region: this.region }
      var params = { region: this.region }
      // if (judgeUrl() !== '002') {
      //   params.receiverCode = this.loginName
      // }
      if (this.time === 'month') {
        params.yearOrMonth = 2
      } else if (this.time === 'year') {
        params.yearOrMonth = 1
      }
      // 查询报价单进度预警 id 112
      searchReportProgressWarning(params).then(res => {
        // console.log('searchReportProgressWarning')
        this.tableData = res.resultData
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
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
  overflow: hidden;
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
</style>
