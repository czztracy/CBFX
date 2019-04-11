<!-- 首页头部月度环比 -->
<template>
  <el-row :gutter="20" class="price-sheet">
    <!-- 1（通用） 报价单任务数量 -->
    <!--  top1Micro: false, // 报价单任务数量 (商务小微)
          top1Manager: false, // 报价单任务数量 (采购经理,小微主,接口人)
          top1Supplier:
     -->
    <el-col v-if="show.top1Micro || show.top1Manager || show.top1Supplier" :span="6">
      <div class="content">
        <ul>
          <!-- 报价单任务数量 -->
          <li>{{ $t('dashboard.numberOfTasks') }}</li>
          <!-- 月度环比 -->
          <el-tooltip effect="light" placement="top-start">
            <div slot="content">{{ $t('dashboard.monthOnMonth') }}{{ showData.one.rateForMonth }}%</div>
            <li>
              <!-- {{ $t('dashboard.monthOnMonth') }} -->
              <span class="monthRatio">
                {{ $t('dashboard.monthOnMonth') }}
              </span>
              <span
                :class="{colorGreen: colorShow1, colorOrigin: !colorShow1}"
              >
                {{ showData.one.rateForMonth }}%
                <i
                  :class="{'icon-tubiaoshangshengqushi': colorShow1, 'icon-tubiaoxiajiangqushi': !colorShow1}"
                  class="iconfont"
                />
              </span>
            </li>
          </el-tooltip>
        </ul>
        <ul>
          <li>
            <img src="../../assets/index/index_task_number.png" alt>
          </li>
          <li>
            <!-- 月度累计 -->
            <span>{{ $t('dashboard.monthlyCumulative') }}</span>
            <br>
            <br>
            <!-- <span :class="{big:triggleMonthYear==='month'}">{{ showData.one.countForMonth }}</span> -->
            <el-tooltip effect="light" placement="top-start">
              <div slot="content">{{ showData.one.countForMonth }}</div>
              <span
                :class="[isActive?'deepColor':'lightColor']"
                style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
              >{{ showData.one.countForMonth }}</span>
            </el-tooltip>
          </li>
          <li>
            <!-- 年度累计 -->
            <span>{{ $t('dashboard.annualCumulative') }}</span>
            <br>
            <br>
            <!-- <span :class="{big:triggleMonthYear==='year'}">{{ showData.one.countForYear }}</span> -->
            <el-tooltip effect="light" placement="top-end">
              <div slot="content">{{ showData.one.countForYear }}</div>
              <span
                :class="[isActive?'lightColor':'deepColor']"
                style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
              >{{ showData.one.countForYear }}</span>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </el-col>
    <!-- 2（通用） 报价单分解完成率 -->
    <el-col v-if="show.top2Micro || show.top2Manager || show.top2Supplier" :span="6">
      <div class="content">
        <ul>
          <!-- 报价单分解完成率 -->
          <li>{{ $t('dashboard.decompositionCompletionRate') }}</li>
          <el-tooltip effect="light" placement="top-start">
            <div slot="content">{{ $t('dashboard.monthOnMonth') }} {{ showData.two.rateForMonth }}%</div>
            <li>
              <span class="monthRatio">
                {{ $t('dashboard.monthOnMonth') }}
              </span>
              <!-- {{ $t('dashboard.monthOnMonth') }} -->
              <span
                :class="{colorGreen: colorShow2, colorOrigin: !colorShow2}"
              >
                {{ showData.two.rateForMonth }}%
                <i
                  :class="{'icon-tubiaoshangshengqushi': colorShow2, 'icon-tubiaoxiajiangqushi': !colorShow2}"
                  class="iconfont"
                />
              </span>
            </li>
          </el-tooltip>
        </ul>
        <ul>
          <li>
            <img src="../../assets/index/index_resolve_rate.png" alt>
          </li>
          <li>
            <span>{{ $t('dashboard.monthlyCumulative') }}</span>
            <br>
            <br>
            <span :class="[isActive?'deepColor':'lightColor']">{{ showData.two.countForMonth }}%</span>
          </li>
          <li>
            <span>{{ $t('dashboard.annualCumulative') }}</span>
            <br>
            <br>
            <span :class="[isActive?'lightColor':'deepColor']">{{ showData.two.countForYear }}%</span>
          </li>
        </ul>
      </div>
    </el-col>
    <!-- 3（小微：报价单稽核率）（采购经理：报价单查看率）（供应商：报价单退回率）-->
    <el-col v-if="show.top3Micro || show.top3Manager || show.top3Supplier" :span="6">
      <div class="content">
        <ul>
          <!-- 报价单稽核率 -->
          <li v-if="show.top3Micro === true">{{ $t('dashboard.auditRate') }}</li>
          <!-- <li v-if="name ==='micro'">{{ $t('dashboard.auditRate') }}</li> -->
          <!-- 报价单查看率 -->
          <li v-if="show.top3Manager === true" >{{ $t('dashboard.quotationViewingRate') }}</li>
          <!-- <li v-else-if="name ==='manager' || name ==='leader' ">{{ $t('dashboard.quotationViewingRate') }}</li> -->
          <!-- 报价单退回率 -->
          <li v-if="show.top3Supplier === true ">{{ $t('dashboard.quotationReturnRate') }}</li>
          <!-- <li v-else-if="name ==='supplier' ">{{ $t('dashboard.quotationReturnRate') }}</li> -->
          <el-tooltip effect="light" placement="top-start">
            <div slot="content">{{ $t('dashboard.monthOnMonth') }} {{ showData.three.rateForMonth }}%</div>
            <li>
              <span class="monthRatio">
                {{ $t('dashboard.monthOnMonth') }}
              </span>

              <!-- {{ $t('dashboard.monthOnMonth') }} -->
              <span
                :class="{colorGreen: colorShow3, colorOrigin: !colorShow3}"
              >
                {{ showData.three.rateForMonth }}%
                <i
                  :class="{'icon-tubiaoshangshengqushi': colorShow3, 'icon-tubiaoxiajiangqushi': !colorShow3}"
                  class="iconfont"
                />
              </span>
            </li>
          </el-tooltip>
        </ul>
        <ul>
          <li>
            <img src="../../assets/index/index_audit_rate.png" alt>
          </li>
          <li>
            <span>{{ $t('dashboard.monthlyCumulative') }}</span>
            <br>
            <br>
            <span :class="[isActive?'deepColor':'lightColor']">{{ showData.three.countForMonth }}%</span>
          </li>
          <li>
            <span>{{ $t('dashboard.annualCumulative') }}</span>
            <br>
            <br>
            <span :class="[isActive?'lightColor':'deepColor']">{{ showData.three.countForYear }}%</span>
          </li>
        </ul>
      </div>
    </el-col>
    <!-- 4（小微：报价单稽核退回率）（采购经理：报价单退回率）（供应商：报价单完成及时率）-->
    <el-col v-if="show.top4Micro || show.top4Manager || show.top4Supplier" :span="6">
      <div class="content">
        <ul>
          <!-- 报价单稽核退回率 -->
          <li v-if="show.top4Micro === true ">{{ $t('dashboard.auditReturnRate') }}</li>
          <!-- <li v-if="name ==='micro' ">{{ $t('dashboard.auditReturnRate') }}</li> -->
          <!-- 报价单退回率 -->
          <li v-if=" show.top4Manager === true ">{{ $t('dashboard.quotationReturnRate') }}</li>
          <!-- <li v-else-if="name ==='manager' || name ==='leader' ">{{ $t('dashboard.quotationReturnRate') }}</li> -->
          <!-- 报价单完成及时率 -->
          <li v-if="show.top4Supplier === true ">{{ $t('dashboard.auditCompletionOnTimeRate') }}</li>
          <!-- <li v-else-if="name ==='supplier' ">{{ $t('dashboard.auditCompletionOnTimeRate') }}</li> -->
          <el-tooltip effect="light" placement="top-start">
            <div slot="content">{{ $t('dashboard.monthOnMonth') }} {{ showData.four.rateForMonth }}%</div>
            <li>
              <span class="monthRatio">
                {{ $t('dashboard.monthOnMonth') }}
              </span>
              <!-- {{ $t('dashboard.monthOnMonth') }} -->
              <span
                :class="{colorGreen: colorShow4, colorOrigin: !colorShow4}"
              >
                {{ showData.four.rateForMonth }}%
                <i
                  :class="{'icon-tubiaoshangshengqushi': colorShow4, 'icon-tubiaoxiajiangqushi': !colorShow4}"
                  class="iconfont"
                />
              </span>
            </li>
          </el-tooltip>
        </ul>
        <ul>
          <li>
            <img src="../../assets/index/index_audit_return_rate.png" alt>
          </li>
          <li>
            <span>{{ $t('dashboard.monthlyCumulative') }}</span>
            <br>
            <br>
            <span :class="[isActive?'deepColor':'lightColor']">{{ showData.four.countForMonth }}%</span>
          </li>
          <li>
            <span>{{ $t('dashboard.annualCumulative') }}</span>
            <br>
            <br>
            <span :class="[isActive?'lightColor':'deepColor']">{{ showData.four.countForYear }}%</span>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
