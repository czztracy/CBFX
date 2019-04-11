/*
 * @Page: 模板管理->模版编辑-树
 * @Author: 孙中超
 * @Date: 2018-12-13 09:10:04
 * @Last Modified by: 孙中超
 */

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" style="height:828px" class="model-tree">
    <div v-loading="loading" class="treeNav">
      <div class="tree-name">
        {{ $t('templateManager.Template') }}（<span style="color:blue">{{ loading1.count }}</span>）
      <!-- <router-link :to="{path:'/modle/newlybuild'}"><i class="el-icon-plus add-style"/></router-link> -->
      </div>
      <div class="tree-search">
        <el-input v-model="searchinp" :placeholder="$t('fieldInTheLibrary.search')" prefix-icon="el-icon-search"/>
      </div>
      <div class="tree-con">
        <!-- <el-tree :data="treeList" node-key="id" class="treeing" draggable default-expand-all @node-click="addModel">
        <div slot-scope="{ node, data }" class="custom-tree-node" >
          <span class="Con">
            <i :class="node.icon"/>
            {{ node.label }}
          </span>
          <i v-if="data.children instanceof Array && node.label !=='海尔'" class="el-icon-plus add-style" @click="addKind($event,node,data)"/>
        </div>
      </el-tree> -->
        <el-tree
          ref="tree"
          :data="analogData"
          :filter-node-method="filterNode"
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          :default-expanded-keys="openTree"
          node-key = "id"
          class="treeing"
          draggable
          @node-click="showTemplate"
          @node-contextmenu="rightClickMenu"
          @node-drop="nodeDragEnd">
          <div slot-scope="{ node, data }" class="custom-tree-node" >
            <span class="Con">
              <!-- <i class="fa fa-folder-o"/> -->
              <i :class="[{fa:true},{'fa-folder-o':typeof data.pid === 'string' || data.children instanceof Array || (node.parent.parent !== null && node.parent.parent.parent === null)},{'fa-file-o':typeof data.pid !== 'string' && !(data.children instanceof Array)}]"/>
              <!-- <i :class="[{fa:true},{'fa-folder-o':typeof data.pid === 'string' || data.children instanceof Array || (node.parent.parent !== null && node.parent.parent.parent === null)},{'fa-file-o':typeof data.pid !== 'string' && !(data.children instanceof Array)}]"/> -->
              <!-- <i :class="[{fa:true},{'fa-file-o':typeof data.pid !== 'string'}]"/> -->
              {{ node.label }}
              <i v-if="node.parent.parent !== null && (node.parent.parent.parent === null || typeof data.pid === 'string')" class="el-icon-plus add-style" @click="addKind($event,node,data)"/>
            </span>

          </div>
        </el-tree>
        <!-- <el-tree
          v-show="!upOrFalse"
          ref="tree"
          :data="analogData"
          :filter-node-method="filterNode"
          :allow-drag="allowDrag"
          :allow-drop="allowDrop"
          class="treeing"
          draggable
          default-expand-all
          @node-click="showTemplate"
          @node-contextmenu="rightClickMenu"
          @node-drop="nodeDragEnd">
          <div slot-scope="{ node, data }" class="custom-tree-node" >
            <span class="Con">
              <i :class="[{fa:true},{'fa-folder-o':typeof data.pid === 'string' || data.children instanceof Array || (node.parent.parent !== null && node.parent.parent.parent === null)},{'fa-file-o':typeof data.pid !== 'string' && !(data.children instanceof Array)}]"/>
              {{ node.label }}
              <i v-if="node.parent.parent !== null && (node.parent.parent.parent === null || typeof data.pid === 'string')" class="el-icon-plus add-style" @click="addKind($event,node,data)"/>
            </span>
          </div>
        </el-tree> -->
      </div>
      <div v-show="file !==''" style="position: fixed;top:0;right: 0;bottom: 0;left: 0;overflow: auto;margin: 0;z-index:1000" @click="fileFalse">
        <div ref = "contextMenu" :style="mypagestyle" class="contextMenu" @click="fileFalse">
          <!-- 区域菜单 -->
          <ul v-if="file === 'region'">
            <!-- 新建分组 -->
            <li @click="addGroup"><i class="fa fa-folder-o"/>{{ $t('templateManager.newGroup') }}</li>
          <!-- <li @click="reName"><i class="fa fa-pencil-square-o"/>重命名</li> -->
          </ul>
          <!-- 分组菜单 -->
          <ul v-if="file==='other'">
            <!-- 新建分组 -->
            <li @click="addGroup"><i class="fa fa-folder-o"/>{{ $t('templateManager.newGroup') }}</li>
            <!-- 添加到分组 -->
            <li @click="addToGroupShow"><i class="fa fa-check-square-o"/>{{ $t('templateManager.addToGroup') }}</li>
            <!-- 重命名 -->
            <li @click="reName"><i class="fa fa-pencil-square-o"/>{{ $t('templateManager.reName') }}</li>
            <!-- 删除 -->
            <li @click="deleteSel"><i class="fa fa-trash-o"/>{{ $t('templateManager.deleteSel') }}</li>
          </ul>
          <!-- 品类菜单 -->
          <ul v-if="file==='model'">
            <!-- 新建模版 -->
            <li @click="toNewModel()"><i class="fa fa-file-text-o"/>{{ $t('templateManager.NewModel') }}</li>
            <!-- 将此项移至分组 -->
            <li @click="toTheGroup"><i class="fa fa-clipboard"/>{{ $t('templateManager.toTheGroup') }}</li>
          </ul>
        </div>
      </div>
      <!-- 新建分组遮罩 -->
      <NewGroup :shadedata = "form" @refreshTree="refTree1"/>
      <!-- 分组重命名遮罩 -->
      <ReNameGroup :shadedata = "form2" @refreshTree="refTree1"/>
      <!-- 添加到分组遮罩 -->
      <AddToGroup :addtogroup = "addToGroupData" @refreshTree="refTree1"/>
      <!-- 此项移至新分组遮罩 -->
      <MoveToGroup :movetogroup = "moveToGroupData" @refreshTree="refTree1"/>
    </div>
  </el-scrollbar>
