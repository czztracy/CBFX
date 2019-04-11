/*
* @Page: 报价单填报-> 需求号维度
* @Author: wjd
* @Date: 2018-12
* @Last Modified by: wangjiandong
*/
<template>
  <div v-loading="loading" ref="Box" class="Box listrequirements">
    <!-- 弹窗 -->
    <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
    <!-- 查询栏部分 -->
    <transition name="el-zoom-in-top">
      <div class="searchBar">
        <el-row>
          <!-- 收缩按钮后只展示第一行查询条件 -->
          <template>
            <el-col v-if="shrinkFirst" :span="22">
              <el-form
                ref="formInline"
                :inline="true"
                :model="formInline"
                :rules="rules"
                label-position="right"
              >
                <el-form-item
                  :label="$t('breakDown.area')"
                  :title="$t('breakDown.area')"
                  class="offerItem offerItem2"
                >
                  <el-select
                    v-model="formInline.region"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in regions"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item
                  :label="$t('Neednumberdimension.Sourceofdemand')"
                  :title="$t('Neednumberdimension.Sourceofdemand')"
                  class="offerItem offerItem2"
                >
                  <el-select
                    v-model="formInline.demandSource"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in needSources"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('Neednumberdimension.Requirementtype')"
                  :title="$t('Neednumberdimension.Requirementtype')"
                  class="offerItem offerItem2"
                >
                  <el-select
                    v-model="formInline.demandType"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in needTypes"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('Neednumberdimension.Demandforcoding')"
                  :title="$t('Neednumberdimension.Demandforcoding')"
                  class="offerItem offerItem2"
                >
                  <el-input v-model="formInline.demandCode" :disabled="true" :placeholder="$t('demandNoResolve.all')">
                    <span
                      slot="suffix"
                      class="picture"
                      @click="findDemandFilter('2',$t('breakDown.DemandCoding'),'DemandCoding',formInline.demandCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" class="img">
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('Neednumberdimension.Theindustryline')"
                  :title="$t('Neednumberdimension.Theindustryline')"
                  class="offerItem offerItem2"
                >
                  <el-select
                    v-model="formInline.industryName"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in Lines"
                      :key="item.industry_id"
                      :label="item.industry_name"
                      :value="item.industry_id"
                      value-key="item.industry_name"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col v-if="shrinkFirst" :span="2" class="shrinkTop">
              <el-button type="primary" @click="serch">{{ $t('breakDown.Query') }}</el-button>
            </el-col>
          </template>
          <!-- 收缩按钮不收缩的适合展示的查询条件 -->
          <el-col v-if="shrink" :span="22">
            <el-form
              ref="formInline"
              :inline="true"
              :model="formInline"
              :rules="rules"
              label-position="right"
            >
              <el-form-item
                :label="$t('breakDown.area')"
                :title="$t('breakDown.area')"
                class="offerItem"
              >
                <el-select
                  v-model="formInline.region"
                  :placeholder="$t('demandNoResolve.select')"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in regions"
                    :key="item.dictionaryId"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('Neednumberdimension.Sourceofdemand')"
                :title="$t('Neednumberdimension.Sourceofdemand')"
                class="offerItem"
              >
                <el-select
                  v-model="formInline.demandSource"
                  :placeholder="$t('demandNoResolve.select')"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in needSources"
                    :key="item.dictionaryId"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('Neednumberdimension.Requirementtype')"
                :title="$t('Neednumberdimension.Requirementtype')"
                class="offerItem"
              >
                <el-select
                  v-model="formInline.demandType"
                  :placeholder="$t('demandNoResolve.select')"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in needTypes"
                    :key="item.dictionaryId"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('Neednumberdimension.Demandforcoding')"
                :title="$t('Neednumberdimension.Demandforcoding')"
                class="offerItem"
              >
                <el-input v-model="formInline.demandCode" :draggable="true" :placeholder="$t('demandNoResolve.all')">
                  <span
                    slot="suffix"
                    class="picture"
                    @click="findDemandFilter('2',$t('breakDown.DemandCoding'),'DemandCoding',formInline.demandCode)"
                  >
                    <img src="../../../assets/index/images/searcho.png" class="img">
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('Neednumberdimension.Theindustryline')"
                :title="$t('Neednumberdimension.Theindustryline')"
                class="offerItem"
              >
                <el-select
                  v-model="formInline.industryName"
                  :placeholder="$t('demandNoResolve.select')"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in Lines"
                    :key="item.industry_id"
                    :label="item.industry_name"
                    :value="item.industry_id"
                    value-key="item.industry_name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('demandNoResolve.manager')"
                :title="$t('demandNoResolve.manager')"
                class="offerItem hideBottom managerStyle"
              >
                <el-input v-model="formInline.managerCode" :disabled="true" :placeholder="$t('demandNoResolve.all')">
                  <span
                    slot="suffix"
                    class="picture"
                    @click="findDemandFilter('3',$t('demandNoResolve.manager'),'purchaseMan',formInline.managerCode)"
                  >
                    <img src="../../../assets/index/images/searcho.png" class="img">
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('specialNumberDimension.startDate')"
                :title="$t('specialNumberDimension.startDate')"
                class="offerItem hideBottom"
              >
                <el-date-picker
                  v-model="formInline.taskStartDateStart"
                  type="daterange"
                  range-separator="-"
                  start-placeholder
                  end-placeholder
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item
                :label="$t('demanddimension.searchbar.endDate')"
                :title="$t('demanddimension.searchbar.endDate')"
                class="offerItem hideBottom"
              >
                <el-date-picker
                  v-model="formInline.taskEndDateStart"
                  type="daterange"
                  range-separator="-"
                  start-placeholder
                  end-placeholder
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <!-- 完成率上移 -->
              <div style = "display:inline-block;width:22%">
                <el-form-item
                  :label="$t('Neednumberdimension.PCT')"
                  :title="$t('Neednumberdimension.Completionrate')"
                  prop="rateMin"
                  class="offerMan offerMan1 offerItem2 hideBottom"
                >
                  <el-input
                    v-model="formInline.rateMin"
                    @blur="getFinishRate1(formInline.rateMin)"
                    @keydown.native="submit($event)"
                  >
                    <span slot="suffix" class="pic" style="line-height: 26px; font-size: 16px;">%</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="—" class="offerMan offerMan2 offerItem2 hideBottom" prop="rateMax">
                  <el-input
                    v-model="formInline.rateMax"
                    @blur="getFinishRate2(formInline.rateMax)"
                    @keydown.native="submit2($event)"
                  >
                    <span slot="suffix" class="pic" style="line-height: 26px; font-size: 16px;">%</span>
                  </el-input>
                </el-form-item>
              </div>

            </el-form>
          </el-col>
          <el-col v-if="shrink" :span="2">
            <el-button type="primary" @click="serch">{{ $t('breakDown.Query') }}</el-button>
          </el-col>
        </el-row>
      </div>
    </transition>
    <!-- 收缩按钮 -->
    <div class="changeBox">
      <p class="changeBtn" @click="shrinkChange">
        <span :class="[changeBtn ? 'godown' : 'goup']">
          <i class="fa fa-angle-up"/>
        </span>
      </p>
    </div>
    <div class="listBox">
      <!-- 需求号 -->
      <!-- <div class="table">
        <div class="left">
          <div class="top">
            <div class="tableBox">
              <el-row>
                <el-col :span="4">
                  {{ $t('Neednumberdimension.Needsno') }}
                </el-col>
                <el-col :span="4">
                  {{ $t( 'Neednumberdimension.AggregateDemand' ) }}：
                  <span
                    style="font-size: 20px;"
                  >{{ xqResolveAll }}</span>
                </el-col>
                <el-col :span="16">
                  <div>

                    <span
                      style="margin-right:7%"
                    >
                      <span style="width:14px;height:14px;background-color:#007cff;margin-bottom:0"/>
                      <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolving' ) }}：{{ xqResolving }}</span>
                    </span>
                    <span
                      style="margin-right:7%"
                    >
                      <span style="width:14px;height:14px;background-color:#ff9e00;margin-bottom:0"/>
                      <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ xqNoResolve }}</span>
                    </span>
                  </div>

              </el-col></el-row>

            </div>
          </div>
        </div>
      </div> -->
      <!-- 滑块按钮 -->
      <div class="Btn">
        <div v-show="offerList" style="overflow: hidden; display: inline-block;float:left;" @click="Bool = !Bool">
          <el-button v-if="Bool">
            <i class="fa fa-lock" style="margin-right: 6px;"/>
            {{ $t('breakDown.inkFreezer') }}
          </el-button>
          <el-button v-else>
            <i class="fa fa-unlock-alt" style="margin-right: 6px;"/>
            {{ $t('breakDown.unfreezeAll') }}
          </el-button>
        </div>
        <div class="total">
          {{ $t('breakDown.total') }}
          <span>{{ total }}</span>
          {{ $t('breakDown.record') }}
        </div>
        <!-- 下载按钮 -->
        <div v-show="offerList" class="download-btn-group">
          <i class="i-center"/>
          <!-- <el-button @click="tableDownload"> -->
          <el-button @click="downLoad">
            <i class="fa fa-download"/>
            {{ $t('buttonGroup.exlUpload') }}
          </el-button>
        </div>

        <span style="margin:0 2% 0 13%;height:40px;line-height:40px;color: #4a4a4a;min-width:10%;max-width:14%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:14px">
          {{ $t( 'Neednumberdimension.Total' ) }}：
          <span
          >{{ xqResolveAll }}</span>
        </span>
        <span
          style="margin-right:2%;color: #4a4a4a;height:40px;line-height:40px;font-size:14px;min-width:10%;max-width:14%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
        >
          <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color:#007cff;margin-bottom:0"/>
          <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolving' ) }}：{{ xqResolving }}</span>
        </span>
        <span
          style="margin-right:2%;color: #4a4a4a;height:40px;line-height:40px;font-size:14px;min-width:10%;max-width:14%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
        >
          <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color:#ff9e00;margin-bottom:0"/>
          <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ xqNoResolve }}</span>
        </span>

      </div>
      <!-- 滑块 -->
      <div v-if="!Bool" class="block">
        <el-slider v-model="slidingBlock" :show-tooltip="false"/>
      </div>
      <!-- 表格部分 -->
      <div ref="box" class="Table">
        <el-table
          :data="offerList"
          :header-cell-style="headerStyle"
          :cell-style="{'text-align': 'center'}"
          class="table-style1"
          stripe
          style="width: 100%"
        >
          <!-- 客户 -->
          <el-table-column
            :fixed="silder1"
            :label="$t('Neednumberdimension.Customer')"
            prop="customer"
            width="90"
          />
          <!-- 区域 -->
          <el-table-column
            :fixed="silder2"
            :label="$t('Neednumberdimension.Region')"
            prop="region"
            width="80"
          />
          <!-- 需求来源 -->
          <el-table-column
            :fixed="silder3"
            :label="$t('Neednumberdimension.Sourceofdemand')"
            prop="demandSource"
            width="90"
          />
          <!-- 需求类型 -->
          <el-table-column
            :fixed="silder4"
            :label="$t('Neednumberdimension.Requirementtype')"
            prop="demandType"
            width="110"
          />
          <!-- 产业线 -->
          <el-table-column
            :fixed="silder5"
            :label="$t('Neednumberdimension.Theindustryline')"
            prop="industryName"
            width="110"
          />
          <!-- 需求编码 -->
          <el-table-column
            :fixed="silder6"
            :label="$t('Neednumberdimension.Demandforcoding')"
            prop="demandCode"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>{{ scope.row.demandCode }}</p>
                <div slot="reference" class="unallshow">
                  <router-link
                    :to="{path:'./listrequirementsListprivate', query: {demand_code: scope.row.demandCode}}"
                    class="demandCODE"
                  >{{ scope.row.demandCode }}</router-link>
                </div>
              </el-popover>
            </template>

          </el-table-column>
          <!-- 需求描述 -->
          <el-table-column
            :fixed="silder7"
            :label="$t('Neednumberdimension.Requirementdescription')"
            prop="remarks"
            width="160"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>{{ scope.row.remarks }}</p>
                <div slot="reference" class="unallshow">{{ scope.row.remarks }}</div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 采购经理 -->
          <el-table-column
            :fixed="silder8"
            :label="$t('demandNoResolve.manager')"
            prop="manager"
            width="100"
          />
          <!-- 物料号数量 -->
          <el-table-column
            :fixed="silder9"
            :label="$t('Neednumberdimension.Quantitynumber')"
            prop="moduleCount"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>{{ scope.row.moduleCount }}</p>
                <div slot="reference" class="unallshow">{{ scope.row.moduleCount }}</div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 结果显示日期 -->
          <el-table-column
            :fixed="silder10"
            :label="$t('materielNumForTask.resultPublick')"
            prop="resultDate"
            width="120"
          />
          <!-- 任务开始日期 -->
          <el-table-column
            :label="$t('Neednumberdimension.Startdate')"
            prop="startReportDate"
            width="110"
          />
          <!-- 任务截止日期 -->
          <el-table-column
            :label="$t('demanddimension.searchbar.endDate')"
            prop="endReportDate"
            width="110"
          />
          <!-- 物料号进度 -->
          <el-table-column
            :label="$t('Neednumberdimension.Materialnumberprogress')"
            prop="moduleDecompose"
          >
            <!-- <el-table-column
              :label="$t('Neednumberdimension.Decomposed')"
              prop="county"
              width="160"
            /> -->
            <el-table-column
              :label="$t('Neednumberdimension.Inthedecomposition')"
              prop="countf"
              width="110"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.countf }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.countf }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('Neednumberdimension.Undecomposed')"
              prop="countw"
              width="110"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.countw }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.countw }}</div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- 完成率 -->
          <el-table-column
            :label="$t('Neednumberdimension.Completionrate')"
            prop="crate"
            width="100"
          />
        </el-table>
      </div>
      <!-- 分页 -->
      <div>
        <el-pagination
          ref="paging"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          :prev-text="$t('demandForFiltering.previousPage')"
          :next-text="$t('demandForFiltering.nextPage')"
          class="paging"
          layout="prev, pager, next, jumper"
          background
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <iframe name = "tempiframe" style="display:none"/>
  </div>
