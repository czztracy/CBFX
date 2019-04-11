<template>
  <div class="condition-options">
    <el-row class="condition-select">
      <!-- <el-col :span="4">{{ $t('dashboard.selectionOfConditions') }}</el-col> -->
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
        <el-select v-model="areaChoose" @change="passValue">
          <el-option
            v-for="item in optionsChoose"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Eventbus from '@/bus.js'
import { selects } from '@/api/dashboard'
export default {
  data() {
    return {
      // 月度累计和年度累计切换
      // triggleMonthYear: 'month',
      // 区域条件选择选项
      optionsChoose: [],
      // 条件选择选项选中值
      areaChoose: '中国',
      show: {}
    }
  },
  computed: {
    triggleMonthYear() {
      return this.$store.getters.triggleMonthYear
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
  methods: {
    // 点击月度累计和年度累计按钮
    changeColorMoths() {
      this.$store.dispatch('ChangeYear', 'month')
      // this.$store.commit('SET_SELECT', 'month')
      // this.triggleMonthYear = 'month'
      Eventbus.$emit('triggleMonthYear', this.triggleMonthYear) // 事件总线
    },
    changeColorYear() {
      this.$store.dispatch('ChangeYear', 'year')
      // this.$store.commit('SET_SELECT', 'year')
      // this.triggleMonthYear = 'year'
      Eventbus.$emit('triggleMonthYear', this.triggleMonthYear) // 事件总线
    },
    passValue(value) {
      this.$store.commit('Pass_Value', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.condition-options{
    .condition-select {
        padding-left: 70px;
    }
    .el-col.arrow-height {
        height: 60%;
        line-height: 60%;
        margin: 7px 0 0 185px;
    }
    .el-col span {
      display: inline-block;
      height: 54px;
      margin-right: 5%;
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }
    .el-col span.choose {
      color: #2290ff;
      border-color: #2290ff;
    }
}
</style>
