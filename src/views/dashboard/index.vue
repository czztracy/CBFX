<template>
  <div class="dashboard-container">
    <div v-if="roles.includes('Finance') ? false : true">
      <SelectionChoose/>
    </div>
    <div v-if="roles.includes('Finance') ? true : false" class="finance">采购成本大数据系统</div>
  </div>
</template>

<script>
import Eventbus from '@/bus.js'
import SelectionChoose from '@/views/dashboard/SelectionChoose'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    SelectionChoose // 图表部分
  },
  data() {
    return {
      show: {
        // 头部1
        top1Micro: false, // 报价单任务数量 (商务小微)
        top1Manager: false, // 报价单任务数量 (采购经理,小微主,接口人)
        top1Supplier: false, // 报价单任务数量 (供应商)
        // 头部2
        top2Micro: false, // 报价单分解完成率 (商务小微)
        top2Manager: false, // 报价单分解完成率 (采购经理,小微主,接口人)
        top2Supplier: false, // 报价单分解完成率 (供应商)
        // 头部3
        top3Micro: false, // 报价单稽核率 (商务小微)
        top3Manager: false, // 报价单查看率 (采购经理,小微主,接口人)
        top3Supplier: false, // 报价单退回率 (供应商)
        // 头部4
        top4Micro: false, // 报价单稽核退回率 (商务小微)
        top4Manager: false, // 报价单退回率 (采购经理,小微主,接口人)
        top4Supplier: false, // 报价单完成及时率 (供应商)

        box1: false, // 报价单分解进度(商务小微)

        box2Micro: false, // 报价单质量分布(商务小微)
        box2Manager: false, // 报价单质量分布(采购经理,小微主,接口人)

        box3: false, // 报价单分解质量 (商务小微)

        box4: false, // 产业线参与度 (商务小微)

        box5: false, // 大数据概况(商务小微)

        resolveCManager: false, // 报价单分解进度(采购经理,小微主,接口人)

        resolveQManager: false, // 报价单分解质量(采购经理,小微主,接口人)

        supplierResolve: false, // 报价单分解进度 (供应商)

        supplierResolveQ: false, // 报价单分解质量 (供应商)
        supplierResolveWarning: false, // 报价单进度预警(供应商)

        toeflCManager: false, // 供应商分解进度(采购经理,小微主,接口人)

        toeflPManager: false, // 供应商分解质量(采购经理,小微主,接口人)

        messageMicro: false, // 我的消息(商务小微)

        messageManager: false, // 我的消息(采购经理,小微主,接口人)

        messageSupplier: false // 我的消息(供应商)
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'rolesName', 'userSign'])
  },
  created() {
    // this.isSupplier()
    // console.log(22222, this.rolesName)
    // 海尔用户
    if (this.userSign === 'haier') {
      for (var i = 0, len = this.rolesName.length; i < len; i++) {
        this.change(this.rolesName[i])
      }
      // 供应商
    } else if (this.userSign === 'supplier') {
      this.isSupplier()
    }
  },
  mounted() {
    Eventbus.$emit('show', this.show) // 事件总线
    // console.log(1111, this.showChange(this.findIndex(this.resultData).nextNode), this.$store.state.user.rolesName)
  },
  methods: {
    // 判断rolename若是 '供应商'
    isSupplier() {
      this.show.top1Supplier = true
      this.show.top2Supplier = true
      this.show.top3Supplier = true
      this.show.top4Supplier = true

      this.show.messageSupplier = true
      this.show.supplierResolve = true
      this.show.supplierResolveQ = true
      this.show.supplierResolveWarning = true
    },
    // 取出首页树
    findIndex(res) {
      for (var i = 0, len = res.funTree.funcNode.length; i < len; i++) {
        if (res.funTree.funcNode[i].currentNode.name === '首页') {
          return res.funTree.funcNode[i]
        }
      }
    },
    // 判断首页树的功能
    showChange(arr) {
      var tmp = arr.map(function(value, index, array) {
        return value.currentNode.name
      })
      return tmp
    },
    change(name) {
      switch (name) {
      case '小微报价单任务数量':
        this.show.top1Micro = true
        break
      case '采购经理报价单任务数量':
        this.show.top1Manager = true
        break

      case '小微报价单分解完成率':
        this.show.top2Micro = true
        break
      case '采购经理报价单分解完成率':
        this.show.top2Manager = true
        break

      case '小微报价单稽核率':
        this.show.top3Micro = true
        break
      case '采购经理报价单查看率':
        this.show.top3Manager = true
        break

      case '小微报价单稽核退回率':
        this.show.top4Micro = true
        break
      case '采购经理报价单退回率':
        this.show.top4Manager = true
        break

      case '小微我的消息':
        this.show.messageMicro = true
        break
      case '采购经理我的消息':
        this.show.messageManager = true
        break

      case '小微报价单分解进度':
        this.show.box1 = true
        break
      case '采购经理报价单分解进度':
        this.show.resolveCManager = true
        break

      case '小微报价单质量分布':
        this.show.box2Micro = true
        break
      case '采购经理报价单分解质量':
        this.show.resolveQManager = true
        break

      case '小微报价单分解质量':
        this.show.box3 = true
        break
      case '采购经理供应商分解进度':
        this.show.toeflCManager = true
        break

      case '小微产业参与度':
        this.show.box4 = true
        break
      case '采购经理供应商分解质量':
        this.show.toeflPManager = true
        break

      case '小微大数据概况':
        this.show.box5 = true
        break
      case '采购经理报价单质量分布':
        this.show.box2Manager = true
        break

      default:
        break
      }
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  font-size: 16px;
  .index-title {
    width: 100%;
    // font-size: 22px;
    font-size: 18px;
    color: #004ea1;
    height: 72px;
    line-height: 72px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #d1d1d1;
  }
}
.finance {
  height: 100%;
  text-align: center;
  margin-top: 20%;
}
</style>