</template>
<script>
import { timeHandling } from '@/utils/timeHandling'
import Language from '@/utils/language'
import { selects, industryLine, flagFindData } from '@/api/requirements'
import { getListPrivate, getResolveModuleProgress } from '@/api/offersheet'
import { demandNumberSchedule } from '@/api/quotation'
// import { taskMan } from '@/api/quoteoperational'
import Dialog from '@/components/Dialog/searchBox'
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
// import { quotationRequest } from '@/api/quotation'
import { getDemandExcel } from '@/api/downloadurl'
export default {
  name: 'Listrequirements',
  components: {
    Dialog
  },
  mixins: [Language],
  data() {
    // 完成率判断
    const validateFinishRate1 = (rule, value, callback) => {
      const reg = /^\d+$/g
      if (value !== '') {
        value = Number(value)
        if (!reg.test(value)) {
          this.completionRate = false
          callback(new Error('请输入0-100之间的正整数'))
        } else {
          this.completionRate = true
        }
      } else {
        this.completionRate = true
      }
    }
    const validateFinishRate2 = (rule, value, callback) => {
      const reg = /^\d+$/g
      if (value !== '') {
        value = Number(value)
        if (!reg.test(value)) {
          this.completionRate = false
          callback(new Error('请输入0-100之间的正整数'))
        } else {
          this.completionRate = true
        }
      } else {
        this.completionRate = true
      }
    }
    return {
      selectData: {},
      // 收缩按钮判断是否收缩
      shrink: true,
      shrinkFirst: false,
      // 采购经理数据处理暂存
      managerCodes: [],
      // 需求号分解状态
      xqResolveAll: '', // 总数
      xqResolved: '', // 已分解
      xqResolving: '', // 分解中
      xqNoResolve: '', // 未分解
      // 物料号分解状态
      resolveAll: '', // 总数
      resolved: '', // 已分解
      resolving: '', // 分解中
      NoResolve: '', // 未分解
      formInline: {// 查询栏数据
        requestType: '1', // 类别
        region: [], // 区域
        demandSource: [], // 需求来源
        demandType: [], // 需求类型
        demandCode: '', // 需求编码
        industryName: [], // 产业线
        managerCode: '', // 采购经理
        managerCodeId: '', // 采购经理id
        taskStartDateStart: '', // 任务开始日期起始值
        // taskStartDateEnd: '', // 任务开始日期结束值
        taskEndDateStart: '', // 任务结束日期起始值
        // taskEndDateEnd: '', // 任务结束日期结束值
        rateMin: '', // 最小完成率
        rateMax: '', // 最大完成率
        pageSize: 6, // 每页条数
        pageNo: ''
      },
      startDay: '', // 任务开始日期
      endDay: '', // 任务截止日期
      completionRate: true, // 完成率格式是否正确
      // 完成率判断
      rules: {
        rateMin: [{ type: 'number', validator: validateFinishRate1, message: '请输入0-100之间的正整数' }],
        rateMax: [{ type: 'number', validator: validateFinishRate2, message: '请输入0-100之间的正整数' }]
      },
      // 搜索框弹框数据
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框中表格数据总数
        searchTotal: 1,
        // TableName
        tableName: '',
        // 循环的内容
        gridData: [],
        // 承接的数组
        Arr: [],
        // 每页显示的条数
        pageSize: 9,
        // 总页数
        searchTotalPage: 0
      },
      regions: [], // select 区域
      needSources: [], // select 需求来源
      needTypes: [], // select 需求类型
      Lines: [], // select 产业线
      changeBtn: 1,
      Bool: 1, // 冻结功能
      slidingBlock: 0, // 滑块
      offerList: [],
      // 滑动部分
      silder1: false,
      silder2: false,
      silder3: false,
      silder4: false,
      silder5: false,
      silder6: false,
      silder7: false,
      silder8: false,
      silder9: false,
      silder10: false,
      total: 0, // 总数
      loading: true, // 数据加载
      // 最下分页
      pageSize: 10,
      currentPage: 1
    }
  },
  computed: {
    // ...mapGetters(['avatar', 'name']),
    ...mapGetters(['name', 'userCode', 'loginName', 'company', 'avatarCode'])
    // ...mapGetters(['supplierCode', 'supplierCode']),
    // ...mapGetters(['supplierName', 'supplierName'])
  },
  watch: {
    // 滑块监听
    slidingBlock(val) {
      // if (this.$refs.box.clientWidth <= 1608) {
      if (val >= 8.7) {
        this.silder1 = true
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 8.7
      } else {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 0
      }
      if (val >= 16) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 16
      }
      if (val >= 24.8) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 24.8
      }
      if (val >= 35) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 35
      }
      if (val >= 45.3) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 45.3
      }
      if (val >= 55) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 55
      }
      if (val >= 70) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 70
      }
      if (val >= 79.3) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 79.3
      }
      if (val >= 89) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.silder9 = true
        this.silder10 = false
        this.slidingBlock = 89
      }
      if (val === 100) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.silder9 = true
        this.silder10 = true
        this.slidingBlock = 100
      }
      // if (val >= 79.3) {
      //   this.silder1 = true
      //   this.silder2 = true
      //   this.silder3 = true
      //   this.silder4 = true
      //   this.silder5 = true
      //   this.silder6 = true
      //   this.silder7 = true
      //   this.silder8 = true
      //   this.slidingBlock = 79.3
      // }
    },
    // 滑块按钮
    Bool(val) {
      if (val) {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 0
      }
    },
    startDate(val) {
      console.log(val)
    }
  },
  mounted() {
    this.selectList()
    this.findDemandDimension()
    this.getMaterial()
    this.getDemand()
    // this.onSubmit()
  },
  methods: {
    // 点击批量下载
    downLoad() {
      const params = {
        'excelName': '3', // excel名称
        'searchParams': {}
      }
      params.searchParams = JSON.parse(JSON.stringify(this.selectData))
      // params.searchParams.currentPage = 1
      // params.searchParams.pageSize = 10000
      delete params.searchParams.currentPage
      delete params.searchParams.pageSize
      // window.open(getDemandExcel(params))
      var a = document.createElement('a')
      var url = getDemandExcel(params)
      console.log('url下载', url)
      console.log('下载传参', params)
      document.body.appendChild(a)
      a.href = url
      // a.download = '2.xls'
      a.target = 'tempiframe'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },
    // 收缩按钮方法
    shrinkChange() {
      this.shrink = !this.shrink
      this.shrinkFirst = !this.shrinkFirst
      this.changeBtn = !this.changeBtn
    },
    // 完成率开始
    getFinishRate1(val) {
      this.formInline.rateMin = this.formInline.rateMin.toString().replace(/[^\d]/g, '')
      if (this.formInline.rateMin < 0) {
        this.formInline.rateMin = 0
      } else if (this.formInline.rateMin > 100) {
        this.formInline.rateMin = 100
      }
      // if (this.formInline.crate_s !== null) {
      //   if (this.formInline.crate_s > this.formInline.crate_e) {
      //     this.formInline.crate_e = this.formInline.crate_s
      //   }
      // }
    },
    submit(ev) {
      // console.log(ev.keyCode, '键值')
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        // console.log(ev.keyCode)
        this.formInline.rateMin = this.formInline.rateMin.toString().replace(/[^\d]/g, '')
      }
      if (this.formInline.rateMin < 0) {
        this.formInline.rateMin = 0
      } else if (this.formInline.rateMin > 100) {
        this.formInline.rateMin = 100
      }
    },
    // 完成率结束
    getFinishRate2(val) {
      this.formInline.rateMax = this.formInline.rateMax.toString().replace(/[^\d]/g, '')
      if (this.formInline.rateMax < 0) {
        this.formInline.rateMax = 0
      } else if (this.formInline.rateMax > 100) {
        this.formInline.rateMax = 100
      }
      if (this.formInline.rateMin !== null) {
        if (this.formInline.rateMin > this.formInline.rateMax) {
          this.formInline.rateMax = this.formInline.rateMin
        }
      }
    },
    submit2(ev) {
      // console.log(ev.keyCode, '键值')
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        // console.log(ev.keyCode)
        this.formInline.rateMax = this.formInline.rateMax.toString().replace(/[^\d]/g, '')
      }
      if (this.formInline.rateMax < 0) {
        this.formInline.rateMax = 0
      } else if (this.formInline.rateMax > 100) {
        this.formInline.rateMax = 100
      }
      if (this.formInline.rateMin !== null) {
        if (this.formInline.rateMin > this.formInline.rateMax) {
          this.formInline.rateMax = this.formInline.rateMin
        }
      }
    },
    // 弹窗上的搜索按钮
    findDemandFilter(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      // 传过去回显check数据
      this.searchData.checkList = []
      if (checkValue !== '') {
        if (name === 'purchaseMan') {
          // 采购经理
          this.searchData.checkList = this.managerCodes.map(function(value, index, array) {
            return value.manager
          })
        } else {
          this.searchData.checkList = checkValue.split(',')
        }
      }
      // console.log(data, 'TableName: ', TableName)
      flagFindData(params).then(res => {
        // 总条数
        this.searchData.searchTotal = res.resultData.length
        // 总的数据 check的数据
        this.searchData.gridData = res.resultData
        // 承接的数据
        this.searchData.Arr = res.resultData
        // 总页数
        this.searchData.searchTotalPage = Math.ceil(res.resultData.length / this.searchData.pageSize)
        // 第一页数据
        this.searchData.gridData = this.searchData.gridData.slice(0, this.searchData.pageSize)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 任务人模糊搜索弹框
    // taskMan(nameVal, searchTitle, name) {
    //   const params = { manager: nameVal }
    //   this.searchData.searchJian = name
    //   taskMan(params).then(res => {
    //     // 总条数
    //     this.searchData.searchTotal = res.resultData.length
    //     // 总的数据 check的数据
    //     this.searchData.gridData = res.resultData
    //     // 承接的数据
    //     this.searchData.Arr = res.resultData
    //     // 总页数
    //     this.searchData.searchTotalPage = Math.ceil(res.resultData.length / this.searchData.pageSize)
    //     // 第一页数据
    //     this.searchData.gridData = this.searchData.gridData.slice(0, this.searchData.pageSize)
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    //   // 弹窗控制按钮
    //   this.searchData.dialogTableVisible = true
    //   // 请求得TableName值
    //   this.searchData.tableName = nameVal
    //   this.$store.dispatch('Dialog', searchTitle)
    // },
    // 子元素传来的data
    getChildData(val) {
      console.log(val)
      if (val.inputValue === 'category') {
        this.formInline.category = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierCode') {
        this.formInline.supplierCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.formInline.supplierName = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        this.formInline.moduleCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        this.formInline.demandCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskone') {
        this.formInline.managerCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'purchaseMan') {
        this.formInline.managerCode = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
        console.log('this.managerCodes', this.managerCodes, this.formInline.managerCode)
        var tmp2 = this.managerCodes.map(function(value, index, array) {
          return value.managerCode
        })
        this.formInline.managerCodeId = tmp2.join(',')
        // var val1 = JSON.parse(JSON.stringify(val))
        // this.managerCodes = val.checkedCities
        // var tmp1 = val1.checkedCities.map(function(value, index, array) {
        //   return value.manager
        // })
        // this.formInline.managerCode = tmp1.join(',')
        // var tmp2 = val1.checkedCities.map(function(value, index, array) {
        //   return value.managerCode
        // })
        // this.formInline.managerCodeId = tmp2.join(',')
      }
    },
    // 下拉框数据
    selectList() {
      const params = {
        typeCodes: '002,003,004'
      }
      selects(params)
        .then(res => {
          console.log(res.resultData)
          this.regions = res.resultData['002']
          this.needSources = res.resultData['003']
          this.needTypes = res.resultData['004']
          // this.Lines = res.resultData['008']
        })
        .catch(err => {
          console.log(err)
        })
      // 产业线接口
      industryLine().then(res => {
        console.log(res)
        this.Lines = res.resultData
      }).catch(res => {
        console.log('产业线请求失败')
      })
    },
    // 查询按钮重置页数
    serch() {
      this.currentPage = 1
      this.findDemandDimension()
      // this.getMaterial()
      this.getDemand()
    },
    // 查询按钮 待修改
    findDemandDimension() {
      if (this.formInline.taskStartDateStart) {
        this.formInline.start_report_date_s = this.formInline.taskEndDateStart[0]
        this.formInline.start_report_date_e = this.formInline.taskEndDateStart[1]
      } else if (this.formInline.taskStartDateStart === null) {
        this.formInline.start_report_date_s = ''
        this.formInline.start_report_date_e = ''
      }
      if (this.formInline.taskEndDateStart) {
        this.formInline.end_report_date_s = this.formInline.taskEndDateStart[0]
        this.formInline.end_report_date_e = this.formInline.taskEndDateStart[1]
      } else if (this.formInline.taskEndDateStart === null) {
        this.formInline.end_report_date_s = ''
        this.formInline.end_report_date_e = ''
      }
      // console.log(this.startDate, this.endDate, '时间')
      if (this.completionRate === false) {
        this.$message({
          type: 'error',
          message: '请正确填写完成率'
        })
      } else {
        this.loading = true
        let params = {
          flag: 1,
          bjflag: 3,
          start_report_date_s: this.formInline.taskStartDateStart[0], // 任务开始时间开始
          start_report_date_e: this.formInline.taskStartDateStart[1], // 任务开始时间结束
          end_report_date_s: this.formInline.taskEndDateStart[0], // 任务结束时间开始
          end_report_date_e: this.formInline.taskEndDateStart[1], // 任务结束时间结束
          crate_s: this.formInline.rateMin, // 完成率开始
          crate_e: this.formInline.rateMax, // 完成率结束
          pageSize: this.pageSize, // 每页的数量
          currentPage: this.currentPage, // 当前页数
          region: this.formInline.region, // 区域数组
          demand_source: this.formInline.demandSource, // 需求来源数组
          demand_type: this.formInline.demandType, // 需求类型数组
          demand_code: this.formInline.demandCode.split(','), // 需求编码字符串切割数组
          // supplier_code: [this.loginName], // 供应商编码暂时没有必传值 supplierCode
          // supplier_name: [this.company], // 供应商名称暂时没有必穿值 supplierName
          industry_id: this.formInline.industryName, // 产业线ID待处理
          manager_code: this.formInline.managerCodeId.split(',') // 采购经理ID
        }
        this.selectData = params
        // 判断演示，本地，正式环境
        // if (judgeUrl() === '001' || judgeUrl() === '003') {
        //   params.supplier_code = [this.loginName]
        //   params.supplier_name = [this.company]
        // }
        // 判断leader
        // if (this.avatarCode === '0005') {
        //   params.supplier_code = []
        //   params.supplier_name = []
        // }
        if (params.demand_code[0] === '') {
          params.demand_code.splice(0, 1)
        }
        if (params.manager_code[0] === '') {
          params.manager_code.splice(0, 1)
        }
        params = JSON.parse(JSON.stringify(params))
        console.log('列表请求params', params)
        getListPrivate(params).then(res => {
          console.log('列表res', res)
          if (res.resultData.count) {
            this.total = res.resultData.count
          } else {
            this.total = 0
            this.Bool = 1
          }
          // 时间处理
          if (res.resultData.data) {
            // console.log(1)
            this.offerList = res.resultData.data.map(function(value, index, array) {
              if (value.endReportDate) {
                value.endReportDate = timeHandling(value.endReportDate)
              }
              if (value.reportDate) {
                value.reportDate = timeHandling(value.reportDate)
              }
              if (value.resultDate) {
                value.resultDate = timeHandling(value.resultDate)
              }
              if (value.startReportDate) {
                value.startReportDate = timeHandling(value.startReportDate)
              }
              return value
            })
          } else {
            this.offerList = res.resultData.data
          }
          this.loading = false
          console.log(res.resultData, '任务管理')
        }).catch(res => {
          this.loading = false
          console.log('失败')
        })
      }

      // quotationRequest(params).then(res => {
      //   console.log(res.resultData, '任务运行管理列表')
      //   this.loading = false
      //   // this.total = parseInt(res.resultData.reportDataCount)
      //   // this.offerList = res.resultData.reportDataList
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 表格head
    headerStyle({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'background-color: #FFFFFF; text-align: center'
      } else {
        return 'color: #4A4A4A; background-color: #FFFFFF; text-align: center;'
      }
    },
    // 分页部分
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.findDemandDimension()
      // this.onSubmit()
    },
    // 表格需求编码
    handleJoinPeople(row) {
      console.log(row)
    },
    // 物料号接口
    getMaterial() {
      // const url = 'http://47.104.98.71:8780/costmanagement/task/getResolveDemandProgress'
      const data = {
        'demand_code': this.formInline.demandCode.split(','), // 需求编码多选
        'region': this.formInline.region, // 区域
        'demand_source': this.formInline.demandSource, // 需求来源
        'demand_type': this.formInline.demandType, // 需求类型
        'demand_analysis_id': [], // 需求ID
        'manager': this.formInline.managerCode.split(','), // 任务人
        'manager_code': this.formInline.managerCodeId.split(','), // 任务人编号
        // 'supplier_code': [this.loginName], // 供应商编码必填需要从登陆用户中获取
        // 'supplier_name': [this.company], // 供应商名称必填需要从登陆用户中获取
        'starttime_begin': this.formInline.taskStartDateStart[0], // 任务开始日期
        'starttime_end': this.formInline.taskStartDateStart[1], // 任务结束日期
        'overtime_begin': this.formInline.taskEndDateStart[0], // 任务截止开始日期
        'overtime_end': this.formInline.taskEndDateStart[1], // 任务截止结束日期
        'industry_id': this.formInline.industryName, // 产业线ID
        'progress_begin': this.formInline.rateMin, // 完成率前
        'category_en': [], // 物料类别
        'module_analysis_id': [], // 物料号
        'progress_end': this.formInline.rateMax // 完成率后
      }
      // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   data.supplier_code = [this.loginName]
      //   data.supplier_name = [this.company]
      // }
      // 判断leader
      // if (this.name === 'leader') {
      //   data.supplier_code = []
      //   data.supplier_name = []
      // }
      if (data.demand_code[0] === '') {
        data.demand_code.splice(0, 1)
      }
      if (data.manager_code[0] === '') {
        data.manager_code.splice(0, 1)
      }
      if (data.manager[0] === '') {
        data.manager.splice(0, 1)
      }
      //   this.$axios({ url, data, method: 'post', 'headers': {
      //     'Content-Type': 'application/json'
      //   }})
      //     .then(res => {
      //       console.log('物料号分解请求成功', res)
      //       // this.resolved = res.data.resultData.yfj_num
      //       this.xqResolved = res.data.resultData.yfj_num
      //       // this.resolving = res.data.resultData.fjz_num
      //       this.xqResolving = res.data.resultData.fjz_num
      //       // this.NoResolve = res.data.resultData.wfj_num
      //       this.xqNoResolve = res.data.resultData.wfj_num
      //       // this.resolveAll = res.data.resultData.sum_num
      //       this.xqResolveAll = res.data.resultData.sum_num
      //     })
      //     .catch('物料号分解请求失败')
      // },
      getResolveModuleProgress(data).then(res => {
        console.log('物料号分解请求成功', res)
        this.resolved = res.resultData.yfj_num
        this.resolving = res.resultData.fjz_num
        this.NoResolve = res.resultData.wfj_num
        this.resolveAll = res.resultData.sum_num
      }).catch(res => {
        console.log('物料号分解请求失败')
      })
    },
    // 需求号接口
    getDemand() {
      // const url = 'http://47.104.98.71:8780/costmanagement/task/getResolveDemandProgress'
      const data = {
        'demand_code': this.formInline.demandCode.split(','), // 需求编码
        'region': this.formInline.region, // 区域
        'demand_source': this.formInline.demandSource, // 需求来源
        'demand_type': this.formInline.demandType, // 需求类型
        'demand_analysis_id': [], // 需求ID
        'manager': this.formInline.managerCode.split(','), // 任务人
        'manager_code': this.formInline.managerCodeId.split(','), // 任务人编号
        // 'supplier_code': [this.loginName], // 供应商编码必填需要从登陆用户中获取 supplierCode
        // 'supplier_name': [this.company], // 供应商名称必填需要从登陆用户中获取 supplierName
        'starttime_begin': this.formInline.taskStartDateStart[0], // 任务开始日期
        'starttime_end': this.formInline.taskStartDateStart[1], // 任务结束日期
        'overtime_begin': this.formInline.taskEndDateStart[0], // 任务截止开始日期
        'overtime_end': this.formInline.taskEndDateStart[1], // 任务截止结束日期
        'industry_id': this.formInline.industryName, // 产业线ID
        'progress_begin': this.formInline.rateMin, // 完成率前
        'module_analysis_id': [], // 物料号
        'progress_end': this.formInline.rateMax // 完成率后
      }
      // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   data.supplier_code = [this.loginName]
      //   data.supplier_name = [this.company]
      // }
      // if (this.name === 'leader') {
      //   data.supplier_code = []
      //   data.supplier_name = []
      // }
      if (data.demand_code[0] === '') {
        data.demand_code.splice(0, 1)
      }
      if (data.manager_code[0] === '') {
        data.manager_code.splice(0, 1)
      }
      if (data.manager[0] === '') {
        data.manager.splice(0, 1)
      }
      // this.$axios({ url, data, method: 'post', 'headers': {
      //   'Content-Type': 'application/json'
      // }})
      //   .then(res => {
      //     console.log('物料号分解请求成功', res)
      //     // this.xqResolved = res.data.resultData.yfj_num
      //     this.resolved = res.data.resultData.yfj_num
      //     // this.xqResolving = res.data.resultData.fjz_num
      //     this.resolving = res.data.resultData.fjz_num
      //     // this.xqNoResolve = res.data.resultData.wfj_num
      //     this.NoResolve = res.data.resultData.wfj_num
      //     // this.xqResolveAll = res.data.resultData.sum_num
      //     this.resolveAll = res.data.resultData.sum_num
      //   })
      //   .catch('物料号分解请求失败')
      demandNumberSchedule(data).then(res => {
        console.log('demand分解请求成功', res)
        this.xqResolved = res.resultData.yfj_num
        this.xqResolving = res.resultData.fjz_num
        this.xqNoResolve = res.resultData.wfj_num
        this.xqResolveAll = parseInt(res.resultData.fjz_num) + parseInt(res.resultData.wfj_num)
      }).catch(res => {
        console.log('demand分解请求失败')
      })
    }
  }
}
</script>
<style>
.listrequirements .offerMan1 label{
  width:43% !important
}
.listrequirements .offerMan1 .el-form-item__content{
  width:57% !important
}

.listrequirements .offerMan2 label{
  width:20% !important
}
.listrequirements .offerMan2 .el-form-item__content{
  width:75% !important
}
.managerStyle label{
  width:38% !important
}
.managerStyle .el-form-item__content{
  width:60% !important
}
.hideBottom{
  margin-bottom: 0 !important
}
</style>

<style scoped>
.offerMan2{
  width:40% !important;
  margin-right:0 !important
}
.offerMan1{
  width:55% !important;
  margin-right:0 !important
}
.managerStyle{
  width:14% !important
}

.Box .unallshow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Box .Btn span{
  display: inline-block
}
.Box {
  padding: 18px;
  background: rgba(244, 244, 244, 1);
  min-height: calc(100vh - 153px);
}
.searchBar {
  padding: 34px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid #cecece;
}
.Box .searchBar .datePosition {
  right: 62px;
  top: 0;
}
.line {
  width: 1px;
  height: 22px;
  background-color: #cecece;
  margin-top: 10px;
}
/* 收缩按钮 */
.changeBox {
  overflow: hidden;
  background: rgba(244, 244, 244, 1);
  position: relative;
  height: 1.5vw;
}
.changeBtn span {
  display: inline-block;
  height: 16px;
  color: #666666;
  position: absolute;
  left: 50%;
  padding: 0 15px;
  margin-left: -20px;
  top: -1px;
  cursor: pointer;
}
.changeBtn {
  width: 3.15%;
  height: 16px;
  margin: 0 auto;
  display: block;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
  border-radius: 0 0 5px 5px;
  border: 1px solid #cecece;
  border-top: 0;
}
.goup {
  transform: rotate(180deg);
  transition: all 0.5s ease;
}
.godown {
  transform: rotate(360deg);
  transition: all 0.5s ease;
}
/* 表格部分 */

/* 物料号 需求号 */
.listBox {
  background: rgba(255, 255, 255, 1);
  border: 1px solid #d1d1d1;
}
.listBox .table {
  padding: 15px 15px;
  margin: 0 4px;
  padding-bottom: 15px;
  border-bottom: 1px solid #cecece;
  overflow: hidden;
}
.listBox .table .left {
  float: left;
  /* border-right: 1px solid #d1d1d1; */
  padding-right: 20px;
  width: 100%;
}
.listBox .table .left .top,
.text {
  width: 100%;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  line-height: 28px;
}
.listBox .table .left .text {
  padding-left: 10px;
}
.listBox .table .left .top p {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
  line-height: 19px;
  float: right;
}
.listBox .table .left .top .tableBox {
  /* text-align: center; */
  overflow: hidden;
}
.tableBox .el-col div {
  display: flex;
  margin-bottom: 2px;
  font-size: 16px;
}
.tableBox .el-col div span {
  display: inline-block;
  text-align: left;
  margin: 0 2px;
}
.tableBox .el-col div:last-child span:nth-of-type(1) {
  height: 14px;
  /* background-color: #05cd00; */
  border-radius: 4px;
  margin-bottom: 6px;
}
.tableBox .el-col div:last-child span:nth-of-type(2) {
  height: 14px;
  /* background-color: #007cff; */
  border-radius: 4px;
}
.tableBox .el-col div:last-child span:nth-of-type(3) {
  height: 14px;
  /* background-color: #ff9e00; */
  border-radius: 4px;
}
.listBox .table .left .top .tableBox .per {
  margin-top: 20px;
  /* width: 78%; */
  /* display: inline-block; */
  float: left;
}
.listBox .table .left .top .tableBox .per1 {
  margin-top: 20px;
  width: 20%;
  /* display: inline-block; */
  float: left;
}
.listBox .table .left .top .tableBox .per1 .TEXT {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.listBox .table .left .top .tableBox .per .TEXT {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.listBox .table .left .top .tableBox .per .pro1 {
  width: 100%;
  height: 14px;
  background: rgba(5, 205, 0, 1);
  border-radius: 3px;
}
.listBox .table .left .top .tableBox .per .pro2 {
  width: 100%;
  height: 14px;
  background: rgba(0, 124, 255, 1);
  border-radius: 3px;
}
.listBox .table .left .top .tableBox .per1 .pro3 {
  width: 100%;
  height: 14px;
  background: rgba(255, 158, 0, 1);
  border-radius: 3px;
}

.listBox .table .right {
  float: left;
  padding-left: 20px;
  width: 50%;
}
.listBox .table .right .top,
.text {
  width: 100%;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  line-height: 28px;
}
.listBox .table .right .text {
  padding-left: 10px;
}
.listBox .table .right .top p {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
  line-height: 19px;
  float: right;
}
.listBox .table .right .top .Box {
  text-align: center;
  overflow: hidden;
}
.listBox .table .right .top .tableBox .per {
  margin-top: 20px;
  min-width: 15%;
  /* display: inline-block; */
  float: left;
}
.listBox .table .right .top .tableBox .per1 {
  margin-top: 20px;
  min-width: 15%;
  /* display: inline-block; */
  float: left;
}
.listBox .table .right .top .tableBox .per1 .TEXT {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.listBox .table .right .top .tableBox .per .TEXT {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.listBox .table .right .top .tableBox .per .pro1 {
  min-width: 20%;
  height: 14px;
  background: rgba(5, 205, 0, 1);
  border-radius: 3px;
}
.listBox .table .right .top .tableBox .per .pro2 {
  min-width: 20%;
  height: 14px;
  background: rgba(0, 124, 255, 1);
  border-radius: 3px;
}
.listBox .table .right .top .tableBox .per1 .pro3 {
  min-width: 20%;
  height: 14px;
  background: rgba(255, 158, 0, 1);
  border-radius: 3px;
}
/* 滑块 */
.Box .listBox .Btn {
  /* overflow: hidden; */
  color: #4a90e2;
  margin-bottom: 10px;
  position: relative;
  padding: 1% 15px;
  padding-bottom: 0;
  height: 56px;
}
.Box .listBox .Btn .total {
  display: inline-block;
  position: absolute;
  right: 50px;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  color: #4a4a4a;
  font-size: 14px;
}
.Box .listBox .Btn .total span {
  color: #4a90e2;
  padding: 0 4px;
}
.Box .listBox .Btn .Curr {
  display: inline-block;
  position: absolute;
  right: 0;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  color: #4a4a4a;
  font-size: 14px;
}
.Box .listBox .Btn .Curr span {
  color: #4a90e2;
  padding: 0 2px;
}
.Box .listBox .block {
  padding: 0 15px;
}
/* 列表 */
.Box .listBox .Table {
  padding: 0 15px;
}
/* 分页 */
.Box .listBox .paging {
  padding: 0 34px 34px 34px;
}
.needCODE:hover {
  cursor: pointer;
}

/* 冻结按钮 */
.el-button--default {
  border: 1px solid #4a90e2;
}
.Box .el-button--default span {
  color: #4a90e2;
}
/* 滑块 */
.el-slider__runway {
  width: 86%;
  background: #ffffff;
}
.el-slider__button {
  width: 14px;
  height: 24px;
  background-color: #409eff;
  border-radius: 0;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}
.el-slider__button-wrapper {
  top: -12px;
}
.el-slider__bar {
  height: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 2px dashed #409eff;
  background-color: #ffffff;
  position: absolute;
}
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
.el-pagination .btn-next span {
  display: inline-block;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #c5c5c5;
}
.el-pagination .btn-prev span {
  display: inline-block;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #c5c5c5;
}
.el-pagination__jump {
  position: relative;
  display: inline-block;
  padding-left: 20px;
}
</style>
<style>
.Box .searchBar label {
  font-weight: normal;
}
.Box .searchBar .el-form--inline .el-form-item {
  width: 18.68%;
  margin-right: 10px;
}
.Box .searchBar .el-form--inline .el-form-item label {
  width: 29.68%;
  line-height: middle;
}
.Box .searchBar .el-form-item__label {
  /* padding-right: 9px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden; */
  margin-top: 8px;
  width: 30%;
    line-height: 20px;
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    /* line-height: 40px; */
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.Box .searchBar .el-form-item.offerMan label {
  position: relative;
  top: 50%;
  /* margin-top: 8px; */
  text-align: center;
}
.Box .searchBar .el-form-item.offerMan:nth-child(8) label {
  text-align: center;
}
.Box .searchBar .el-form-item.offerItem2{
  margin-bottom:0
}

/* 日期控件样式 */
.Box .searchBar .el-form--inline .el-form-item:nth-child(7) {
  width: 28%;
}
.Box .searchBar .el-form--inline .el-form-item:nth-child(8) {
  width: 28%;
  /* margin-right: 85px; */
}
/* 完成率控件样式 */
.Box .searchBar .el-form--inline .el-form-item:nth-child(9) {
  width: 23%;
  margin-right: 0;
  /* margin-top: 22px; */
}
.Box
  .searchBar
  .el-form--inline
  .el-form-item:nth-child(9)
  .el-form-item__label {
  width: 24%;
}
.Box .searchBar .el-form--inline .el-form-item:nth-child(10) {
  width: 23%;
  /* margin-top: 22px; */
}
.Box
  .searchBar
  .el-form--inline
  .el-form-item:nth-child(10)
  .el-form-item__label {
  padding-right: 0;
}
.Box .searchBar .el-range-editor .el-range-input {
  background: #f9f9f9;
}
.Box .searchBar .el-input__inner {
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #cecece;
  height: 42px;
}
.Box .searchBar .el-form--inline .el-form-item__content {
  width: 68.87%;
  height: 42px;
}
.Box .searchBar .el-row .el-col.el-col-22 {
  border-right: 1px solid #cecece;
}
/* .Box .searchBar .el-form-item:nth-child(6),
.el-form-item:nth-child(7), .el-form-item:nth-child(8),
.el-form-item:nth-child(9), .el-form-item:nth-child(10) {
  margin-bottom: 0;
} */
/* 查询 */
@media screen and (min-width:1680px){
  .Box .searchBar .el-button {
    position: relative;
    left: 30%;
    margin-top: 28%;
  }
}
@media screen and (max-width:1680px){
  .Box .searchBar .el-button {
    position: relative;
    left: 30%;
    margin-top: 40%;
  }
}
.Box .searchBar .shrinkTop .el-button {
  margin-top: 0%;
}
.Box .searchBar .el-input .picture {
  border-left: 1px solid #cecece;
  display: inline-block;
  height: 24px;
  width: 32px;
  margin-top: 24%;
  padding-left: 0 20%;
}
.Box .searchBar .el-input .picture img {
  display: inline-block;
  padding: 0;
  margin-bottom: 15%;
}
.Box .searchBar .el-input span img:hover {
  cursor: pointer;
}
/* 冻结按钮 */
.Box .el-button--default {
  border: 1px solid #4a90e2;
}
.Box .el-button--default span {
  color: #4a90e2;
}
/* 滑块 */
.Box .el-slider__runway {
  width: 1060px;
  background: #ffffff;
}
.Box .el-slider__button {
  width: 14px;
  height: 24px;
  /* border: 2px solid #409eff; */
  background-color: #409eff;
  border-radius: 0;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}
.Box .el-slider__button-wrapper {
  top: -12px;
}
.Box .el-slider__bar {
  height: 0;
  /* background-color: #409EFF; */
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 2px dashed #409eff;
  background-color: #ffffff;
  position: absolute;
}
.Box .el-pagination {
  margin-top: 30px;
  text-align: center;
}
.Box .el-pagination .btn-next span {
  display: inline-block;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #c5c5c5;
}
.Box .el-pagination .btn-prev span {
  display: inline-block;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #c5c5c5;
}
.Box .el-pagination__jump {
  position: relative;
  display: inline-block;
  padding-left: 20px;
}
/* 需求编码跳转样式 */
.demandCODE {
  color: #409eff;
}
.demandCODE:hover {
  cursor: pointer;
}
/* 展示列表表格高度 */
.Box .el-table__row {
  height: 70px;
}
/* 下拉多选不换行 */
.Box .el-select__tags {
  white-space: nowrap;
}
/* span Bug */
.top .text {
  display: inline;
}
.showGreen {
  background-color: #05cd00;
}
.showBlue {
  background-color: #007cff;
}
.showYellow {
  background-color: #ff9e00;
}
/* 批量下载按钮样式 */
.Box .download-btn-group{
  margin-left: 30px;
  height: 40px;
  float: left;
}
.Box .download-btn-group .i-center{
  display: inline-block;
  width: 1px;
  height: 27px;
  vertical-align: middle;
  margin-right: 25px;
  background: #979797;
}
.Box .download-btn-group .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
@media screen and (max-width:1650px){
  .Box .searchBar .el-form--inline .el-form-item {
    width: 18.2%;
  }
}
</style>
