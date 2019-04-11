<!-- 首页图标 -->
<template>
  <div class="selection-choose">
    <!-- <el-row class="choose">
      <el-col :span="4">{{ $t('dashboard.selectionOfConditions') }}</el-col>
      <el-col :span="17">
        <span
          :class="{choose: triggleMonthYear === 'month'}"
          @click="changeColorMoths"
        >{{ $t('dashboard.monthlyCumulative') }}</span>
        <span
          :class="{choose: triggleMonthYear === 'year'}"
          @click="changeColorYear"
        >{{ $t('dashboard.annualCumulative') }}</span>
      </el-col>
      <el-col :span="3" class="arrow-height">
        <el-select v-model="areaChoose" >
          <el-option
            v-for="item in optionsChoose"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-col>
    </el-row> -->
    <PriceSheet/>
    <div class="choose-content">
      <!-- 月度累计 -->
      <el-row v-if="triggleMonthYear === 'month'">
        <!-- 我的消息(all) -->
        <el-col :span="12">
          <div>
            <message :list="msgList"/>
          </div>
        </el-col>
        <!-- 报价单分解进度 -->
        <!-- 商务小微(micro) -->
        <el-col v-if=" show.box1 === true" :span="12">
          <!-- <el-col v-if=" name.indexOf('micro') !== -1 " :span="12"> -->
          <div class="charts">
            <box1 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 采购经理(接口人，采购经理，小微主) -->
        <el-col v-if=" show.resolveCManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <resolveC :key="areaChoose" :time = "triggleMonthYear" :region="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 供应商 -->
        <el-col v-if="show.supplierResolve === true" :span="12">
          <!-- <el-col v-if="name ==='supplier'" :span="12"> -->
          <div class="charts">
            <supplierResolve :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :show="show"/>
          </div>
        </el-col>
        <!-- 报价质量分布 -->
        <el-col v-if="show.box2Micro === true || show.box2Manager === true" :span="12">
          <!-- <el-col v-if="name ==='micro' || name ==='leader' || name ==='manager'" :span="12"> -->
          <div class="charts">
            <box2 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :show="show"/>
          </div>
        </el-col>
        <!-- 报价单分解质量 -->
        <!-- 商务小微 -->
        <el-col v-if="show.box3 === true" :span="12">
          <!-- <el-col v-if="name ==='micro'" :span="12"> -->
          <div class="charts">
            <box3 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 采购经理 -->
        <el-col v-if="show.resolveQManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <resolveQ :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 商务小微 -->
        <!-- 产业线参与度 -->
        <el-col v-if="show.box4 === true" :span="12">
          <!-- <el-col v-if="name ==='micro'" :span="12"> -->
          <div class="charts">
            <box4 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 大数据概况 -->
        <el-col v-if="show.box5 === true" :span="12">
          <!-- <el-col v-if="name ==='micro'" :span="12"> -->
          <div class="charts">
            <box5 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 采购经理 -->
        <!-- 供应商分解进度 -->
        <el-col v-if="show.resolveCManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <toeflC :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 供应商分解质量 -->
        <el-col v-if="show.toeflPManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <toeflP :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 供应商 -->
        <!-- 报价单进度预警 -->
        <el-col v-if="show.supplierResolveWarning === true" :span="12">
          <!-- <el-col v-if="name ==='supplier'" :span="12"> -->
          <div class="charts">
            <supplierResolveWarning :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 报价单分解质量 -->
        <el-col v-if="show.supplierResolveQ === true" :span="12">
          <!-- <el-col v-if="name ==='supplier'" :span="12"> -->
          <div class="charts">
            <supplierResolveQ :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose" :datas="monthDatas" :show="show"/>
          </div>
        </el-col>
      </el-row>

      <!-- 年度累计 -->
      <el-row v-else>
        <!-- 我的消息 -->
        <el-col :span="12">
          <div>
            <message :list="msgList"/>
          </div>
        </el-col>
        <!-- 报价单分解进度 -->
        <!-- 商务小微 -->
        <el-col v-if=" show.box1 === true" :span="12">
          <!-- <el-col v-if="name ==='micro' " :span="12"> -->
          <div class="charts">
            <box1 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 采购经理 -->
        <el-col v-if=" show.resolveCManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <resolveC :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 供应商 -->
        <el-col v-if="show.supplierResolve === true" :span="12">
          <!-- <el-col v-if="name ==='supplier'" :span="12"> -->
          <div class="charts">
            <supplierResolve :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :show="show"/>
          </div>
        </el-col>
        <!-- 报价质量分布 -->
        <el-col v-if="show.box2Micro === true || show.box2Manager === true" :span="12">
          <!-- <el-col v-if="name ==='micro' || name ==='leader' || name ==='manager'" :span="12"> -->
          <div class="charts">
            <box2 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :show="show"/>
          </div>
        </el-col>
        <!-- 报价单分解质量 -->
        <!-- 商务小微 -->
        <el-col v-if="show.box3 === true" :span="12">
          <!-- <el-col v-if="name ==='micro'" :span="12"> -->
          <div class="charts">
            <box3 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 采购经理 -->
        <el-col v-if="show.resolveQManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader' " :span="12"> -->
          <div class="charts">
            <resolveQ :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 商务小微 -->
        <!-- 产业线参与度 -->
        <el-col v-if="show.box4 === true" :span="12">
          <!-- <el-col v-if="name ==='micro' " :span="12"> -->
          <div class="charts">
            <box4 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 大数据概况 -->
        <el-col v-if="show.box5 === true" :span="12">
          <!-- <el-col v-if="name ==='micro' " :span="12"> -->
          <div class="charts">
            <box5 :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 采购经理 -->
        <!-- 供应商分解进度 -->
        <el-col v-if="show.resolveCManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <toeflC :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 供应商分解质量 -->
        <el-col v-if="show.toeflPManager === true" :span="12">
          <!-- <el-col v-if="name ==='manager' || name ==='leader'" :span="12"> -->
          <div class="charts">
            <toeflP :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 供应商 -->
        <!-- 报价单进度预警 -->
        <el-col v-if="show.supplierResolveWarning === true" :span="12">
          <!-- <el-col v-if="name ==='supplier'" :span="12"> -->
          <div class="charts">
            <supplierResolveWarning :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
        <!-- 报价单分解质量 -->
        <el-col v-if="show.supplierResolveQ === true" :span="12">
          <!-- <el-col v-if="name ==='supplier'" :span="12"> -->
          <div class="charts">
            <supplierResolveQ :time = "triggleMonthYear" :region="areaChoose" :key="areaChoose + '1'" :datas="yearDatas" :show="show"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Eventbus from '@/bus.js'