import Eventbus from '@/bus.js'
import { reportAuditRate, reportViewingRate, reportCompletionRate, searchReportCountAndRate } from '@/api/dashboard'
export default {
  name: 'PriceSheet',
  data() {
    return {
      show: {},
      triggleMonthYear: 'month',
      colorShow1: true,
      colorShow2: true,
      colorShow3: true,
      colorShow4: true,
      showData: {
        one: {
          rateForMonth: '0', // 月度环比
          countForMonth: '0', // 月度累计
          countForYear: '0' // 年度累计
        },
        two: {
          rateForMonth: '0', // 月度环比
          countForMonth: '0', // 月度累计
          countForYear: '0' // 年度累计
        },
        three: {
          rateForMonth: '0', // 月度环比
          countForMonth: '0', // 月度累计
          countForYear: '0' // 年度累计
        },
        four: {
          rateForMonth: '0', // 月度环比
          countForMonth: '0', // 月度累计
          countForYear: '0' // 年度累计
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userSign', 'userCode', 'avatarCode', 'loginName']),
    isActive() {
      return this.triggleMonthYear === 'month'
    }
  },
  created() {},
  mounted() {
    Eventbus.$on('triggleMonthYear', (triggleMonthYear) => {
      this.triggleMonthYear = triggleMonthYear
      // console.log(1222, this.triggleMonthYear)
    })
    Eventbus.$on('show', (show) => {
      this.show = show
      // console.log('this.show1', this.show)
      this.Top()
    })
    // this.Top()
  },
  methods: {
    Top() {
      // 小微
      // console.log('this.show.top4Micro', this.show)
      if (this.show.top4Micro) {
        // three (reportAuditRate)id 106查询报价单稽核率
        // var params1 = { receiverCode: this.userCode }
        var params1 = {}
        // if (judgeUrl() !== '002') {
        //   params1.receiverCode = this.userCode
        // }
        reportAuditRate(params1).then(res => {
          this.showData.three = {
            'rateForMonth': res.resultData.monthlyChainRatio,
            'countForMonth': res.resultData.monthlyCumulative,
            'countForYear': res.resultData.annualCumulative
          }
          // this.showData.three.countForMonth = '100.0'
          this.changeColorShow()
        })
        // (searchReportCountAndRate) id115 集合
        // var params4 = { receiverCode: this.token, receiverType: this.avatarCode }
        var params4 = {}
        // if (judgeUrl() !== '002') {
        //   params4.receiverCode = this.userCode
        //   params4.receiverType = this.avatarCode
        // }
        searchReportCountAndRate(params4).then(res => {
          this.showData.one = res.resultData.reportCount
          this.showData.two = res.resultData.reportCompletionRate
          this.showData.four = res.resultData.reportSendBackRate
          this.changeColorShow()
        })
        // 采购经理
      } else if (this.show.top1Manager && this.show.top2Manager && this.show.top3Manager && this.show.top4Manager) {
        // three (reportViewingRate)id 108查询报价单查看率
        var params2 = {}
        // if (judgeUrl() !== '002') {
        //   params2.receiverCode = this.userCode
        // }
        reportViewingRate(params2).then(res => {
          this.showData.three = {
            'rateForMonth': res.resultData.monthlyChainRatio,
            'countForMonth': res.resultData.monthlyCumulative,
            'countForYear': res.resultData.annualCumulative
          }
          this.changeColorShow()
        })
        // (searchReportCountAndRate) id115 各种率的集合
        // var params5 = { receiverCode: this.userCode, receiverType: this.avatarCode }
        var params5 = {}
        // 角色编码
        // if (this.name === 'manager') {
        //   params5.receiverType = '0003'
        // } else if (this.name === 'leader') {
        //   params5.receiverType = '0005'
        // }
        // if (judgeUrl() !== '002') {
        //   params5.receiverCode = this.userCode
        //   params5.receiverType = this.avatarCode
        // }
        searchReportCountAndRate(params5).then(res => {
          this.showData.one = res.resultData.reportCount
          this.showData.two = res.resultData.reportCompletionRate
          this.showData.four = res.resultData.reportSendBackRate
          this.changeColorShow()
        })

        // 供应商
      } else if (this.userSign === 'supplier') {
        // four (reportCompletionRate)id 111查询报价单完成及时率
        // var params3 = { receiverCode: this.loginName }
        var params3 = {}
        // if (judgeUrl() !== '002') {
        //   params3.receiverCode = this.loginName
        // }
        reportCompletionRate(params3).then(res => {
          this.showData.four = {
            'rateForMonth': res.resultData.monthlyChainRatio,
            'countForMonth': res.resultData.monthlyCumulative,
            'countForYear': res.resultData.annualCumulative
          }
          this.changeColorShow()
        })
        // (searchReportCountAndRate) id115 集合
        // var params6 = { receiverType: this.avatarCode, receiverCode: this.loginName }
        var params6 = {}
        // if (judgeUrl() !== '002') {
        //   params6.receiverType = this.avatarCode
        //   params6.receiverCode = this.loginName
        // }
        searchReportCountAndRate(params6).then(res => {
          this.showData.one = res.resultData.reportCount
          this.showData.two = res.resultData.reportCompletionRate
          this.showData.three = res.resultData.reportSendBackRate
          this.changeColorShow()
        })
      }
      // console.log(this.colorShow1, this.colorShow2, this.colorShow3, this.colorShow4)
    },
    // 月度环比箭头样式
    changeColorShow() {
      for (var index in this.showData) {
        // console.log(this.showData[index].rateForMonth)
        switch (index) {
        case 'one':
          if (this.showData[index].rateForMonth > 0) {
            this.colorShow1 = true
            // console.log(1333, this.showData[index].rateForMonth)
          } else {
            this.colorShow1 = false
            // console.log(2333, this.showData[index].rateForMonth)
          }
          this.showData[index].countForMonth = this.Intger(this.showData[index].countForMonth)
          this.showData[index].countForYear = this.Intger(this.showData[index].countForYear)
          break
        case 'two':
          if (this.showData[index].rateForMonth > 0) {
            this.colorShow2 = true
          } else {
            this.colorShow2 = false
          }
          this.showData[index].countForMonth = this.Intger(this.showData[index].countForMonth)
          this.showData[index].countForYear = this.Intger(this.showData[index].countForYear)
          break
        case 'three':
          if (this.showData[index].rateForMonth > 0) {
            this.colorShow3 = true
          } else {
            this.colorShow3 = false
          }
          this.showData[index].countForMonth = this.Intger(this.showData[index].countForMonth)
          this.showData[index].countForYear = this.Intger(this.showData[index].countForYear)
          break
        case 'four':
          if (this.showData[index].rateForMonth > 0) {
            this.colorShow4 = true
          } else {
            this.colorShow4 = false
          }
          this.showData[index].countForMonth = this.Intger(this.showData[index].countForMonth)
          this.showData[index].countForYear = this.Intger(this.showData[index].countForYear)
          break
        default:
          break
        }
      }
    },
    // 数据取整，   （%号情况下，月度环比先保留两位）
    Intger(val) {
      if (val === undefined) {
        return 0
      } else {
        return Math.round(val)
      }
      // if (val === '100.00' || val === '100.0') {
      //   return '100'
      // } else {
      //   return val
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import "../../assets/css/iconfont.css";
.price-sheet {
  background-color: rgba(244, 244, 244, 1);
  padding: 30px;
  // min-width: 1200px;
  font-size: 14px;
  margin-left: 0 !important;
  .el-col {
    div.content {
      border: 1px solid #eee;
      background-color: rgba(255, 255, 255, 2);
      ul {
        list-style-type: none;
        padding: 0 10px;
        overflow: hidden;
        margin: 0;
        li {
          span.colorOrigin {
            color: #ff9e00;
          }
          span.colorGreen {
            color: #05cd00;
          }
        }
      }
      ul:first-of-type {
        background-color: rgba(233, 233, 233, 1);
        height: 40px;
        line-height: 40px;
        li:first-of-type {
          float: left;
        }
        li:last-of-type {
          float: right;
        }
      }
      ul:last-of-type {
        padding: 30px 3%;
        li {
          float: left;
          // display: inline-block;
          text-align: center;
          width: 33%;
          img {
            height: 100%;
          }
          span {
            display: inline-block;
            margin-bottom: 5px;
          }
          span.deepColor {
            font-size: 30px;
            font-weight: 700;

          }
          span.lightColor {
            color: gray;
            font-size: 30px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
@media screen and (max-width:1599px){
 .monthRatio {
   display:none;
  }
}
</style>