</template>
<script>
import NewGroup from '@/views/modle/components/newGroup'
import ReNameGroup from '@/views/modle/components/reNameGroup'
import AddToGroup from '@/views/modle/components/addToGroup'
import MoveToGroup from '@/views/modle/components/moveToGroup'
import { initTree, templateClassDelete, updateCategoryClass } from '@/api/modle'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
export default {
  name: 'Tree',
  components: {
    NewGroup,
    AddToGroup,
    MoveToGroup,
    ReNameGroup
  },
  props: {
    loading1: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      openTree: [],
      // upOrFalse: true,
      // 菜单位置
      mypagestyle: { left: '100px' },
      loading: true,
      // 当前区域
      regioningId: '',
      // 移入的区域id,
      regionedId: '',
      // 模版总数
      // total: 0,
      // 点击左侧获取模版数据
      modellist: [],
      // 点击获取的数据
      targetData: {},
      // 区域数据,
      targetRegion: {},
      // 新建分组遮罩数据,
      form: {
        dialogFormVisible: false,
        name: '',
        targetData: {},
        targetRegion: {}
      },
      // 分组重命名遮罩数据
      form2: {
        dialogFormVisible: false,
        name: '',
        targetData: {},
        targetRegion: {}
      },
      // 添加到分组遮罩数据
      addToGroupData: {
        dialogAddGroup: false,
        name: '',
        targetData: {},
        data: [],
        targetRegion: {}
      },
      // 此项移至新分组数据
      moveToGroupData: {
        dialogMoveToGroup: false,
        name: '',
        targetData: {},
        data: [],
        targetRegion: {}
      },
      file: '',
      searchinp: '',
      analogData: []
      // analogData: [
      //   {
      //     'id': 'HR181026154821313167360',
      //     'label': 'Haier',
      //     'pid': '0',
      //     'level': '1',
      //     'children': [
      //       {
      //         'id': 'HR181228124884002799616',
      //         'label': '中国',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2',
      //         'children': [
      //           {
      //             'id': 'HR181228124884011188228',
      //             'label': '毛线',
      //             'enname': 'maoxian'
      //           },
      //           {
      //             'id': 'HR181228124884013285376',
      //             'label': '细线',
      //             'enname': 'xixian'
      //           },
      //           {
      //             'id': 'HR181228124884013285377',
      //             'label': '粗线',
      //             'enname': 'cuxian'
      //           },
      //           {
      //             'id': 'HR181228124884013285378',
      //             'label': '红线',
      //             'enname': 'hongxian'
      //           }
      //         ]
      //       },
      //       {
      //         'id': 'HR181228124884006993920',
      //         'label': '印度',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884006993921',
      //         'label': '俄罗斯',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884009091072',
      //         'label': 'GEA',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884009091073',
      //         'label': 'MABE',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884009091074',
      //         'label': 'FPA',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884009091075',
      //         'label': '泰国',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884009091076',
      //         'label': '印尼',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884011188224',
      //         'label': '越南',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       },
      //       {
      //         'id': 'HR181228124884011188225',
      //         'label': '巴基斯坦',
      //         'pid': 'HR181026154821313167360',
      //         'level': '2'
      //       }
      //     ]
      //   }
      // ]

    }
  },
  computed: {
    ...mapGetters({ userCode: 'userCode' })
  },
  watch: {
    // 搜索监听
    searchinp(val) {
      this.mohu()
    },
    // 区域变化监听
    targetRegion(val) {
      this.form.targetRegion = val
      this.form2.targetRegion = val
      this.addToGroupData.targetRegion = val
      this.moveToGroupData.targetRegion = val
      // console.log('region', val)
    }

  },
  mounted() {
    // 初始化树
    this.refTree()
  },
  methods: {
    mohu() {
      this.$refs.tree.filter(this.searchinp)
    },
    tree(arr) {
      while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
      }
      return arr
    },
    refTree1(data) {
      // this.upOrFalse = false
      this.refTree()
      this.openTree = [data.id]
      // console.log(2333, [data])
    },
    // 初始化树
    refTree() {
      // this.$refs.tree.defaultExpandAll = true
      // console.log(this.upOrFalse, typeof this.$refs.tree.$el, this.$refs.tree)
      this.loading = true
      initTree({}).then(res => {
        this.loading1.count = res.resultData.count
        this.analogData = res.resultData.templateClassList
        this.loading = false
        this.$nextTick(() => {
          this.mohu()
        })
        // console.log('refTree', res.resultData)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 搜索框过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 拖拽后事件
    nodeDragEnd(draggingNode, dropNode, type, ev) {
      console.log('tree drag end: ', draggingNode, dropNode, type, ev)
      var data = {
        templateClassId: dropNode.data.id, // 父级模板分类id,必填
        categoryId: draggingNode.data.id // 模板分类id 必填
      }
      updateCategoryClass(data).then(res => {
        // console.log(res)
        if (res.success) {
          this.$message({
            message: '移入成功',
            type: 'success'
          })
          // this.upOrFalse = false
          this.openTree = [data.templateClassId]
          this.refTree()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消拖入
    allowDrop(draggingNode, dropNode, type) {
      var region1 = this.findRegion(draggingNode)
      var region2 = this.findRegion(dropNode)
      // 移动品类所在的区域
      this.regioningId = region1.data.id
      if (region2) {
        // 移入区域
        this.regionedId = region2.data.id
      } else {
        this.regionedId = ''
      }
      // console.log(this.regioningId, this.regionedId, draggingNode.level, dropNode.data.id, type)
      if (dropNode.parent === null || dropNode.parent.parent === null) { // 顶级分类不能拖入
        // console.log(dropNode.parent.parent)
        return type !== 'inner' && type !== 'prev' && type !== 'next'
      } else if (this.regioningId !== this.regionedId) { // 不同区域，不能拖入
        // console.log(dropNode.data.id, this.regionId)
        return type !== 'inner' && type !== 'prev' && type !== 'next'
      } else if (typeof dropNode.data.pid !== 'string') { // 没有pid的是模版，不能添加子模版
        return type !== 'inner' && type !== 'prev' && type !== 'next'
      } else { // 取消文件前后拖拽放入，只留放入文件中
        return type !== 'prev' && type !== 'next'
      }
    },
    // 取消拖动
    allowDrag(draggingNode) {
      // console.log(draggingNode)
      if (typeof draggingNode.data.pid === 'string' || draggingNode.data.children instanceof Array) { // 顶级分类不能拖动，第一级也不能拖动
        // console.log('1', draggingNode.parent.parent, draggingNode)
        return false
      } else {
        // console.log('2', draggingNode)
        return true
      }
      // return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    // 右键菜单判断显示哪个
    rightClickMenu(event, data, node, sel) {
      // debugger
      this.mypagestyle.left = event.clientX + 2 + 'px'
      // event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
      if (typeof data.pid !== 'string' && !(data.children instanceof Array) && (node.parent.parent !== null && node.parent.parent.parent !== null)) {
        this.targetData.node = node
        this.targetData.data = data
        this.targetRegion = this.findRegion(node)
        // console.log('右键菜单event,data,node,this.targetData', event, data, node, this.targetData)
        this.addModel(event, data, node, sel)
      } else {
        return false
      }
      // console.log(event, data, node, sel)
    },
    // 点击加号（+）添加分类菜单
    addKind(event, node, data) {
      this.targetData.node = node
      this.targetData.data = data
      this.form.targetData = this.targetData
      this.form2.targetData = this.targetData
      this.targetRegion = this.findRegion(node)
      // console.log(node)
      this.mypagestyle.left = event.clientX + 2 + 'px'
      this.$refs.contextMenu.style.top = event.clientY + 'px'
      event.stopPropagation()
      if (!node.parent.parent.label) {
        // 区域菜单显示
        // this.file = node.label
        this.file = 'region'
        this.form.name = node.label
        this.form2.name = node.label
      } else {
        // 分类菜单显示
        this.file = 'other'
        this.form.name = node.label
        this.form2.name = node.label
        // this.addToGroupData.name = '添加类到分组‘' + node.label + '’'
        this.addToGroupData.name = node.label
      }
      // console.log(2333, event, node, data, this.$refs.contextMenu)
    },
    fileFalse() {
      this.file = ''
    },
    // 添加模版菜单
    addModel(event, data, node, sel) {
      // this.targetData.node = node
      // this.targetData.data = data
      // console.log(node, data, data.children instanceof Array, typeof (data.children))
      this.$refs.contextMenu.style.top = event.clientY + 'px'
      // this.$refs.contextMenu.style.left = '224px'
      event.stopPropagation()
      if (typeof data.pid !== 'string') {
        // 模版菜单显示
        this.file = 'model'
        // this.moveToGroupData.name = '添加类到分组'
      }
    },
    // 跳转到新建模版菜单
    toNewModel() {
      var arr = this.findRegion(this.targetData.node)
      // console.log('arr', arr)
      // console.log('node', this.targetData.node)
      // templateClassId 品类id
      // region 区域id
      if (judgeUrl() !== '003') {
        this.$router.push({
          path: '/index2',
          query: {
            templateClassId: this.targetData.data.id,
            region: arr.data.id,
            // userCode: this.userCode,
            page: '1' // 1：新建，2：编辑
          }
        })
        // this.$router.push({
        //   name: 'Newlybuild',
        //   params: {
        //     templateClassId: this.targetData.data.id,
        //     region: arr.data.id,
        //     // userCode: this.userCode,
        //     page: '1'
        //   }
        // })
      } else {1
        this.$router.push({
          path: '/index2',
          query: {
            templateClassId: this.targetData.data.id,
            region: arr.data.id,
            // userCode: this.userCode,
            page: '1'
          }
        })
        // this.$router.push({
        //   name: 'Newlybuild',
        //   params: {
        //     templateClassId: this.targetData.data.id,
        //     region: arr.data.id,
        //     // userCode: this.userCode,
        //     page: '1'
        //   }
        // })
      }
    },
    // 新建分组
    addGroup() {
      // console.log(this.file)
      // 显示新建分组遮罩界面
      this.form.dialogFormVisible = true
    },
    // 显示添加类到分组
    addToGroupShow(data, node, sel) {
      this.addToGroupData.dialogAddGroup = true
      this.addToGroupData.targetData = this.targetData
      this.addToGroupData.data = JSON.parse(JSON.stringify(this.analogData))
      // console.log('添加到分组', this.addToGroupData)
    },
    // 重命名
    reName() {
      // 显示新建分组遮罩界面
      this.form2.dialogFormVisible = true
      // console.log('重命名')
    },
    // 获取点击组下的id
    findId(arr1, arr2) {
      var _this = this
      return arr1.forEach(function(item, index, array) {
        // console.log('item', item)
        if (typeof item.pid === 'string') {
          arr2.push(item.id)
          // console.log('item', item, arr2)
          return _this.findId(item.children, arr2)
        }
      })
    },
    // 删除
    deleteSel() {
      var params = { templateClassId: this.targetData.data.id }
      // 获取点击组下的id
      // var arr2 = []
      // arr2.push(this.targetData.node.data.id)
      // this.findId(this.targetData.node.data.children, arr2)
      // console.log('删除', this.targetData.node.data.children, arr2)
      templateClassDelete(params).then(res => {
        if (res.success) {
          this.$message({
            message: '分组删除成功',
            type: 'success'
          })
          // console.log('this.targetData', this.targetData)
          // this.upOrFalse = false
          this.openTree = [this.targetData.node.parent.data.id]
          this.refTree()
        } else if (res.success === false) {
          console.log('删除失败，分组不为空')
        }
      })
    },
    // 将此项移至分组
    toTheGroup() {
      this.moveToGroupData.dialogMoveToGroup = true
      this.moveToGroupData.targetData = this.targetData
      this.moveToGroupData.data = JSON.parse(JSON.stringify(this.analogData))
      // console.log('将此项移至分组', this.moveToGroupData)
    },
    // 左键显示某个品类下的模版
    showTemplate(data, node, sel) {
      if (!(data.children instanceof Array) && typeof data.pid !== 'string' && !(node.parent.parent !== null && node.parent.parent.parent === null)) {
        // console.log('左键显示某个品类下的模版', data, node, sel)
        // 请求接口 params:templateId	模板id	String	必填
        this.$emit('targetData', data, data.id)
      }
    },
    // 查找区域
    findRegion(node) {
      if (node.level >= 2) {
        var arr = node
        while (arr.parent.parent.parent !== null) {
          arr = arr.parent
        }
        // console.log('arr', arr)
        return arr
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.treeNav {
  position: relative;
  width: 100%;
  // height:100%;
  // border-right: 1px solid #d1d1d1;
  .tree-name {
    height: 54px;
    line-height: 54px;
    padding-left: 30px;
    color: #4a4a4a;
    font-size: 17px;
    font-weight:500;
    font-family:PingFangSC;
    .add-style{
      height: 54px;
      line-height: 54px;
      padding-right:21px;
    }
  }
  .add-style{
      cursor: pointer;
      float: right;
      font-weight: 700;
      padding-right:14px;
      position: relative;
  }
  .tree-search {
    height: 36px;
    line-height: 36px;
  }
  .tree-con {
    width: 100%;
    padding-top: 30px;
    .custom-tree-node{
      width:100%;
    }
    .treeing{
      width:100% !important;
      padding:0 10px 10px;
    }
  }
  .contextMenu{
    position: absolute;
    // left:15.56%;
    ul{
      cursor:pointer;
      width:180px;
      border:0.5px solid #ccc;
      font-size:16px;
      background:#fff !important;
      li{
        height:42px;
        line-height: 42px;
        border-bottom:1px solid #ccc;
        list-style: none;
        i{
          padding-left: 10px;
          padding-right: 10px;
        }
      }
      li:hover{
        background-color: #007CFF;
        color:#fff
      }
    }
  }
}
</style>
<style lang='scss'>
// .model-tree .el-scrollbar__wrap {
//     overflow-x: hidden;
//     overflow-y: scroll;
//     height: 100%;
// }
.treeNav {
  // overflow;
  // height:100%;
  .tree-search {
    .el-input {
      .el-input__inner {
        border-radius: 0;
        border-color: #d1d1d1;
        border-right: 0;
      }
    }
  }
  .tree-con{
    .el-tree-node__content{
      height:40px
    }
    .treeing .is-current{
      background: #fff;
      color:#606266;
    }
    span {
      display: inline;
    }
  }
}
</style>