import { selects } from '@/api/dashboard'
// import { mapGetters } from 'vuex'
import box1 from '@/views/dashboard/echarts/box1'
import box2 from '@/views/dashboard/echarts/box2'
import box22 from '@/views/dashboard/echarts/box22'
import box3 from '@/views/dashboard/echarts/box3'
import box4 from '@/views/dashboard/echarts/box4'
import box5 from '@/views/dashboard/echarts/box5'
import resolveC from '@/views/dashboard/echarts/resolveC'
import resolveQ from '@/views/dashboard/echarts/resolveQ'
import supplierResolve from '@/views/dashboard/echarts/supplierResolve'
import supplierResolveQ from '@/views/dashboard/echarts/supplierResolveQ'
import supplierResolveWarning from '@/views/dashboard/echarts/supplierResolveWarning'
import toeflC from '@/views/dashboard/echarts/toeflC'
import toeflP from '@/views/dashboard/echarts/toeflP'
import message from '@/views/dashboard/message'
import PriceSheet from '@/views/dashboard/PriceSheet'
export default {
  name: 'SelectionChoose',
  components: {
    box1, // 报价单分解进度（商务小微）
    box2, // 报价单质量分布（商务小微、采购经理、小微主、接口人）
    box22, // 报价单质量分布 (商务小微)
    box3, // 报价单分解质量(商务小微) id135
    box4, // 产业线参与度(商务小微)
    box5, // 大数据概况(商务小微)
    resolveC, // 报价单分解进度 （采购经理、小微主、接口人）
    resolveQ, // 报价单分解质量（采购经理、小微主、接口人）
    supplierResolve, // 报价单分解进度 (供应商)
    supplierResolveQ, // 报价单分解质量 (供应商)
    supplierResolveWarning, // 报价单进度预警(供应商)
    toeflC, // 供应商分解进度（采购经理、小微主、接口人） id109
    toeflP, // 供应商分解质量（采购经理、小微主、接口人） id110
    message, // （商务小微、采购经理、小微主、接口人、供应商） 我的消息
    PriceSheet // 头部月度环比
  },
  data() {
    return {
      // 月度累计
      monthDatas: {
        // 报价单分解进度
        // 商务小微
        firstMicro: {
          xdata: [
            {
              value: '冰冷',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '空气',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '洗涤',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '电厨',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '智控',
              textStyle: {
                fontSize: 16
              }
            }
          ],
          ydata1: [150, 232, 201, 154, 190],
          ydata2: [220, 182, 191, 234, 290],
          ydata3: [320, 332, 301, 334, 390],
          ydata4: [690, 746, 693, 722, 870],
          dataMark: ['已分解', '分解中', '未分解'],
          dataTotal: '总量'
        },
        // 采购经理
        firstManager: {
          // 左图
          option1: '完成率产业线前5',
          xdata1: [
            {
              value: '供应商A',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商B',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商C',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商D',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商E',
              textStyle: {
                fontSize: 12
              }
            }
          ],
          ydata1: [99, 80, 60, 40, 20],
          // 右图
          option2: '完成率产业线后5',
          xdata2: [
            {
              value: '供应商F',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商G',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商H',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商I',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商J',
              textStyle: {
                fontSize: 12
              }
            }
          ],
          ydata2: [20, 40, 60, 80, 99]
        },
        // 报价单分解质量
        thirdMicro: {
          xdata: [
            {
              value: '冰冷',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '空气',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '洗涤',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '电厨',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '智控',
              textStyle: {
                fontSize: 16
              }
            }
          ],
          ydata1: [85, 94, 69, 38, 69],
          ydata2: [69, 29, 78, 79, 86],
          dataMark: ['采购经理查看退回率', '商务小微查看退回率']
        },
        thirdManager: {
          data: [[1, 0.6, 0.3], [1, 0.8, 0.15]],
          dataCircle1: 40,
          dataCircle2: 60
        }
      },
      // 年度累计
      yearDatas: {
        // 报价单分解进度
        // 商务小微
        firstMicro: {
          xdata: [
            {
              value: '冰冷',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '空气',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '洗涤',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '电厨',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '智控',
              textStyle: {
                fontSize: 16
              }
            }
          ],
          ydata1: [150, 232, 201, 154, 190],
          ydata2: [220, 182, 191, 234, 290],
          ydata3: [320, 332, 301, 334, 350],
          ydata4: [690, 746, 693, 722, 830],
          dataMark: ['已分解', '分解中', '未分解'],
          dataTotal: '总量'
        },
        // 采购经理
        firstManager: {
          // 左图
          option1: '完成率产业线前5',
          xdata1: [
            {
              value: '供应商A',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商B',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商C',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商D',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商E',
              textStyle: {
                fontSize: 12
              }
            }
          ],
          ydata1: [99, 80, 60, 40, 20],
          // 右图
          option2: '完成率产业线后5',
          xdata2: [
            {
              value: '供应商F',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商G',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商H',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商I',
              textStyle: {
                fontSize: 12
              }
            },
            {
              value: '供应商J',
              textStyle: {
                fontSize: 12
              }
            }
          ],
          ydata2: [20, 40, 60, 80, 99]
        },
        // 报价单分解质量
        thirdMicro: {
          xdata: [
            {
              value: '冰冷',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '空气',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '洗涤',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '电厨',
              textStyle: {
                fontSize: 16
              }
            },
            {
              value: '智控',
              textStyle: {
                fontSize: 16
              }
            }
          ],
          ydata1: [85, 94, 69, 38, 69],
          ydata2: [69, 29, 78, 79, 46],
          dataMark: ['采购经理查看退回率', '商务小微查看退回率']
        },
        thirdManager: {
          data: [[1, 0.5, 0.4], [1, 0.8, 0.3]],
          dataCircle1: 45,
          dataCircle2: 80
        }
      },
      // 月度累计和年度累计切换
      // triggleMonthYear: 'month',
      // 区域条件选择选项
      optionsChoose: [
        // {
        //   value: '1',
        //   label: '中国'
        // },
        // {
        //   value: '2',
        //   label: '美国'
        // },
        // {
        //   value: '3',
        //   label: '日本'
        // },
        // {
        //   value: '4',
        //   label: '英国'
        // },
        // {
        //   value: '5',
        //   label: '意大利'
        // }
      ],
      // 条件选择选项选中值
      // areaChoose: '中国',
      // 我的消息列表
      msgList: [
        /*
        1表示../../assets/index/index_note.png
        2表示../../assets/index/index_my_warning.png
        3表示../../assets/index/index_my_msg.png
        */
        {
          id: '1',
          type: 1,
          content: '线束报价模板审核驳回',
          time: '2018.06.20',
          source: '海达源'
        },
        {
          id: '2',
          type: 2,
          content: '您有一个需求未匹配到模板通知',
          time: '2018.06.20',
          source: '海达源'
        },
        {
          id: '3',
          type: 1,
          content: '您有一个显卡报价单需要制作',
          time: '2018.06.20',
          source: '海达源'
        },
        {
          id: '4',
          type: 3,
          content: '您有一个显卡报价单需要制作',
          time: '2018.06.20',
          source: '海达源'
        }
      ],
      show: {}
    }
  },
  computed: {
    triggleMonthYear() {
      return this.$store.getters.triggleMonthYear
    },
    areaChoose() {
      return this.$store.getters.areaChoose
    }
  },
  created() {
    var data = { typeCodes: '002' }
    selects(data).then(res => {
      if (res.resultData['002']) {
        this.optionsChoose = res.resultData['002']
      }
      // console.log(res)
    })
  },
  beforeMount() {
    Eventbus.$on('show', (show) => {
      this.show = show
      // console.log('this.show12', this.show)
    })
  },
  mounted() {

  },
  methods: {
    // 点击月度累计和年度累计按钮
    // changeColorMoths() {
    //   this.triggleMonthYear = 'month'
    //   Eventbus.$emit('triggleMonthYear', this.triggleMonthYear) // 事件总线
    // },
    // changeColorYear() {
    //   this.triggleMonthYear = 'year'
    //   Eventbus.$emit('triggleMonthYear', this.triggleMonthYear) // 事件总线
    // }
    // 选择不同地区
    // changeArea() {
    //   // console.log(this.areaChoose)
    //   if (this.areaChoose === '0001') {
    //     this.monthDatas.firstMicro.ydata1 = [150, 232, 201, 154, 150]
    //     this.monthDatas.firstMicro.ydata2 = [220, 182, 191, 234, 250]
    //     this.monthDatas.firstMicro.ydata3 = [320, 332, 301, 334, 370]
    //     this.monthDatas.firstMicro.ydata4 = [690, 746, 693, 722, 770]

    //     this.yearDatas.firstMicro.ydata1 = [150, 232, 201, 154, 190]
    //     this.yearDatas.firstMicro.ydata2 = [220, 182, 191, 234, 290]
    //     this.yearDatas.firstMicro.ydata3 = [320, 332, 301, 334, 350]
    //     this.yearDatas.firstMicro.ydata4 = [690, 746, 693, 722, 830]
    //   } else if (this.areaChoose === '0002') {
    //     this.monthDatas.firstMicro.ydata1 = [180, 232, 201, 154, 150]
    //     this.monthDatas.firstMicro.ydata2 = [250, 182, 191, 234, 250]
    //     this.monthDatas.firstMicro.ydata3 = [360, 332, 301, 334, 370]
    //     this.monthDatas.firstMicro.ydata4 = [790, 746, 693, 722, 770]

    //     this.yearDatas.firstMicro.ydata1 = [150, 230, 201, 154, 190]
    //     this.yearDatas.firstMicro.ydata2 = [220, 182, 191, 234, 290]
    //     this.yearDatas.firstMicro.ydata3 = [320, 332, 301, 334, 350]
    //     this.yearDatas.firstMicro.ydata4 = [690, 744, 693, 722, 830]
    //   } else if (this.areaChoose === '0003') {
    //     this.monthDatas.firstMicro.ydata1 = [150, 232, 181, 154, 150]
    //     this.monthDatas.firstMicro.ydata2 = [220, 182, 191, 234, 250]
    //     this.monthDatas.firstMicro.ydata3 = [320, 332, 301, 334, 370]
    //     this.monthDatas.firstMicro.ydata4 = [690, 746, 673, 722, 770]

    //     this.yearDatas.firstMicro.ydata1 = [150, 232, 201, 144, 190]
    //     this.yearDatas.firstMicro.ydata2 = [220, 182, 191, 224, 290]
    //     this.yearDatas.firstMicro.ydata3 = [320, 332, 301, 334, 350]
    //     this.yearDatas.firstMicro.ydata4 = [690, 746, 693, 702, 830]
    //   }
    // }
  }
}
</script>

