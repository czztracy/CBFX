/*
 * @Page: 报价管理-> 需求号维度
 * @Author: wangyadi
 * @Date: 2018-11
 * @Last Modified by: wangyadi
 */
<template>
  <div v-loading="loading" ref="box" class="box">
    <!-- 弹窗 -->
    <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
    <!-- 供应商弹窗 -->
    <SupplierDialog :supplier-dialog-data="supplierDialogData" @listenSupplier="getSupplier"/>
    <!-- 顶部查询栏 -->
    <transition name="el-zoom-in-top">
      <div>
        <div v-if="controlBtn" class="topSearch">
          <el-row>
            <el-col :span="22">
              <el-form
                ref="formInline"
                :inline="true"
                :model="formInline"
                :rules="rules"
                label-position="right"
              >
                <!-- 第一行 -->
                <!-- 区域 -->
                <el-form-item :label="$t('breakDown.area')" class="InputBox">
                  <el-select
                    v-model="formInline.region"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in regions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求来源 -->
                <el-form-item :label="$t('Neednumberdimension.Sourceofdemand')" class="InputBox">
                  <el-select
                    v-model="formInline.demand_source"
                    :placeholder="$t('demandNoResolve.select')"
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
                <el-form-item :label="$t('Neednumberdimension.Requirementtype')" class="InputBox">
                  <el-select
                    v-model="formInline.demand_type"
                    :placeholder="$t('demandNoResolve.select')"
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
                <el-form-item :label="$t('Neednumberdimension.Theindustryline')" class="InputBox">
                  <el-select
                    :placeholder="$t('demandNoResolve.select')"
                    v-model="formInline.industry_id"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in productionLines"
                      :key="item.industry_id"
                      :label="item.industry_name"
                      :value="item.industry_id"
                      :value-key="item.industry_name"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求编码 -->
                <el-form-item :label="$t('Neednumberdimension.Demandforcoding')" class="InputBox">
                  <el-input
                    v-model="formInline.demand_code"
                    :disabled="true"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="handleOpen('2', $t('Neednumberdimension.Demandforcoding'), 'DemandCoding', formInline.demand_code)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第二行 -->
                <!-- 任务人 -->
                <el-form-item :label="$t('Neednumberdimension.Taskone')" class="InputBox">
                  <el-input
                    v-model="manager"
                    :disabled="true"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="handleOpen('3', $t('Neednumberdimension.Taskone'), 'taskMan', managerCodes)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 供应商编码 -->
                <el-form-item :label="$t('Neednumberdimension.Suppliercode')" class="InputBox">
                  <el-input
                    v-model="formInline.supplier_code"
                    :disabled="true"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="handleOpen('6', $t('Neednumberdimension.Suppliercode'), 'supplierCode', formInline.supplier_code)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 供应商名称 -->
                <el-form-item :label="$t('Neednumberdimension.Suppliername')" class="InputBox">
                  <el-input
                    v-model="formInline.supplier_name"
                    :disabled="true"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="handleOpen('7', $t('Neednumberdimension.Suppliername'), 'supplierName', formInline.supplier_name)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 任务开始日期 -->
                <el-form-item :label="$t('Neednumberdimension.Startdate')" class="InputBox">
                  <el-date-picker
                    :start-placeholder="$t('reqcustomization.startDate')"
                    :end-placeholder="$t('reqcustomization.endDate')"
                    v-model="startDate"
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
                <!-- 第三行 -->
                <!-- 任务截止日期 -->
                <el-form-item :label="$t('Neednumberdimension.Taskdeadline')" class="InputBox">
                  <el-date-picker
                    :start-placeholder="$t('reqcustomization.startDate')"
                    :end-placeholder="$t('reqcustomization.endDate')"
                    v-model="endDate"
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
                <!-- 完成率 -->
                <el-form-item
                  :label="$t('Neednumberdimension.Completionrate')"
                  prop="crate_s"
                  class="InputBox"
                >
                  <el-input
                    v-model="formInline.crate_s"
                    @blur="getFinishRate1(formInline.crate_s)"
                    @keydown.native="submit($event)"
                  >
                    <span slot="suffix" class="pic" style="line-height: 26px; font-size: 16px;">%</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="——" class="InputBox" prop="crate_e">
                  <el-input
                    v-model="formInline.crate_e"
                    @blur="getFinishRate2(formInline.crate_e)"
                    @keydown.native="submit2($event)"
                  >
                    <span slot="suffix" class="pic" style="line-height: 26px; font-size: 16px;">%</span>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="findDemandDimensionBtn">{{ $t('breakDown.Query') }}</el-button>
            </el-col>
          </el-row>
        </div>
        <div v-if="!controlBtn" class="topSearch">
          <el-row>
            <el-col :span="22">
              <el-form
                ref="formInline"
                :inline="true"
                :model="formInline"
                :rules="rules"
                label-position="right"
              >
                <!-- 第一行 -->
                <!-- 区域 -->
                <el-form-item :label="$t('breakDown.area')" class="InputBox sun1">
                  <el-select
                    v-model="formInline.region"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in regions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求来源 -->
                <el-form-item :label="$t('Neednumberdimension.Sourceofdemand')" class="InputBox sun1">
                  <el-select
                    v-model="formInline.demand_source"
                    :placeholder="$t('demandNoResolve.select')"
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
                <el-form-item :label="$t('Neednumberdimension.Requirementtype')" class="InputBox sun1">
                  <el-select
                    v-model="formInline.demand_type"
                    :placeholder="$t('demandNoResolve.select')"
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
                <el-form-item :label="$t('Neednumberdimension.Theindustryline')" class="InputBox sun1">
                  <el-select
                    :placeholder="$t('demandNoResolve.select')"
                    v-model="formInline.industry_id"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in productionLines"
                      :key="item.industry_id"
                      :label="item.industry_name"
                      :value="item.industry_id"
                      :value-key="item.industry_name"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求编码 -->
                <el-form-item :label="$t('Neednumberdimension.Demandforcoding')" class="InputBox sun1">
                  <el-input
                    v-model="formInline.demand_code"
                    :disabled="true"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="handleOpen('2', $t('Neednumberdimension.Demandforcoding'), 'DemandCoding', formInline.demand_code)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" class= "sun2" @click="findDemandDimensionBtn">{{ $t('breakDown.Query') }}</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

    </transition>
    <!-- 收缩按钮 -->
    <div class="controlBox">
      <p class="controlBtn" @click="controlBtn = !controlBtn">
        <!-- <img :class="[controlBtn ? 'downer' : 'upper']" src="../../../assets/index/images/arrow.png"> -->
        <span :class="[controlBtn ? 'downer' : 'upper']">
          <i class="el-icon-arrow-up"/>
        </span>
      </p>
    </div>
    <!-- 表格部分 -->
    <div class="listBox">
      <!-- 需求号 物料号 -->
      <!-- <div class="chuck">
        <div class="left">
          <div class="top">
            <div>
              <p style="float: left">{{ $t('Neednumberdimension.Needsno') }}</p>
              <p>
                {{ $t('Neednumberdimension.AggregateDemand') }}:
                <span
                  class="textNew"
                  style="width: 2%"
                >{{ demandsNumberSchedule.sum_num }}</span>
              </p>
            </div>
            <div class="Box catetory">
              <el-row>
                <el-col :span="16">
                  <div>
                    <span style="width: 14px; height: 14px; background-color: #05cd00; margin-top: 8px;" class="per"/>
                    <span style="margin-right: 7%">{{ $t( 'specialNumberDimension.resolved' ) }}：{{ demandsNumberSchedule.yfj_num }}</span>
                    <span style="width: 14px; height: 14px; background-color: rgb(255, 158, 0); margin-top: 8px;" class="per"/>
                    <span style="margin-right: 7%">{{ $t( 'specialNumberDimension.resolving' ) }}：{{ demandsNumberSchedule.fjz_num }}</span>
                    <span style="width: 14px; height: 14px; background-color: rgb(0, 124, 255); margin-top: 8px; border-radius: 4px" class="per"/>
                    <span style="margin-right: 7%">{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ demandsNumberSchedule.wfj_num }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 滑块按钮 -->
      <div class="Btn">
        <div v-if="isShow" style="overflow: hidden; display: inline-block; float: left" @click="Bool = !Bool">
          <el-button v-if="Bool">
            <i class="fa fa-lock" style="margin-right: 6px;"/>
            {{ $t('breakDown.inkFreezer') }}
          </el-button>
          <el-button v-else>
            <i class="fa fa-unlock-alt" style="margin-right: 6px;"/>
            {{ $t('breakDown.unfreezeAll') }}
          </el-button>
        </div>
        <!-- Excel下载 -->
        <div v-if="isShow" class="uploadExcle" style="float: left">
          <i class="borderLine"/>
          <el-button @click="downloadExcel">
            <i class="fa fa-download" style="margin-right: 6px;"/>
            {{ $t('buttonGroup.exlUpload') }}
          </el-button>
        </div>
        <span
          style="margin:0 2% 0 6%;height:40px;line-height:40px;min-width:10%;max-width:13%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;">
          {{ $t( 'specialNumberDimension.Total' ) }}：
          <span
          >{{ demandsNumberSchedule.sum_num }}</span>
        </span>
        <span
          style="margin-right:2%;height:40px;line-height:40px;min-width:10%;max-width:13%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;"
        >
          <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color: #05cd00;margin-bottom:0"/>
          <span style="height:40px;line-height:40px;">{{ $t( 'specialNumberDimension.resolved' ) }}：{{ demandsNumberSchedule.yfj_num }}</span>
        </span>
        <span
          style="margin-right:2%;height:40px;line-height:40px;min-width:10%;max-width:13%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;"
        >
          <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color:#007cff;margin-bottom:0"/>
          <span style="height:40px;line-height:40px;">{{ $t( 'specialNumberDimension.resolving' ) }}：{{ demandsNumberSchedule.fjz_num }}</span>
        </span>
        <span
          style="margin-right:2%;height:40px;line-height:40px;min-width:10%;max-width:13%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;"
        >
          <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color:#ff9e00;margin-bottom:0"/>
          <span style="height:40px;line-height:40px;">{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ demandsNumberSchedule.wfj_num }}</span>
        </span>

        <!-- <div style="width:20px; height:20px; background: pink; float: left">
          111
        </div> -->
        <!-- 总记录条数 -->
        <div class="total">
          {{ $t('breakDown.total') }}
          <span>{{ total }}</span>
          {{ $t('breakDown.record') }}
        </div>
      </div>
      <!-- 滑块 -->
      <div v-if="!Bool" class="block">
        <el-slider v-model="slidingBlock" :show-tooltip="false" :disabled="isProhibit"/>
      </div>
      <!-- 列表 -->
      <div class="LIST">
        <el-table
          ref="table"
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
            min-width="100"
          />
          <!-- 区域 -->
          <el-table-column
            :fixed="silder2"
            :label="$t('Neednumberdimension.Region')"
            prop="region"
            min-width="100"
          />
          <!-- 需求来源 -->
          <el-table-column
            :fixed="silder3"
            :label="$t('Neednumberdimension.Sourceofdemand')"
            prop="demandSource"
            min-width="180"
          />
          <!-- 需求类型 -->
          <el-table-column
            :fixed="silder4"
            :label="$t('Neednumberdimension.Requirementtype')"
            prop="demandType"
            min-width="160"
          />
          <!-- 产业线 -->
          <el-table-column
            :fixed="silder5"
            :label="$t('Neednumberdimension.Theindustryline')"
            prop="industryName"
            min-width="160"
          />
          <!-- 需求编码 -->
          <el-table-column
            :fixed="silder6"
            :label="$t('Neednumberdimension.Demandforcoding')"
            prop="demandCode"
            min-width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="{path:'demandExclusive', query: {demand_code: scope.row.demandCode}}"
                class="demandCODE"
              >{{ scope.row.demandCode }}</router-link>
            </template>
          </el-table-column>
          <!-- 需求描述 -->
          <el-table-column
            :fixed="silder7"
            :label="$t('Neednumberdimension.Requirementdescription')"
            prop="remarks"
            min-width="240"
          />
          <!-- 任务人 -->
          <el-table-column
            :fixed="silder8"
            :label="$t('Neednumberdimension.Taskone')"
            prop="manager"
            min-width="100"
          />
          <!-- 供应商编码 -->
          <el-table-column
            :label="$t('Neednumberdimension.Suppliercode')"
            prop="supplierCode"
            width="160"
          />
          <!-- 供应商名称 -->
          <el-table-column
            :label="$t('Neednumberdimension.Suppliername')"
            prop="supplierName"
            min-width="200"
          />
          <el-table-column
            :label="$t('Neednumberdimension.Quantitynumber')"
            prop="moduleCount"
            min-width="120"
          />
          <el-table-column
            :label="$t('Neednumberdimension.Startdate')"
            prop="startReportDate"
            min-width="120"
          />
          <el-table-column
            :label="$t('Neednumberdimension.Taskdeadline')"
            prop="endReportDate"
            min-width="120"
          />
          <el-table-column
            :label="$t('Neednumberdimension.Materialnumberprogress')"
            prop="wuliaohaojindu"
          >
            <el-table-column
              :label="$t('Neednumberdimension.Decomposed')"
              prop="county"
              width="160"
            />
            <el-table-column
              :label="$t('Neednumberdimension.Inthedecomposition')"
              prop="countf"
              width="200"
            />
            <el-table-column
              :label="$t('Neednumberdimension.Undecomposed')"
              prop="countw"
              width="160"
            />
          </el-table-column>
          <el-table-column
            :label="$t('Neednumberdimension.Completionrate')"
            prop="crate"
            min-width="140"
          />
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="PA">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          :prev-text="$t('breakDown.Prev')"
          :next-text="$t('breakDown.Next')"
          layout="prev, pager, next, jumper"
          class="paging"
          background
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <iframe name="tempiframe" style="display:none"/>
  </div>
