/*
 * @Page: 任务运行管理-> 物料号维度(页面接口/弹框调试)
 * @Author: wangyadi
 * @Date: 2018-12-18 09:46:56
 * @Last Modified by: wangyadi
 */
/*
 * @Page: 任务运行管理-> 物料号维度
 * @Author: chenlisha
 * @Date: 2018-11-30 16:15:57
 * @Last Modified by: chenlisha
 */
<template>
  <div v-loading="loading" ref="BOX" class="material">
    <div class="reqdowns">
      <!-- 弹窗 -->
      <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
      <!-- 供应商弹窗 -->
      <SupplierDialog :supplier-dialog-data="supplierDialogData" @listenSupplier="getSupplier"/>
      <!-- 顶部查询栏 -->
      <transition name="slide-fade">
        <div v-if="controlBtn" class="reqSearch">
          <el-form ref="formInline" :inline="true" :model="formInline" class="searchCondition">
            <!-- 第一行 -->
            <!-- 区域 -->
            <el-form-item :label="$t('breakDown.area')" class="first">
              <el-select
                v-model="formInline.region"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in areas"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求来源 -->
            <el-form-item :label="$t('demandNoResolve.reqSource')" class="common">
              <el-select
                v-model="formInline.demandSource"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in Sources"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求类型 -->
            <el-form-item :label="$t('breakDown.requirementType')" class="common">
              <el-select
                v-model="formInline.demandType"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in requirementTypes"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 产业线 -->
            <el-form-item :label="$t('demandNoResolve.reqLine')" class="last">
              <el-select
                v-model="formInline.industryName"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in productionLines"
                  :key="item.industry_id"
                  :label="item.industry_name"
                  :value="item.industry_name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求编码 -->
            <el-form-item :label="$t('demandNoResolve.reqCode')" class="last">
              <el-input
                v-model="formInline.demandCode"
                :placeholder="$t('demandNoResolve.all')"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="requirementCoding('', $t('demandNoResolve.reqCode'), 'requirementCoding',formInline.demandCode)"
                >
                <!-- <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="findBaseList('2', $t('demandNoResolve.reqCode'), 'DemandCoding')"> -->
              </el-input>
            </el-form-item>
            <!-- 第二行 -->
            <!-- 任务人 -->
            <el-form-item :label="$t('breakDown.TaskOne')" class="first">
              <el-input
                v-model="manager"
                :placeholder="$t('demandNoResolve.all')"
                :disabled="true"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="taskMan('', $t('breakDown.TaskOne'), 'taskMan',manager)"
                >
                <!-- <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="findBaseList('3', $t('breakDown.TaskOne'), 'taskone')"> -->
              </el-input>
            </el-form-item>
            <!-- 物料号 -->
            <el-form-item :label="$t('breakDown.MATNR')" class="common">
              <el-input
                v-model="formInline.moduleCode"
                :placeholder="$t('demandNoResolve.all')"
                :disabled="true"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findBaseList('4', $t('breakDown.MATNR'), 'moduleCode', formInline.moduleCode)"
                >
                <!-- <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="findBaseList('4', $t('breakDown.MATNR'), 'moduleCode')"> -->
              </el-input>
            </el-form-item>
            <!-- 物料类别 -->
            <el-form-item :label="$t('breakDown.MaterialType')" class="common">
              <el-input
                v-model="formInline.category"
                :placeholder="$t('demandNoResolve.all')"
                :disabled="true"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findBaseList('5', $t('breakDown.MaterialType'), 'category',formInline.category)"
                >
              </el-input>
            </el-form-item>
            <!-- 供应商编码 -->
            <el-form-item :label="$t('breakDown.SupplierCode')" class="last">
              <el-input
                v-model="formInline.supplierCode"
                :placeholder="$t('demandNoResolve.all')"
                :disabled="true"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findBaseList('6', $t('breakDown.SupplierCode'), 'supplierCode',formInline.supplierCode)"
                >
              </el-input>
            </el-form-item>
            <!-- 供应商名称 -->
            <el-form-item :label="$t('breakDown.SupplierName')" class="last">
              <el-input
                v-model="formInline.supplierName"
                :placeholder="$t('demandNoResolve.all')"
                :disabled="true"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findBaseList('7', $t('breakDown.SupplierName'), 'supplierName',formInline.supplierName)"
                >
              </el-input>
            </el-form-item>
            <!-- 第三行 -->
            <!-- 任务开始日期 -->
            <el-form-item :label="$t('materielNumForTask.taskStartDate')" class="dateK">
              <el-date-picker
                :start-placeholder="$t('reqcustomization.startDate')"
                :end-placeholder="$t('reqcustomization.endDate')"
                v-model="startDate"
                type="daterange"
                range-separator="—"
                class="input date"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <!-- 任务截止日期 -->
            <el-form-item :label="$t('materielNumForTask.taskDeadline')" class="dateK">
              <el-date-picker
                :start-placeholder="$t('reqcustomization.startDate')"
                :end-placeholder="$t('reqcustomization.endDate')"
                v-model="endDate"
                type="daterange"
                range-separator="—"
                class="input date"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <!-- 状态 -->
            <el-form-item :label="$t('specialNumberDimension.taskStatus')" class="last">
              <el-select
                v-model="formInline.state"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in taskStatus"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <!-- 查询 -->
            <el-form-item class="searchBtn">
              <el-button type="primary" @click="searchListNew">{{ $t('buttonGroup.search') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="!controlBtn" class="reqSearch">
          <el-form ref="formInline" :inline="true" :model="formInline" class="searchCondition">
            <!-- 第一行 -->
            <!-- 区域 -->
            <el-form-item :label="$t('breakDown.area')" class="first">
              <el-select
                v-model="formInline.region"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in areas"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求来源 -->
            <el-form-item :label="$t('demandNoResolve.reqSource')" class="common">
              <el-select
                v-model="formInline.demandSource"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in Sources"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求类型 -->
            <el-form-item :label="$t('breakDown.requirementType')" class="common">
              <el-select
                v-model="formInline.demandType"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in requirementTypes"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 产业线 -->
            <el-form-item :label="$t('demandNoResolve.reqLine')" class="last">
              <el-select
                v-model="formInline.industryName"
                :placeholder="$t('demandNoResolve.all')"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in productionLines"
                  :key="item.industry_id"
                  :label="item.industry_name"
                  :value="item.industry_name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求编码 -->
            <el-form-item :label="$t('demandNoResolve.reqCode')" class="last">
              <el-input
                v-model="formInline.demandCode"
                :placeholder="$t('demandNoResolve.all')"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="requirementCoding('', $t('demandNoResolve.reqCode'), 'requirementCoding',formInline.demandCode)"
                >
                <!-- <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="findBaseList('2', $t('demandNoResolve.reqCode'), 'DemandCoding')"> -->
              </el-input>
            </el-form-item>
            <el-form-item class="searchBtn1">
              <el-button type="primary" @click="searchListNew">{{ $t('buttonGroup.search') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <!-- 收缩按钮 -->
      <span :class="['controlBtn', controlBtn ? 'lala' : 'lili']" @click="controlBtn = !controlBtn">
        <i :class="['el-icon-arrow-up', controlBtn ? 'downer' : 'upper']"/>
      </span>
      <!-- 列表部分 -->
      <div class="materialList">
        <div class="Btn">
          <!-- <div v-if="isShow" style="overflow: hidden; display: inline-block;" @click="Bool = !Bool"> -->
          <div v-if="isShow" style="display: inline-block;" @click="Bool = !Bool">
            <el-button v-if="Bool">
              <i class="fa fa-lock"/>
              {{ $t('buttonGroup.frozen') }}
            </el-button>
            <el-button v-else>
              <i class="fa fa-unlock-alt"/>
              {{ $t('buttonGroup.unfreeze') }}
            </el-button>
          </div>
          <!-- excel下载  style="float: left; display: inline-block"-->
          <div v-if="isShow" class="downloadExl" style="display: inline-block">
            <i class="borderLine"/>
            <el-button @click="downloadExcel">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              {{ $t('buttonGroup.exlUpload') }}
            </el-button>
          </div>
          <!-- 总记录条数 -->
          <div class="total">
            {{ $t('breakDown.total') }}
            <span>{{ total }}</span>
            {{ $t('breakDown.record') }}
          </div>
        </div>
        <!-- 滑块 -->
        <!-- :format-tooltip="formatTooltip" -->
        <el-slider v-if="!Bool" v-model="slidingBlock" :show-tooltip="false" :disabled="isProhibit"/>
        <el-table
          ref="table"
          :data="demandList"
          :row-class-name="tableRowClassName"
          class="table-style1"
          stripe
          style="width: 100%;margin:0 0 32px"
        >
          <el-table-column
            :label="$t('breakDown.listClient')"
            :fixed="silder1"
            prop="customer"
            min-width="66"
          />
          <el-table-column
            :label="$t('breakDown.area')"
            :fixed="silder2"
            prop="region"
            min-width="86"
          />
          <el-table-column
            :label="$t('breakDown.Source')"
            :fixed="silder3"
            prop="demandSource"
            min-width="144"
          />
          <el-table-column
            :label="$t('breakDown.requirementType')"
            :fixed="silder4"
            prop="demandType"
            min-width="116"
          />
          <el-table-column
            :label="$t('demandNoResolve.reqLine')"
            :fixed="silder5"
            prop="industryName"
            min-width="90"
          />
          <el-table-column
            :label="$t('demandNoResolve.reqCode')"
            :fixed="silder6"
            prop="demandCode"
            min-width="100"
          />
          <el-table-column
            :label="$t('breakDown.listRequirementDescription')"
            :fixed="silder7"
            prop="remarks"
            min-width="174"
          />
          <el-table-column
            :label="$t('breakDown.TaskOne')"
            :fixed="silder8"
            prop="manager"
            min-width="88"
          />
          <el-table-column
            :label="$t('breakDown.MATNR')"
            :fixed="silder9"
            prop="moduleCode"
            min-width="108"
          />
          <!-- 物料描述 -->
          <el-table-column
            :label="$t('breakDown.listMaterialDescription')"
            :fixed="silder10"
            prop="moduleDescribe"
            min-width="144"
          />
          <!-- 物料类别 -->
          <el-table-column
            :label="$t('breakDown.MaterialType')"
            :fixed="silder11"
            prop="categoryCn"
            min-width="137"
          />
          <el-table-column
            :label="$t('breakDown.SupplierCode')"
            :fixed="silder12"
            prop="supplierCode"
            min-width="100"
          />
          <el-table-column
            :label="$t('breakDown.SupplierName')"
            :fixed="silder13"
            prop="supplierName"
            min-width="126"
          />
          <el-table-column :label="$t('breakDown.listPrice')" prop="price" min-width="55"/>
          <!-- 价格单位 -->
          <el-table-column :label="$t('breakDown.listPriceUnit')" prop="priceUnit" min-width="74"/>
          <el-table-column
            :label="$t('breakDown.listProcurementUnit')"
            prop="purchasingUnit"
            min-width="124"
          />
          <el-table-column :label="$t('breakDown.listCurrency')" prop="currency" min-width="85"/>
          <el-table-column
            :label="$t('breakDown.listResource')"
            prop="resourceQuantity"
            min-width="85"
          />
          <el-table-column
            :label="$t('breakDown.listResultTime')"
            prop="resultDate"
            min-width="162"
          />
          <el-table-column
            :label="$t('materielNumForTask.taskStartDate')"
            prop="startReportDate"
            min-width="154"
          />
          <!-- 任务截止日期 -->
          <el-table-column
            :label="$t('materielNumForTask.taskDeadline')"
            prop="endReportDate"
            min-width="154"
          >
            <template slot-scope="scope">
              <router-link
                v-if="scope.row.taskState !== '2'"
                :to="{path:'/quoteoperational/editingtask',query:{taskId:scope.row.taskId, state:scope.row.state}}"
                class="blue"
              >{{ scope.row.endReportDate }}</router-link>
              <p v-else>{{ scope.row.endReportDate }}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('materielNumForTask.taskCompleteDate')"
            prop="reportDate"
            min-width="154"
          />
          <!-- 模板匹配，此处显示模板名称 -->
          <el-table-column
            :label="$t('breakDown.MatchTemplate')"
            prop="templateName"
            min-width="122"
          >
            <template slot-scope="scope">
              <router-link
                v-if="scope.row.taskState !== '2'"
                :to="{path:'/quoteoperational/editingtask',query:{taskId:scope.row.taskId, state:scope.row.state}}"
                class="blue"
              >{{ scope.row.templateName }}</router-link>
              <p v-else>{{ scope.row.templateName }}</p>
            </template>
          </el-table-column>
          <!-- 任务状态 -->
          <el-table-column
            :label="$t('specialNumberDimension.taskStatus')"
            prop="state"
            min-width="85"
          />
          <!-- 任务启停状态 -->
          <el-table-column
            :label="$t('materielNumForTask.taskStartStopStatus')"
            prop="taskState"
            min-width="138"
          >
            <template slot-scope="scope">
              <el-switch
                v-if="scope.row.taskState !== '2'"
                v-model="scope.row.taskState"
                @change="modifyState(scope.row.taskId, scope.row.state)"
              />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="text-align: center;">
          <el-pagination
            ref="PAGE"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            :pager-count="5"
            :prev-text="$t('demandForFiltering.previousPage')"
            :next-text="$t('demandForFiltering.nextPage')"
            layout="prev, pager, next, jumper"
            class="paging"
            background
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <iframe name="tempiframe" style="display:none"/>
  </div>
</template>

<script>
import Language from '@/utils/language'
import { selects, modules, selectName, taskMan, materialNumber, requirementCoding, modifyState } from '@/api/quoteoperational'
import { flagFindData } from '@/api/requirements'
import Dialog from '@/components/Dialog/searchBox'
// 供应商弹窗
import SupplierDialog from '@/components/supplier/supplierDialog'
// 日期格式化
import { timeHandling } from '@/utils/timeHandling'
import { listToExcel } from '@/api/downloadurl'
export default {
  name: 'Materieldimension',
  components: {
    Dialog,
    SupplierDialog
  },
  mixins: [Language],
  data() {
    return {
      uploadData: {}, // excel下载参数
      isShow: true, // 是否显示冻结按钮
      isProhibit: false, // 列表无数据时禁止冻结表头
      value1: true, // 控制启停按钮的开关
      currentManagerCode: [], // 子组件传过来的任务人编号
      // 弹窗中搜索框的值
      searchBox: '',
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框中表格数据总数
        searchTotal: 1,
        // 循环的内容
        gridData: [],
        // TableName
        tableName: '',
        // 承接的数组
        Arr: [],
        // 每页显示的条数
        pageSize: 9,
        // 总页数
        searchTotalPage: 0
      },
      supplierDialogData: {
        dialogVisible: false,
        // 标识
        identification: '',
        // 承接选中的内容数组
        arrCheck: []
      },
      manager: '', // 任务人
      demandCodes: [], // 需求编码（选中的数据）
      managerCodes: [], // 任务人（选中的数据）
      materialNumbers: [], // 物料号（选中的数据）
      categoryCnCode: [], // 物料类别 categoryCode（选中的数据）
      // 表单验证
      formInline: {
        requestType: '1', // 请求类型
        region: [], // 区域
        demandSource: '', // 需求来源
        demandType: '', // 需求类型
        demandCode: '', // 需求编码
        industryName: '', // 产品线
        managerCode: [], // 任务人(传入任务人编号)
        moduleCode: '', // 物料号
        category: '', // 物料类别
        supplierCode: '', // 供应商编码
        supplierName: '', // 供应商名称
        state: '', // 任务状态
        taskBeginTimeFrom: '', // 开始日期起
        taskBeginTimeEnd: '', // 开始日期止
        taskEndTimeFrom: '', // 结束日期起
        taskEndTimeEnd: '', // 结束日期至
        pageSize: 10, // 列表页数
        pageNo: 1 // 页码
      },
      modifyStateData: {}, // 修改任务启停状态参数
      // region: [], // 查询区域
      startDate: '', // 查询开始日期
      endDate: '', // 查询截止日期
      areas: [], // select 区域
      Sources: [], // select 需求来源
      requirementTypes: [], // select 需求类型
      productionLines: [], // select 产品线
      materialNums: [], // select 物料号
      templateMatchings: [], // select 模板匹配
      taskStatus: [], // select 任务启停状态
      controlBtn: true, // 控制收缩
      demandList: [], // 表格列表
      currentPage: 1, // 当前页
      total: 0, // 总条目数
      pageSize: 10, // 一页显示多少条
      count: null, // 显示的浮点数
      Bool: true, // 冻结功能控制
      // areaBool: false, // 地区fixed控制
      slidingBlock: 0, // 滑块
      silder1: false, // 滑块滑动部分
      silder2: false,
      silder3: false,
      silder4: false,
      silder5: false,
      silder6: false,
      silder7: false,
      silder8: false,
      silder9: false,
      silder10: false,
      silder11: false,
      silder12: false,
      silder13: false,
      loading: true // loading加载
    }
  },
  watch: {
    slidingBlock(val) {
      // console.log(this.$refs.BOX.clientWidth)
      // console.log(val)
      if (val < 5) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 0
      } else if (val < 11.2) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 5
      } else if (val < 22) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 11.2
      } else if (val < 30.5) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 22
      } else if (val < 37) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 30.5
      } else if (val < 44.5) { // 6
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 37
      } else if (val < 57.3) { // 7
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 44.5
      } else if (val < 63.8) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 57.3
      } else if (val < 71.8) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 63.8
      } else if (val < 82.3) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 71.8
      } else if (val < 92.5) {
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 82.3
      } else if (val < 100) {
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
        this.silder11 = true
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 92.5
      } else {
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
        this.silder11 = true
        this.silder12 = true
        this.silder13 = false
        this.slidingBlock = 100
      }
    },
    Bool(val) { // 取消冻结
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
        this.silder11 = false
        this.silder12 = false
        this.silder13 = false
        this.slidingBlock = 0
      }
    }
  },
  created() { // 产业线选项渲染
    const params = {}
    modules(params)
      .then(res => {
        this.productionLines = res.resultData
        // console.log(this.productionLines, '产业线')
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted() {
    this.selects()
    this.searchList()
  },
  methods: {
    // 多选下拉框
    stateb(val) { },
    // 任务起停控制
    tableRowClassName(val) {
      if (val.taskState === '1') {
        return 'gray'
      } else {
        return 'com'
      }
    },
    handleCurrentChange(val) { // 分页
      this.formInline.pageNo = val
      this.searchList()
    },
    // 格式化日期
    getDate() {
      // console.log(this.startDate, '日期')
      if (this.startDate !== '' && this.startDate !== null) {
        this.formInline.taskBeginTimeFrom = this.startDate[0]
        this.formInline.taskBeginTimeEnd = this.startDate[1]
      } else {
        this.formInline.taskBeginTimeFrom = ''
        this.formInline.taskBeginTimeEnd = ''
      }
      if (this.endDate !== '' && this.endDate !== null) {
        // this.formInline.taskEndTimeFrom = this.dateChange(this.endDate[0])
        // this.formInline.taskEndTimeEnd = this.dateChange(this.endDate[1])
        this.formInline.taskEndTimeFrom = this.endDate[0]
        this.formInline.taskEndTimeEnd = this.endDate[1]
      } else {
        this.formInline.taskEndTimeFrom = ''
        this.formInline.taskEndTimeEnd = ''
      }
    },
    // 查询按钮
    searchListNew() {
      this.formInline.pageNo = 1
      this.searchList()
    },
    // 物料号维度数据
    searchList() {
      // 获取日期
      this.getDate()
      if (this.$route.query.id) {
        this.formInline.demandCode = this.$route.query.id
      }
      const params = JSON.parse(JSON.stringify(this.formInline))
      // 任务人
      const tmp = this.managerCodes.map(function(value, index, array) {
        return value.manager_code
      })
      // 物料类别
      const category_cn_code = this.categoryCnCode.map(function(value, index, array) {
        return value.categoryCode
      })
      // this.formInline.managerCode = tmp.join(',')
      params.category = category_cn_code.join(',')
      params.managerCode = tmp.join(',')
      params.region = params.region.toString()
      params.demandSource = params.demandSource.toString()
      params.demandType = params.demandType.toString()
      params.industryName = params.industryName.toString()
      params.state = params.state.toString()
      this.uploadData = params
      this.loading = true
      selectName(params)
        .then(res => {
          this.loading = false
          if (res.resultData.taskCount) {
            this.total = parseInt(res.resultData.taskCount)
          } else {
            this.total = 0
          }
          // console.log(res)
          if (res.resultData.taskList) {
            this.demandList = res.resultData.taskList.map((value, index, arr) => {
              if (value.resultDate) {
                value.resultDate = timeHandling(value.resultDate)
              }
              if (value.startReportDate) {
                value.startReportDate = timeHandling(value.startReportDate)
              }
              if (value.endReportDate) {
                value.endReportDate = timeHandling(value.endReportDate)
              }
              if (value.reportDate) {
                value.reportDate = timeHandling(value.reportDate)
              }
              return value
            })
          }
          for (let i = 0, length = this.demandList.length; i < length; i++) {
            if (this.demandList[i].taskState === '0') {
              this.demandList[i].taskState = Boolean(1)
            } else if (this.demandList[i].taskState === '1') {
              this.demandList[i].taskState = Boolean(0)
              // console.log(this.demandList[i].taskState, '停止状态对应布尔值')
            } else if (this.demandList[i].taskState === '2') {
              this.value1 = false
            }
          }
          if (this.demandList.length === 0) {
            this.isProhibit = true
            this.isShow = false
          } else {
            this.isProhibit = false
            this.isShow = true
          }
        })
        .catch(err => {
          this.loading = false
          if (this.demandList.length === 0) {
            this.isProhibit = true
            this.isShow = false
          } else {
            this.isProhibit = false
            this.isShow = true
          }
          console.log(err)
        })
    },
    // 模糊查询输入框/input上的搜索按钮
    findBaseList(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = checkValue.split(',')
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
    taskMan(nameVal, searchTitle, name, checkValue) {
      const params = { manager: nameVal }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = this.managerCodes.map(function(value, index, array) {
          return value.manager
        })
        // this.searchData.checkList = checkValue.split(',')
      }
      taskMan(params).then(res => {
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
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 物料号模糊搜索弹框
    materialNumber(nameVal, searchTitle, name, checkValue) {
      const params = { module_code: nameVal }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = this.materialNumbers.map(function(value, index, array) {
          return value.module_code
        })
        // this.searchData.checkList = checkValue.split(',')
      }
      materialNumber(params).then(res => {
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
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 需求编码模糊搜索弹框
    requirementCoding(nameVal, searchTitle, name, checkValue) {
      const params = { demand_code: nameVal }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = checkValue.split(',')
      }
      requirementCoding(params).then(res => {
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
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 子元素传来的data
    getChildData(val, managerCode) {
      if (val.inputValue === 'category') {
        this.formInline.category = val.checkedCities.join(',')
        this.categoryCnCode = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.categoryCn) {
              return value
            }
          }
        })
      } else if (val.inputValue === 'supplierCode') {
        this.formInline.supplierCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.formInline.supplierName = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskMan') {
        this.manager = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
      } else if (val.inputValue === 'moduleCode') {
        this.formInline.moduleCode = val.checkedCities.join(',')
        // this.materialNumbers = this.searchData.gridData.filter(function(value, index, array) {
        //   for (var i = 0, len = val.checkedCities.length; i < len; i++) {
        //     if (val.checkedCities[i] === value.module_code) {
        //       return value
        //     }
        //   }
        // })
      } else if (val.inputValue === 'requirementCoding') {
        this.formInline.demandCode = val.checkedCities.join(',')
      }
    },
    // 供应商弹窗
    // handleSupplierDialog(searchTitle, identification, modelValue) {
    //   // 传过去回显check数据
    //   this.supplierDialogData.arrCheck = []
    //   // 回显问题
    //   if (modelValue !== '') {
    //     this.supplierDialogData.arrCheck = modelValue.split(',')
    //   }
    //   // 标识
    //   this.supplierDialogData.identification = identification
    //   // 中英文
    //   this.$store.dispatch('Dialog', searchTitle)
    //   // 供应商弹窗出现
    //   this.supplierDialogData.dialogVisible = true
    // },
    // 供应商数据
    getSupplier(res) {
      if (this.supplierDialogData.identification === 'supplierCode') {
        this.formInline.supplierCode = res.checkList.join(',')
      } else if (this.supplierDialogData.identification === 'supplierName') {
        this.formInline.supplierName = res.checkList.join(',')
      }
    },
    // 查询条件中的下拉列表
    selects() {
      const params = {
        typeCodes: '002,003,004,016'
      }
      selects(params)
        .then(res => {
          this.areas = res.resultData['002'] // 区域
          this.Sources = res.resultData['003'] // 需求来源
          this.requirementTypes = res.resultData['004'] // 需求类型
          this.taskStatus = res.resultData['016'] // 任务状态
          // console.log(this.areas, '区域')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 滑块
    formatTooltip(val) { // [3, 8, 16, 22, 27, 33, 43, 48, 54, 62]
      const arr = [5, 12, 23, 32, 39, 47, 60, 67, 75, 86]
      if (val < 5) {
        this.silders.forEach((item, index) => {
          index < 0 ? (item.silder = true) : (item.silder = false)
        })
        this.slidingBlock = 0
      } else {
        arr.forEach((a, b) => {
          if (val >= a) {
            this.silders.forEach((item, index) => {
              index < (b + 1) ? (item.silder = true) : (item.silder = false)
            })
            this.slidingBlock = a
          }
        })
      }
    },
    // 日期格式
    dateChange(val) {
      var newDate = new Date()
      newDate.setTime(val.getTime())
      return newDate.toLocaleString().replace(/\//g, '-').replace('上午', '')
    },
    // 修改任务启停状态
    modifyState(taskIds, state) {
      if (state === '停止') { // 当前状态为停止时修改为启动
        state = '0002' // 状态码为将要修改成的
      } else if (state === '启动') { // 当前状态为启动才能修改为停止
        state = '0003'
      }
      this.modifyStateData = { 'task_ids': [taskIds], 'state': state }
      // this.modifyStateData = JSON.stringify(this.modifyStateData)
      modifyState(this.modifyStateData).then(res => {
        // console.log(res.resultData, '修改状态')
        if (res.success === false) {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
        if (res.resultData.updateMessage === '修改成功') {
          this.searchList()
          this.$message({
            type: 'success',
            message: res.resultData.updateMessage
          })
        } else if (res.resultData.updateMessage === '修改失败') {
          this.$message({
            type: 'error',
            message: res.resultData.updateMessage
          })
        } else {
          this.$message({
            type: 'info',
            message: res.resultData.updateMessage
          })
        }
      }).catch(err => {
        console.log('请求失败', err)
      })
    },
    // Excel下载
    downloadExcel() {
      const params = {
        // 'excelName': '任务运行管理（物料号维度）',
        // 'keyName': ['customer', 'region', 'demandSource', 'demandType', 'industryName', 'demandCode', 'remarks', 'manager', 'moduleCode', 'moduleDescribe', 'categoryCn', 'supplierCode', 'supplierName', 'price', 'priceUnit', 'purchasingUnit', 'currency', 'resourceQuantity', 'resultDate', 'startReportDate', 'endReportDate', 'reportDate', 'templateName', 'state'],
        'searchTaskVo': {
          // 'requestType': '1', // 请求类型
          // 'region': [], // 区域
          // 'demandSource': [], // 需求来源
          // 'demandType': [], // 需求类型
          // 'demandCode': '', // 需求编码
          // 'industryName': [], // 产品线
          // 'managerCode': '', // 任务人(传入任务人编号)
          // 'moduleCode': '', // 物料号
          // 'category': '', // 物料类别
          // 'supplierCode': '', // 供应商编码
          // 'supplierName': '', // 供应商名称
          // 'state': '', // 任务启停状态
          // 'taskBeginTimeFrom': '', // 开始日期起
          // 'taskBeginTimeEnd': '', // 开始日期止
          // 'taskEndTimeFrom': '', // 结束日期起
          // 'taskEndTimeEnd': '', // 结束日期至
          // 'pageSize': 10000, // 每页条数
          // 'pageNo': 1 // 页码
        }
        // 'headers': [
        //   {
        //     'headerOne': '客户',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '区域',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求来源',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求类型',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '产业线',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求编码',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求描述',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务人',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '物料号',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '物料描述',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '物料类别',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '供应商编码',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '供应商名称',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '价格',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '价格单位',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '采购单位',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '币种',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '资源量',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '结果公示时间',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务开始日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务截止日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务填写日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '模板匹配',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务状态',
        //     'headerLast': []
        //   }
        // ]
      }
      params.searchTaskVo = JSON.parse(JSON.stringify(this.uploadData))
      params.searchTaskVo.pageNo = 1
      params.searchTaskVo.pageSize = 10000
      // console.log(JSON.stringify(params), '导出参数')
      // window.open(listToExcel(params))
      const a = document.createElement('a')
      const url = listToExcel(params)
      document.body.appendChild(a)
      a.target = 'tempiframe'
      a.href = url
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  }
}
</script>

<style lang="scss">
span {
  display: inline-block;
}
/* 动画效果 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-103px);
  opacity: 0;
}
.reqdowns {
  // padding: 30px 1.85% 28px;
  padding: 18px;
  background-color: #f4f4f4;
}
/* 查询部分 */
.search .el-button--primary {
  margin-right: 25px;
}
.reqSearch {
  border: 1px solid #cecece;
  font-size: 0;
  background-color: #fff;
  padding: 30px 0 0 1.7%;
  position: relative;
}
.searchCondition {
  width: 85.4%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.input {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.input img {
  vertical-align: top;
  margin: 10px 8px 0 5px;
  cursor: pointer;
}
.dateK {
  width: 38.6%;
}
.searchBtn {
  width: 11.7%;
  height: 192px;
  border-left: 1px solid #cecece;
  display: flex;
  position: absolute;
  right: 0;
  top: 24px;
  margin-bottom: 0 !important;
}
.searchBtn1 {
  width: 11.7%;
  // height: 192px;
  border-left: 1px solid #cecece;
  display: flex;
  position: absolute;
  right: 0;
  top: 24px;
  margin-bottom: 0 !important;
  .el-form-item__content{
    .el-button--primary{
      margin:0 50px 0 0;
    }
  }
}

/* 收缩按钮 */
.controlBtn {
  width: 3.14%;
  height: 16px;
  display: block;
  margin: 0 auto 4px;
  background-color: #fff;
  border: 1px solid #cecece;
  text-align: center;
  cursor: pointer;
  border-radius: 0 0 4px 4px;
}
.materialList {
  border: 1px solid #d1d1d1;
  background-color: #fff;
  // padding: 28px 1.66% 31px;
  padding: 15px;
}
.total {
  float: right;
  font-size: 14px;
  margin-bottom: 18px;
}
.total span {
  color: #4a90e2;
  margin: 0 2px;
}
/* 线 */
.line {
  width: 1px;
  height: 24px;
  background-color: #cecece;
  margin-top: 8px;
}
/* 查询元素宽度 */
.first {
  width: 17.5%;
}
.common {
  width: 18.7%;
}
.last {
  width: 19.1%;
}
.lili {
  border-bottom: 0;
}
.lala {
  border-top: 0;
}
.upper {
  font-size: 15px;
  transform: rotate(180deg);
  transition: all 0.3s ease;
}
.downer {
  font-size: 15px;
  transform: rotate(360deg);
  transition: all 0.3s ease;
}
.blue {
  color: #007cff;
}
.fa {
  margin-right: 10px;
}
/* 任务起停控制行样式 */
.material .reqdowns .el-table .com .cell {
  color: #4a4a4a;
}
.material .reqdowns .el-table .gray .cell {
  color: #9b9b9b;
}
.Btn {
  margin-bottom: 15px;
}
.material .Btn .el-button {
  font-size: 14px;
  color: #1875f0;
  border-color: #4a90e2;
}
.material .el-button--primary {
  font-size: 16px;
  margin: 50px 50px 0 0;
}
/* form表单元素宽度调整 */
.reqdowns .el-date-editor .el-range-separator,
.reqdowns .el-range-editor .el-range-input {
  vertical-align: top;
}
.reqdowns .el-form--inline .el-form-item {
  margin: 0 0 30px 0;
}
.material .reqdowns .el-form--inline .el-form-item__label {
  max-height: 30px;
  line-height: 15px;
  margin-top: 10px;
  padding: 0 0;
  font-weight: inherit;
  text-align: right;
  overflow: hidden;
}
.reqdowns .el-form--inline .dateK .el-form-item__label {
  width: 24.48%;
}
.searchBtn .el-form-item__content {
  margin: auto;
}
.reqdowns .el-form--inline .el-form-item__content {
  float: right;
  line-height: 0;
}
.material .reqdowns .dateK .el-form-item__content {
  width: 73.4%;
}
.reqdowns .last .el-form-item__content {
  width: 66.5%;
}
.reqdowns .first .el-form-item__content {
  width: 72.8%;
}
.reqdowns .common .el-form-item__content {
  width: 68%;
}
.reqdowns .el-form--inline .last .el-form-item__label {
  width: 30.4%;
}
.reqdowns .el-form--inline .first .el-form-item__label {
  width: 24%;
}
.reqdowns .el-form--inline .common .el-form-item__label {
  width: 28.9%;
}
.material .el-date-editor.el-input,
.material .el-date-editor.el-input__inner {
  width: 100%;
  background: rgba(249, 249, 249, 1);
}
.material .reqdowns .el-input__inner {
  font-size: 14px;
}
/* 输入框颜色 */
.material .el-input.is-disabled .el-input__inner {
  color: #606266;
}
/* 输入框背景颜色 */
.material .reqdowns .el-input--suffix .el-input__inner,
.reqdowns .el-range-editor .el-range-input {
  background: rgba(249, 249, 249, 1);
}
/* 输入框icon位置调整 */
.material .reqdowns .el-input__suffix {
  right: 0;
}
.reqdowns .el-input__prefix {
  right: 4px;
  left: auto;
}
.reqdowns .el-icon-date:before {
  color: #000;
}
.reqdowns .el-date-editor .el-range__close-icon {
  width: 20px;
  position: absolute;
  top: 0;
  right: 0;
}
.material .el-select__tags {
  white-space: nowrap;
}
.material .el-select .el-tag__close.el-icon-close {
  right: -1px;
}
.material .el-tag--small {
  padding: 0 1px;
}
.material .el-select .el-tag {
  margin: 2px 0 2px 3px;
}
/* 滑块样式 */
.material .el-slider__runway {
  background: #ffffff;
  margin: 12px 0;
}
.material .el-slider__button {
  width: 12px;
  height: 19px;
  background: rgba(24, 117, 240, 1);
  border-color: rgba(24, 117, 240, 1);
  border-radius: 0;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}
.material .el-slider__bar {
  height: 0;
  border: 2px dashed #1875f0;
  background-color: #ffffff;
  opacity: 0.8069;
}
/* 表格样式调整 */
.material .reqdowns .el-table .cell {
  color: #4a4a4a;
  white-space: nowrap;
  text-align: center;
}
.material .reqdowns .el-table th {
  padding: 20px 0 26px;
}
.material .reqdowns .el-table .cell,
.el-table th div {
  padding-right: 0;
}
.material .el-table .cell,
.material .el-table th div,
.material .el-table--border td:first-child .cell,
.material .el-table--border th:first-child .cell {
  padding-left: 0;
}
.material .el-table .red {
  background-color: red;
}
.material .table-style1 {
  min-height: calc(100vh - 600px);
}
// excel下载
.downloadExl{
  margin-left: 25px;
  // padding-bottom: 15px;
}
.borderLine{
    display: inline-block;
    width: 1px;
    height: 27px;
    vertical-align: middle;
    margin-right: 22px;
    background: #979797;
}
</style>
<style>
.materialList .el-slider {
  width: 1356px;
}
</style>
