/*
 * @Page: 规则配置-->新建弹窗
 * @Author: wangyadi
 * @Date: 2019-02-20 13:04:03
 * @Last Modified by: wangyadi
 */

<template>
  <el-dialog
    :visible.sync="ruleDialog.dialogTableVisible"
    :title="$t('ruleConfiguration.newRules')"
    width="30%"
    @close="closedDialog">
    <div class="rules">
      <!-- 规则库 -->
      <div class="ruleBase">
        <span>{{ $t('ruleConfiguration.ruleBase') }}</span>
        <el-select v-model="queryCriteria.ruleBaseCode" :placeholder="$t('ruleConfiguration.select')" class="baseInput">
          <el-option
            v-for="item in ruleBase"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <!-- 规则类型 -->
      <div class="ruleType">
        <span>{{ $t('ruleConfiguration.ruleType') }}</span>
        <el-select v-model="queryCriteria.ruleTypeCode" :placeholder="$t('ruleConfiguration.select')" class="baseTypeInput" @change="isShowNumber">
          <el-option
            v-for="item in ruleType"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
    </div>
    <div class="timeSetting">
      <!-- 时间间隔 -->
      <div class="interval">
        <span class="intervalSpan">{{ $t('ruleConfiguration.timeInterval') }}</span>
        <el-input v-model="queryCriteria.timeInterval" :placeholder="$t('ruleConfiguration.write')" class="intervalBtn" @blur="isNumber"/>
        <span class="intervalDay">{{ $t('ruleConfiguration.day') }}</span>
      </div>
      <!-- 任务数量 -->
      <div class="interval">
        <span class="intervalSpan">{{ $t('ruleConfiguration.NumberOfTasks') }}</span>
        <el-input :disabled="isShow" v-model="queryCriteria.taskCount" :placeholder="$t('ruleConfiguration.write')" class="intervalBtn" @blur="isRealNum"/>
        <span class="intervalDay">个</span>
      </div>
      <!-- 起止日期 -->
      <div class="dates">
        <span class="intervalSpan" style="width:13%">{{ $t('ruleConfiguration.StartAndStopDates') }}</span>
        <el-date-picker
          :start-placeholder="$t('reqcustomization.startDate')"
          :end-placeholder="$t('reqcustomization.endDate')"
          :picker-options="pickerOptions0"
          v-model="StartAndStopDates"
          class="timeSlot"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="isClick" class="ruleBtn" type="primary" @click="addRule">{{ $t('ruleConfiguration.Sure') }}</el-button>
      <el-button class="ruleBtn" @click="closedDialog">{{ $t('ruleConfiguration.cancel') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRule } from '@/api/configure'
export default {
  name: 'Dialog',
  props: {
    ruleDialog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShow: false, // 是否禁用任务数量
      isClick: false, // 是否可以点击确定
      StartAndStopDates: '', // 起止日期
      interval: '', // 时间间隔
      // 查询条件
      queryCriteria: {
        ruleBaseCode: '', // 规则库
        ruleTypeCode: '', // 规则类型
        startDate: '', // 起始日期
        endtDate: '', // 截止日期
        timeInterval: '', // 时间间隔
        taskCount: '' // 任务数量
      },
      // 规则库
      ruleBase: [
        {
          value: '0001',
          label: '任务自动关闭规则库'
        },
        {
          value: '0002',
          label: '报价任务分解周期规则库'
        }
      ],
      // 规则类型
      ruleType: [
        {
          value: '0001',
          label: '每个供应商5个工作日内报价单任务数不多于50个'
        },
        {
          value: '0002',
          label: '同一物料同一供应商并存多条未分解任务保留最新任务'
        }
      ],
      // 当前日期及往后可选择
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  methods: {
    closedDialog() {
      this.ruleDialog.dialogTableVisible = false
      this.isShow = false
      this.StartAndStopDates = '' // 起止日期
      this.queryCriteria = {
        ruleBaseCode: '', // 规则库
        ruleTypeCode: '', // 规则类型
        startDate: '', // 起始日期
        endtDate: '', // 截止日期
        timeInterval: '', // 时间间隔
        taskCount: '' // 任务数量
      }
    },
    // 格式化日期
    getDate() {
      if (this.StartAndStopDates) {
        this.queryCriteria.startDate = this.StartAndStopDates[0]
        this.queryCriteria.endtDate = this.StartAndStopDates[1]
      } else if (this.StartAndStopDates === null) {
        this.queryCriteria.startDate = ''
        this.queryCriteria.endtDate = ''
      }
    },
    // 新建规则
    addRule() {
      this.getDate()
      const params = JSON.parse(JSON.stringify(this.queryCriteria))
      if (this.queryCriteria.ruleTypeCode === '0002') {
        this.queryCriteria.taskCount = ''
        if (this.queryCriteria.timeInterval === '') {
          this.$message({
            type: 'error',
            message: '时间间隔为必填项！'
          })
        } else {
          addRule(params).then(res => {
            if (res.success === true) {
              this.$message({
                type: 'success',
                message: '操作成功！'
              })
              this.ruleDialog.dialogTableVisible = false
            }
          }).catch(err => {
            console.log(err)
          })
          this.$emit('selectList')
        }
      } else if (this.queryCriteria.ruleTypeCode === '0001') {
        if (this.queryCriteria.timeInterval !== '' && this.queryCriteria.taskCount !== '') {
          addRule(params).then(res => {
            if (res.success === true) {
              this.$message({
                type: 'success',
                message: '操作成功！'
              })
              this.ruleDialog.dialogTableVisible = false
            }
          }).catch(err => {
            console.log(err)
          })
          this.$emit('selectList')
        } else {
          this.$message({
            type: 'error',
            message: '时间间隔和任务数量均为必填项！'
          })
        }
      }
    },
    // 是否禁用任务数量
    isShowNumber() {
      if (this.queryCriteria.ruleTypeCode === '0002') {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    // 校验时间间隔
    isNumber() {
      if (this.queryCriteria.timeInterval === '') {
        this.$message({
          type: 'error',
          message: '时间间隔不能为空！'
        })
      } else if (Number(this.queryCriteria.timeInterval) <= 0) {
        this.$message({
          type: 'error',
          message: '时间间隔应大于0！'
        })
        this.queryCriteria.timeInterval = ''
      } else if (!(/^[0-9]+$/.test(this.queryCriteria.timeInterval))) {
        this.$message({
          type: 'error',
          message: '时间间隔必须为整数！'
        })
        this.queryCriteria.timeInterval = ''
      } else {
        this.queryCriteria.timeInterval = this.queryCriteria.timeInterval.toString().replace(/[^\d]/g, '')
      }
    },
    // 校验任务数量
    isRealNum() {
      if (this.queryCriteria.taskCount === '') {
        this.$message({
          type: 'error',
          message: '任务数量不能为空！'
        })
      } else if (Number(this.queryCriteria.taskCount) <= 0) {
        this.$message({
          type: 'error',
          message: '任务数量应大于0！'
        })
        this.queryCriteria.taskCount = ''
      } else if (!(/^[0-9]+$/.test(this.queryCriteria.taskCount))) {
        this.$message({
          type: 'error',
          message: '任务数量必须为整数！'
        })
        this.queryCriteria.taskCount = ''
      } else {
        this.queryCriteria.taskCount = this.queryCriteria.taskCount.toString().replace(/[^\d]/g, '')
      }
    }
  }
}
</script>

<style lang="scss" scope>
.rules{
    height: 66px;
    padding: 0 3%;
    .ruleBase, .ruleType{
        float: left;
        margin-top: 21px;
        width: 50%;
        // span{
        //     // margin-right: 10px;
        // }
        .baseInput{
            margin-right:15px;
            width: 70%;
        }
        .baseTypeInput{
          margin-right:15px;
          width: 64%;
        }
      .el-input--suffix .el-input__inner{
        font-size: 14px;
        padding-right: 27px;
        overflow: hidden;
      }
    }
}
.timeSetting{
    // height: 195px;
    background: #f5f5f5;
    margin-top: 3%;
    padding: 1% 0 2% 3%;
    .interval, .dates{
        // float: left;
        margin-top: 12px;
        // height: 50px;
        // line-height: 50px;
        width: 50%;
        display: flex;
        .intervalSpan{
          float: left;
          margin-right: 1%;
          width: 21%;
          margin-top: 10px;
        }
        .el-date-editor.el-input__inner{
          width: 57%;
        }
        .intervalDay{
          float: right;
          margin-top: 4%;
          margin-left: 1%;
        }
        .el-input{
          width: 55%;
          margin-left: 1%;
        }
      .timeSlot{
        float: left;
      }
    }
  .dates{
    width: 80%;
    // margin-top: 20px;
  }
}
.dialog-footer{
    .ruleBtn{
        height: 28px;
        width: 80px;
        line-height: 0px;
        font-size: 12px;
    }
}
</style>