</template>
<script>
import Language from '@/utils/language'
import { selects, industryLine, flagFindData } from '@/api/requirements'
import { materialNumberSchedule, demandNumberSchedule, quotationRequest } from '@/api/quotation'
import Dialog from '@/components/Dialog/searchBox'
import { timeHandling } from '@/utils/timeHandling'
import { getDemandExcel } from '@/api/downloadurl'
// 供应商组件
import SupplierDialog from '@/components/supplier/supplierDialog'
export default {
  name: 'Demand',
  components: {
    Dialog,
    SupplierDialog
  },
  mixins: [Language],
  data() {
    // 完成率判断
    const validateFinishRate1 = (rule, value, callback) => {
      value = Number(value)
      const reg = /^\d+$/g
      if (value !== '') {
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
      uploadData: {}, // 下载的参数
      isShow: true, // 控制冻结按钮是否隐藏
      isProhibit: false, // 列表无数据时禁止冻结表头
      pageSize: 10,
      currentPage: 1,
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
        // 循环的内容
        gridData: [],
        // TableName
        tableName: '',
        // 承接的数组
        Arr: [],
        // 每页显示的条数
        pageSize: 9,
        // 总页数
        searchTotalPage: 0,
        // 选中的
        checkList: []
      },
      supplierDialogData: {
        dialogVisible: false,
        // 标识
        identification: '',
        // 承接选中的内容数组
        arrCheck: []
      },
      // input 查询条件
      manager: '', // 任务人
      managerCodes: [], // 选中的任务人
      formInline: {
        flag: 1, // 类型
        region: [], // 区域
        demand_source: [], // 需求来源
        demand_type: [], // 需求类型
        demand_code: '', // 需求编码
        manager_code: [], // 任务人工号
        industry_id: [], // 产业线id（参数待定）
        supplier_code: '', // 供应商编码
        supplier_name: '', // 供应商名称
        start_report_date_s: '', // 任务开始时间开始
        start_report_date_e: '', // 任务开始时间结束
        end_report_date_s: '', // 任务结束时间开始
        end_report_date_e: '', // 任务结束时间结束
        crate_s: '', // 完成率开始
        crate_e: '', // 完成率结束
        pageSize: 10, // 每页显示行数
        currentPage: 1 // 当前页码
      },
      completionRate: true, // 完成率格式是否正确
      // 完成率判断
      rules: {
        crate_s: [{ type: 'number', validator: validateFinishRate1, message: '请输入0-100之间的正整数' }],
        crate_e: [{ type: 'number', validator: validateFinishRate2, message: '请输入0-100之间的正整数' }]
      },
      startDate: '', // 任务开始时间
      endDate: '', // 任务截至时间
      regions: [], // select 区域
      Sources: [], // select 需求来源
      requirementTypes: [], // select 需求类型
      productionLines: [], // select 产业线
      controlBtn: true, // 控制收缩
      Bool: true, // 冻结功能控制
      slidingBlock: 0, // 滑块
      offerList: [], // 列表内容
      silder1: false, // 滑块滑动部分
      silder2: false,
      silder3: false,
      silder4: false,
      silder5: false,
      silder6: false,
      silder7: false,
      silder8: false,
      total: 0, // 总条目数
      loading: true, // loading加载
      demandsNumberSchedule:
        {
          sum_num: 0,
          yfj_num: 0,
          wfj_num: 0,
          fjz_num: 0
        }, // 需求号分解情况
      materiasNumberSchedule:
        {
          sum_num: 0,
          yfj_num: 0,
          wfj_num: 0,
          fjz_num: 0
        }// 物料号分解情况
    }
  },
  computed: {},
  watch: {
    // 滑块监听
    slidingBlock(val) {
      // console.log(this.$refs.BOXEclu.clientWidth)
      // console.log(val)
      if (val < 8.3) {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 0
      } else if (val < 16.5) {
        this.silder1 = true
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 8.3
      } else if (val < 31.2) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 16.5
      } else if (val < 44.2) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 31.2
      } else if (val < 57.3) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 44.2
      } else if (val < 72.2) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 57.3
      } else if (val < 92) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 72.2
      } else if (val < 100) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = false
        this.slidingBlock = 92
      } else {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.slidingBlock = 100
      }
    },
    // 滑块按钮
    Bool(val) {
      // console.log(val)
      if (val) {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 0
      }
    },
    startDate(val) {
      // console.log(val)
      // if (val !== null) {
      //   console.log(val.toISOString().slice(0, 10))
      // }
    }
  },
  created() {
    this.dictionaryList()
  },
  mounted() {
    // console.log(this.$refs.formInline)
    this.findDemandDimension() // 查询/列表数据
    this.demandNumberSchedule() // 需求号进度
    this.materialNumberSchedule() // 物料号进度
    // 产业线数据
    industryLine().then(res => {
      // console.log(res)
      this.productionLines = res.resultData
    })
  },
  methods: {
    // 字典查询下拉框数据
    dictionaryList() {
      const params = {
        typeCodes: '002,003,004'
      }
      selects(params)
        .then(res => {
          this.regions = res.resultData['002']
          this.Sources = res.resultData['003']
          this.requirementTypes = res.resultData['004']
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDate() { // 格式化查询条件中的日期
      if (this.startDate) {
        this.formInline.start_report_date_s = this.startDate[0]
        this.formInline.start_report_date_e = this.startDate[1]
      } else if (this.startDate === null) {
        this.formInline.start_report_date_s = ''
        this.formInline.start_report_date_e = ''
      }
      if (this.endDate) {
        this.formInline.end_report_date_s = this.endDate[0]
        this.formInline.end_report_date_e = this.endDate[1]
      } else if (this.endDate === null) {
        this.formInline.end_report_date_s = ''
        this.formInline.end_report_date_e = ''
      }
    },
    // 查询按钮
    findDemandDimensionBtn() {
      this.currentPage = 1
      this.findDemandDimension()
    },
    // 获取需求号维度的列表 id14
    findDemandDimension() {
      this.offerList = []
      this.getDate()
      this.loading = true
      if (this.completionRate === false) {
        this.$message({
          type: 'error',
          message: '请正确填写完成率'
        })
      } else {
        // 传参时需求编码/任务人/供应商编码/供应商名称及所有下拉框必须为数组
        // 优先传入任务人编号
        var tmp = this.managerCodes.map(function(value, index, array) {
          return value.managerCode
        })
        this.formInline.manager_code = tmp
        // 参数
        let params = {
          flag: 1, // 标识
          start_report_date_s: this.formInline.start_report_date_s, // 任务开始日期开始
          start_report_date_e: this.formInline.start_report_date_e, // 任务开始日期结束
          end_report_date_s: this.formInline.end_report_date_s, // 任务截止日期开始
          end_report_date_e: this.formInline.end_report_date_e, // 任务截止日期结束
          crate_s: this.formInline.crate_s, // 完成率开始
          crate_e: this.formInline.crate_e, // 完成率结束
          pageSize: this.pageSize, // 每页条数
          currentPage: this.currentPage, // 当前页
          region: this.formInline.region, // 区域
          demand_source: this.formInline.demand_source, // 需求来源
          demand_type: this.formInline.demand_type, // 需求类型
          industry_id: this.formInline.industry_id, // 产业线id
          demand_code: this.formInline.demand_code.split(','), // 需求编码
          manager_code: this.formInline.manager_code, // 任务人编码
          supplier_code: this.formInline.supplier_code.split(','), // 供应商编码
          supplier_name: this.formInline.supplier_name.split(',') // 供应商名称
        }
        if (params.demand_code[0] === '') {
          params.demand_code.splice(0, 1)
        }
        if (params.supplier_code[0] === '') {
          params.supplier_code.splice(0, 1)
        }
        if (params.supplier_name[0] === '') {
          params.supplier_name.splice(0, 1)
        }
        if (params.manager_code[0] === '') {
          params.manager_code.splice(0, 1)
        }
        this.uploadData = params
        params = JSON.parse(JSON.stringify(params))
        quotationRequest(params).then(res => {
          this.loading = false
          // this.offerList = res.resultData.data
          if (res.resultData.data) {
            this.offerList = res.resultData.data.map((value, index, arr) => {
              if (value.startReportDate) {
                value.startReportDate = timeHandling(value.startReportDate)
              }
              if (value.endReportDate) {
                value.endReportDate = timeHandling(value.endReportDate)
              }
              return value
            })
          }
          if (res.resultData.count) {
            this.total = res.resultData.count
          } else {
            this.total = 0
          }
          if (this.total === 0) {
            this.isProhibit = true
            this.isShow = false
          } else {
            this.isProhibit = false
            this.isShow = true
          }
          // console.log(res, '任务管理---->需求号')
        }).catch(err => {
          if (this.total === 0) {
            this.isProhibit = true
            this.isShow = false
          } else {
            this.isProhibit = false
            this.isShow = true
          }
          console.log(err)
        })
      }
      this.demandNumberSchedule() // 需求号进度
      this.materialNumberSchedule() // 物料号进度
    },
    // 需求号进度 id27
    demandNumberSchedule() {
      this.getDate()
      var tmp = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      this.formInline.manager_code = tmp
      let params = {
        region: this.formInline.region, // 区域
        demand_source: this.formInline.demand_source, // 需求来源
        demand_type: this.formInline.demand_type, // 需求类型
        demand_code: this.formInline.demand_code.split(','), // 需求编码
        demand_analysis_id: [], // 需求id
        manager_code: this.formInline.manager_code, // 任务人编号
        supplier_code: this.formInline.supplier_code.split(','), // 供应商编码
        supplier_name: this.formInline.supplier_name.split(','), // 供应商名称
        starttime_begin: this.formInline.start_report_date_s, // 任务开始日期开始
        starttime_end: this.formInline.start_report_date_e, // 任务开始日期结束
        overtime_begin: this.formInline.end_report_date_s, // 任务截止日期开始
        overtime_end: this.formInline.end_report_date_e, // 任务截止日期结束
        Industry_id: this.formInline.industry_id, // 产业线id
        progress_begin: this.formInline.crate_s, // 完成率开始
        progress_end: this.formInline.crate_e, // 完成率结束
        module_analysis_id: [], // 物料号
        category_en: [] // 物料类别
      }
      if (params.demand_code[0] === '') {
        params.demand_code.splice(0, 1)
      }
      if (params.supplier_code[0] === '') {
        params.supplier_code.splice(0, 1)
      }
      if (params.supplier_name[0] === '') {
        params.supplier_name.splice(0, 1)
      }
      if (params.manager_code[0] === '') {
        params.manager_code.splice(0, 1)
      }
      params = JSON.parse(JSON.stringify(params))
      demandNumberSchedule(params).then(res => {
        this.demandsNumberSchedule = res.resultData
        // console.log(res, '需求号进度')
      }).catch(err => {
        console.log(err)
      })
    },
    // 物料号进度 id28
    materialNumberSchedule() {
      this.getDate()
      var tmp = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      this.formInline.manager_code = tmp
      let params = {
        region: this.formInline.region, // 区域
        demand_source: this.formInline.demand_source, // 需求来源
        demand_type: this.formInline.demand_type, // 需求类型
        demand_code: this.formInline.demand_code.split(','), // 需求编码
        demand_analysis_id: [], // 需求id
        manager: [], // 任务人
        manager_code: this.formInline.manager_code, // 任务人编号
        supplier_code: this.formInline.supplier_code.split(','), // 供应商编码
        supplier_name: this.formInline.supplier_name.split(','), // 供应商名称
        starttime_begin: this.formInline.start_report_date_s, // 任务开始日期开始
        starttime_end: this.formInline.start_report_date_e, // 任务开始日期结束
        overtime_begin: this.formInline.end_report_date_s, // 任务截止日期开始
        overtime_end: this.formInline.end_report_date_e, // 任务截止日期结束
        industry_id: this.formInline.industry_id, // 产业线id
        progress_begin: this.formInline.crate_s, // 完成率开始
        progress_end: this.formInline.crate_e, // 完成率结束
        module_analysis_id: [], // 物料号
        category_en: [] // 物料类别
      }
      if (params.demand_code[0] === '') {
        params.demand_code.splice(0, 1)
      }
      if (params.supplier_code[0] === '') {
        params.supplier_code.splice(0, 1)
      }
      if (params.supplier_name[0] === '') {
        params.supplier_name.splice(0, 1)
      }
      params = JSON.parse(JSON.stringify(params))
      materialNumberSchedule(params).then(res => {
        this.materiasNumberSchedule = res.resultData
        // console.log(this.materiasNumberSchedule, '物料号进度')
      }).catch(err => {
        console.log(err)
      })
    },
    // 表格header
    headerStyle({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'color: #4A4A4A; background-color: #FFFFFF; text-align: center'
      } else {
        return 'color: #4A4A4A; background-color: #FFFFFF; text-align: center;'
      }
    },
    // 分页部分
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.findDemandDimension()
    },
    // 表格需求编码
    handleJoinPeople(row, id) {
      console.log(row)
    },
    // 完成率开始
    getFinishRate1(val) {
      this.formInline.crate_s = this.formInline.crate_s.toString().replace(/[^\d]/g, '')
      if (this.formInline.crate_s < 0) {
        this.formInline.crate_s = 0
      } else if (this.formInline.crate_s > 100) {
        this.formInline.crate_s = 100
      }
    },
    submit(ev) {
      // console.log(ev.keyCode, '键值')
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        // console.log(ev.keyCode)
        this.formInline.crate_s = this.formInline.crate_s.toString().replace(/[^\d]/g, '')
      }
      if (this.formInline.crate_s < 0) {
        this.formInline.crate_s = 0
      } else if (this.formInline.crate_s > 100) {
        this.formInline.crate_s = 100
      }
    },
    // 完成率结束
    getFinishRate2(val) {
      this.formInline.crate_e = this.formInline.crate_e.toString().replace(/[^\d]/g, '')
      if (this.formInline.crate_e < 0) {
        this.formInline.crate_e = 0
      } else if (this.formInline.crate_e > 100) {
        this.formInline.crate_e = 100
      }
      if (this.formInline.crate_s !== null) {
        if (this.formInline.crate_s > this.formInline.crate_e) {
          this.formInline.crate_e = this.formInline.crate_s
        }
      }
    },
    submit2(ev) {
      // console.log(ev.keyCode, '键值')
      if (ev.keyCode < 48 || ev.keyCode > 57) {
        // console.log(ev.keyCode)
        this.formInline.crate_e = this.formInline.crate_e.toString().replace(/[^\d]/g, '')
      }
      if (this.formInline.crate_e < 0) {
        this.formInline.crate_e = 0
      } else if (this.formInline.crate_e > 100) {
        this.formInline.crate_e = 100
      }
      if (this.formInline.crate_s !== null) {
        if (this.formInline.crate_s > this.formInline.crate_e) {
          this.formInline.crate_e = this.formInline.crate_s
        }
      }
    },
    // 弹窗
    handleOpen(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      // 传过去回显check数据
      this.searchData.checkList = []
      if (checkValue !== '') {
        if (checkValue === this.managerCodes) {
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
    getChildData(val) {
      // console.log(val)
      if (val.inputValue === 'supplierCode') {
        this.formInline.supplier_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.formInline.supplier_name = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        this.formInline.moduleCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        this.formInline.demand_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskMan') {
        this.manager = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter((value, index, array) => {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
        // var val1 = JSON.parse(JSON.stringify(val))
        // this.managerCodes = val.checkedCities
        // var tmp1 = val1.checkedCities.map(function(value, index, array) {
        //   return value.manager
        // })
        // this.manager = tmp1.join(',')
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
        this.formInline.supplier_code = res.checkList.join(',')
      } else if (this.supplierDialogData.identification === 'supplierName') {
        this.formInline.supplier_name = res.checkList.join(',')
      }
    },
    // Excel下载
    downloadExcel() {
      const params = {
        'excelName': '1',
        // 'keyName': ['customer', 'region', 'demandSource', 'demandType', 'industryName', 'demandCode', 'remarks', 'manager', 'supplierCode', 'supplierName', 'moduleCount', 'startReportDate', 'endReportDate', 'county', 'countf', 'countw', 'crate'],
        'searchParams': {}
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
        //     'headerOne': '供应商编码',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '供应商名称',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '物料号数量',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务开始日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务截止日期  ',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '物料号进度',
        //     'headerLast': [
        //       '已分解',
        //       '分解中',
        //       '未分解'
        //     ]
        //   },
        //   {
        //     'headerOne': '完成率',
        //     'headerLast': []
        //   }
        // ]
      }
      params.searchParams = JSON.parse(JSON.stringify(this.uploadData))
      params.searchParams.currentPage = 1
      params.searchParams.pageSize = 10000
      // window.open(getDemandExcel(params))
      const a = document.createElement('a')
      const url = getDemandExcel(params)
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

<style scoped>
.Btn span{
  display: inline-block;
  font-size: 16px;
  color: #333;
}
.box {
  background: rgba(244, 244, 244, 1);
  padding: 18px;
  min-height: calc(100vh - 153px);
}
.box .topSearch {
  padding: 34px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #cecece;
  border-radius: 4px;
}
.box .topSearch .datePosition {
  position: absolute;
  right: 32px;
  top: 0;
}
.box .topSearch .line {
  width: 1px;
  height: 22px;
  background-color: #cecece;
  margin-top: 10px;
}
/* 收缩按钮 */
.controlBox {
  overflow: hidden;
  background: rgba(244, 244, 244, 1);
  position: relative;
}
.controlBtn span {
  display: inline-block;
  height: 16px;
  color: #666666;
  position: absolute;
  left: 50%;
  padding: 0 12px;
  margin-left: -20px;
  top: -1px;
  cursor: pointer;
}
.controlBtn {
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
.upper {
  transform: rotate(180deg);
  transition: all 0.3s ease;
}
.downer {
  transform: rotate(360deg);
  transition: all 0.3s ease;
}
.downer .fa{
  margin-right: 0
}
/* 表格部分 */

/* 物料号 需求号 */
.listBox {
  background: rgba(255, 255, 255, 1);
  border: 1px solid #d1d1d1;
  margin-top: 3px;
}
.listBox .chuck {
  padding: 12px 15px;
  margin: 0 4px;
  /* padding-bottom: 20px; */
  border-bottom: 1px solid #cecece;
  overflow: hidden;
}
.listBox .chuck .left {
  float: left;
  /* border-right: 1px solid #d1d1d1; */
  /* padding-right: 20px; */
  width: 100%;
}
.listBox .chuck .left .top,
.textNew {
  /* width: 100%; */
  /* width: 2%; */
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #000;
  line-height: 28px;
}
.listBox .chuck .left .textNew {
  padding-left: 10px;
}
.listBox .chuck .left .top p {
  /* font-size: 14px; */
  font-family: MicrosoftYaHei;
  color: #000;
  /* line-height: 19px; */
  margin-right: 13%;
  float: left;
}
.listBox .chuck .left .top .Box {
  text-align: center;
  overflow: hidden;
}
.listBox .chuck .left .top .Box .per {
  /* margin-top: 10px; */
  /* width: 38%; */
  display: inline-block;
  /* margin-bottom: 10px; */
}
.listBox .chuck .left .top .Box .per1 {
  margin-top: 40px;
  width: 20%;
  display: inline-block;
}
.listBox .chuck .left .top .Box .per1 .textNew {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
}
.listBox .chuck .left .top .Box .per .textNew {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
}
.listBox .chuck .left .top .Box .per .pro1 {
  width: 100%;
  height: 14px;
  background: rgba(5, 205, 0, 1);
  border-radius: 3px;
}
.listBox .chuck .left .top .Box .per .pro2 {
  width: 100%;
  height: 14px;
  background: rgba(0, 124, 255, 1);
  border-radius: 3px;
}
.listBox .chuck .left .top .Box .per1 .pro3 {
  width: 100%;
  height: 14px;
  background: rgba(255, 158, 0, 1);
  border-radius: 3px;
}

.listBox .chuck .right {
  float: left;
  padding-left: 20px;
  width: 50%;
}
.listBox .chuck .right .top,
.textNew {
  width: 100%;
  /* font-size: 24px; */
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  /* line-height: 28px; */
}
.listBox .chuck .right .textNew {
  padding-left: 10px;
}
.listBox .chuck .right .top p {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
  line-height: 19px;
  float: right;
}
.listBox .chuck .right .top .Box {
  text-align: center;
  overflow: hidden;
}
.listBox .chuck .right .top .Box .per {
  margin-top: 10px;
  /* width: 38%; */
  display: inline-block;
  font-size: 16px;
  margin-bottom: 10px;
}
.listBox .chuck .right .top .Box .per1 {
  margin-top: 40px;
  width: 20%;
  display: inline-block;
}
.listBox .chuck .right .top .Box .per1 .textNew {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
}
.listBox .chuck .right .top .Box .per .textNew {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
}
.listBox .chuck .right .top .Box .per .pro1 {
  width: 100%;
  height: 14px;
  background: rgba(5, 205, 0, 1);
  border-radius: 3px;
}
.listBox .chuck .right .top .Box .per .pro2 {
  width: 100%;
  height: 14px;
  background: rgba(0, 124, 255, 1);
  border-radius: 3px;
}
.listBox .chuck .right .top .Box .per1 .pro3 {
  width: 100%;
  height: 14px;
  background: rgba(255, 158, 0, 1);
  border-radius: 3px;
}

/* 滑块 */
.box .listBox .Btn {
  overflow: hidden;
  color: #4a90e2;
  margin-bottom: 10px;
  position: relative;
  padding: 16px 15px;
  padding-bottom: 0;
}
.box .listBox .Btn .total {
  display: inline-block;
  position: absolute;
  right: 20px;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  color: #4a4a4a;
  font-size: 14px;
}
.box .listBox .Btn .total span {
  color: #4a90e2;
  padding: 0 4px;
}
.box .listBox .Btn .Curr {
  display: inline-block;
  position: absolute;
  right: 0;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  color: #4a4a4a;
  font-size: 14px;
}
.box .listBox .Btn .Curr span {
  color: #4a90e2;
  padding: 0 2px;
}
.box .listBox .block {
  margin: 0 15px;
  width: 1222px;
}
/* 列表 */
.box .listBox .LIST {
  padding: 0 15px;
}
/* 分页 */
.box .listBox .PA {
  padding: 34px;
  padding-top: 0;
}

.demandCODE {
  color: #409eff;
}
.demandCODE:hover {
  cursor: pointer;
}
</style>
<style>
.InputBox .el-date-editor .el-range__icon {
  color: #606266;
}
/* 表格超出隐藏 */
.LIST .el-table .cell {
  white-space: nowrap;
}
.box .topSearch label {
  font-weight: normal;
}
.box .topSearch .el-form--inline .el-form-item {
  width: 18%;
}
.box .topSearch .el-form--inline .el-form-item__label {
  width: 28%;
  line-height: 20px;
}
.box .topSearch .el-form-item.InputBox label {
  position: relative;
  top: 50%;
  margin-top: 8px;
  /* text-align: left; */
}
.box .topSearch .el-form-item.sun1{
  margin-bottom:0
}
.box .topSearch .sun2 {
    margin-top: 0 !important;
}
/* 下拉框中的样式 */
.InputBox .el-tag--small {
  padding: 0px 3px 0px 0px;
}
.InputBox .el-select .el-tag__close.el-icon-close {
  right: -3px;
}
.box .topSearch .el-form-item.InputBox:nth-child(12) label {
  text-align: center;
}
.InputBox .el-select__tags {
  white-space: nowrap;
}
/* 搜索框溢出隐藏 */
.InputBox .el-input--suffix .el-input__inner {
  padding-right: 35px;
}
.InputBox .el-input.is-disabled .el-input__inner {
  color: #606266;
}
/* 时间控件样式 */
.box .topSearch .el-form--inline .el-form-item:nth-child(9) {
  width: 38%;
}
/* .box .topSearch .el-form--inline .el-form-item:nth-child(9) label {
  width: 17%;
} */
.box .topSearch .el-form--inline .el-form-item:nth-child(10) {
  width: 33%;
}
/* .box .topSearch .el-form--inline .el-form-item:nth-child(10) label {
  width: 17%;
} */
.box .topSearch .el-range-editor .el-range-input {
  background: #f9f9f9;
}
.box .topSearch .el-input__inner {
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #cecece;
}
.box .topSearch .el-form--inline .el-form-item__content {
  width: 66%;
}
.box .topSearch .el-row .el-col.el-col-22 {
  border-right: 1px solid #cecece;
}
.box .topSearch .el-form--inline .el-form-item:nth-child(10),
.el-form-item:nth-child(11),
.el-form-item:nth-child(12) {
  margin-bottom: 0;
}
.box
  .topSearch
  .el-form--inline
  .el-form-item:nth-child(10)
  .el-form-item__label {
  width: 26%;
}
/* 查询 */
.box .topSearch .el-button {
  position: relative;
  left: 24%;
  margin-top: 50%;
}
.box .topSearch .el-input span.pic {
  /* border-left: 1px solid #cecece; */
  display: inline-block;
  height: 24px;
  width: 32px;
  margin-top: 24%;
  padding: 0 20%;
}
.box .topSearch .el-input span.pic img {
  display: inline;
  padding-left: 5px;
  margin-bottom: 18%;
  border-left: 1px solid #cecece;
}
.box .topSearch .el-input span.pic img:hover {
  cursor: pointer;
}
/* 冻结按钮 */
.el-button--default {
  border: 1px solid #4a90e2;
}
.box .el-button--default span {
  color: #4a90e2;
}
/* 滑块 */
.el-slider__runway {
  background: #ffffff;
}
.el-slider__button {
  width: 14px;
  height: 24px;
  /* border: 2px solid #409eff; */
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
  /* background-color: #409EFF; */
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
/* 物料号进度条 */
/* .catetory {
  border-bottom: 1px solid #cecece;
  padding-bottom: 2%;
  margin-bottom: 3%;
} */
/* .catetory p {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 2%;
} */
.catetory .el-col div {
  display: flex;
  margin-bottom: 2px;
  font-size: 16px;
}
.catetory .el-col div span {
  display: inline-block;
  text-align: left;
  margin: 0 2px;
}
.catetory .el-col div:last-child span:nth-of-type(1) {
  /* height: 14px; */
  /* background-color: #05cd00; */
  border-radius: 4px;
  /* margin-bottom: 6px */
}
.catetory .el-col div:last-child span:nth-of-type(2) {
  height: 14px;
  /* background-color: #007cff; */
  border-radius: 4px;
}
.catetory .el-col div:last-child span:nth-of-type(3) {
  height: 14px;
  /* background-color: #ff9e00; */
  border-radius: 4px;
}
.showGreen{
  background-color: #05cd00;
}
.showBlue{
  background-color: #007cff;
}
.showYellow{
  background-color: #ff9e00;
}
.uploadExcle{
  margin-left: 25px;
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