<style>
.el-col.arrow-height {
  height: 60%;
  line-height: 60%;
  margin-top: 15px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
// 选择条件的样式
.selection-choose {
  padding: 30px;
  background-color: rgba(236, 236, 236, 1);
  // 条件内容样式
  .choose-content {
    width: 100%;
    .el-row {
      width: 100%;
      .el-col {
        width: 50%;
        margin-top: 1%;
        div {
          background-color: #fff;
          dl {
            border: 1px solid #d1d1d1;
            padding-bottom: 52%;
            height: 0;
            dt {
              font-size: 24px;
              position: relative;
              margin: 3% 0 2.5%;
              img {
                vertical-align: bottom;
                margin-right: 2%;
              }
              small {
                font-size: 14px;
                position: absolute;
                right: 2%;
                top: 0;
                cursor: pointer;
                i {
                  transform: rotate(180deg);
                }
              }
              small:hover {
                color: #2290ff;
              }
            }
            dd {
              margin: 0;
              padding: 0 3%;
              span {
                color: #7f8390;
                display: inline-block;
                margin-bottom: 2%;
                em {
                  font-style: normal;
                  color: #4a4a4a;
                }
              }
              ul {
                border-bottom: 1px solid #eee;
                padding: 1% 0;
                overflow: hidden;
                li {
                  margin: 0;
                  list-style-type: none;
                  float: left;
                  height: 10%;
                  line-height: 10%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  text-align: center;
                }
                li:nth-of-type(2) {
                  width: 50%;
                  text-align: left;
                }
                li:nth-of-type(3) {
                  width: 25%;
                }
                li:nth-of-type(4) {
                  width: 10%;
                }
              }
            }
            dd:last-of-type ul {
              border: none;
            }
            // dd:hover {
            //   // background-color: #f5f5f5;
            // }
          }
        }
      }
      .el-col:nth-of-type(2n + 1) {
        padding-right: 1%;
      }
      .el-col:nth-of-type(2n) {
        padding-left: 1%;
      }
    }
  }
  .el-row {
    width: 100%;
  }
  .el-row.choose {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    padding: 0 30px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #cecece;
    .el-col span {
      display: inline-block;
      height: 68px;
      margin-right: 5%;
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }
    .el-col span.choose {
      color: #2290ff;
      border-color: #2290ff;
    }
  }
}
</style>
