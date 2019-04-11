/*
 * @Page: 字段库 --> 左侧树
 * @Author: csg
 * @Date: 2018-11
 * @Last Modified by: csg
 */
<template>
  <div>
    <div class="contextBOX">
      <div class="left">
        <div class="fieldConut">
          <span class="fieldLibrary">{{ $t('fieldInTheLibrary.title') }}</span>(
          <span class="sum" @click="handleAllField">{{ total }}</span>
          )
          <!-- header + popover -->
          <div style="float: right;">
            <el-popover v-model="childObj.visible" placement="right" width="180" trigger="manual">
              <p class="FIELD" @click="handleNewField">
                <i class="fa fa-file-text" style="margin-right: 10px; font-size: 18px;"/>
                {{ $t('fieldInTheLibrary.newField') }}
              </p>
              <p class="FIELD" @click="handleNewGroup">
                <i class="fa fa-folder" style="margin-right: 10px; font-size: 18px;"/>
                {{ $t('fieldInTheLibrary.newGroup') }}
              </p>
              <i slot="reference" class="el-icon-plus add" @click.stop="headerAdd"/>
            </el-popover>
          </div>
          <!-- 新建字段 弹窗 -->
          <el-dialog
            :visible.sync="childObj.dialogVisible"
            :before-close="handleClose"
            :title="$t('fieldInTheLibrary.newField')"
            width="30%"
          >
            <div class="treeHeader" style="overflow: hidden;">
              <span
                style="margin-right: 10px; font-weight: 500;"
              >{{ $t('fieldInTheLibrary.fieldName') }}</span>
              <el-input
                v-model="FieName"
                :placeholder="$t('fieldInTheLibrary.pleaseEnterTheContent')"
                class="dialogHeaherInput"
              />
            </div>
            <div class="fieldConBox">
              <div class="fieldCon" style="margin-top: 20px;">
                <el-input
                  v-model="dialogNewfield"
                  :placeholder="$t('fieldInTheLibrary.pleaseEnterTheSearchName')"
                  class="dialogNewfield"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search"/>
                </el-input>
                <div class="TREE Field">
                  <el-tree
                    ref="newField"
                    :data="childObj.setTree"
                    :props="childObj.defaultProps"
                    :filter-node-method="filterSearch"
                    class="filter-tree"
                    @node-click="handleNodeClick"
                  >
                    <span slot-scope="{ node, data }" :title="node.label" class="slot-t-node">
                      <span
                        :class="[data.id > childObj.maxexpandId ? 'slot-t-node--label' : 'node']"
                      >
                        <i :class="[ data.group === '0' ? 'fa fa-file-text' : 'fa fa-folder']"/>
                        {{ node.label }}
                      </span>
                    </span>
                  </el-tree>
                </div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="handleDialogVisible(treeNode, treeData)"
              >{{ $t('buttonGroup.confirm') }}</el-button>
              <el-button @click="childObj.dialogVisible = false">{{ $t('buttonGroup.cancel') }}</el-button>
            </span>
          </el-dialog>
          <!-- 新建组弹窗 -->
          <el-dialog
            :visible.sync="childObj.dialogNewGroup"
            :before-close="handleClose"
            :title="$t('fieldInTheLibrary.newGroup')"
            width="30%"
          >
            <div class="fieldConBox">
              <div class="treeHeaderGroup" style="overflow: hidden;">
                <span
                  style="margin-right: 10px; font-weight: 500;"
                >{{ $t('fieldInTheLibrary.newGroupName') }}</span>
                <el-input
                  v-model="newGroupName"
                  :placeholder="$t('fieldInTheLibrary.pleaseEnterTheContent')"
                  class="dialogHeaherInput"
                />
              </div>
              <div class="TREE groupTree">
                <el-tree
                  ref="newGroup"
                  :data="childObj.setTree"
                  :props="childObj.defaultProps"
                  class="filter-tree"
                  @node-click="handleNodeClick"
                >
                  <span slot-scope="{ node, data }" :title="node.label" class="slot-t-node">
                    <span :class="[data.id > childObj.maxexpandId ? 'slot-t-node--label' : 'node']">
                      <i :class="[ data.group === '0' ? 'fa fa-file-text' : 'fa fa-folder']"/>
                      {{ node.label }}
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="handleAddTop(treeNode, treeData)"
              >{{ $t('buttonGroup.confirm') }}</el-button>
              <el-button @click="childObj.dialogNewGroup = false">{{ $t('buttonGroup.cancel') }}</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="search">
          <el-input v-model="childObj.search" :placeholder="$t('fieldInTheLibrary.search')">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="handleSearch"/>
          </el-input>
        </div>
        <div class="Tree">
          <Tree :to-child="childObj" @listenToChild="getChildMsg" @regainGetData="getData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/fieldTree/tree'
import api from '@/api/resource'
import Eventbus from '@/bus.js'
import { fieldClassAdd, searchFieldList, FieldAdd, list } from '@/api/field'
export default {
  components: {
    Tree
  },
  data() {
    return {
      // 字段总数据
      total: 0,
      // tree group 弹窗
      treeGroup: false,
      // 新建字段名称
      FieName: '',
      // model 新建组
      newGroupName: '',
      // 顶部弹窗新建字段
      dialogNewfield: '',
      treeNode: {},
      treeData: {},
      // 传到子组件的内容
      childObj: {
        // 新建字段弹窗
        dialogVisible: false,
        // 新建组 弹窗
        dialogNewGroup: false,
        // 字节点 弹窗
        nodeVisible: false,
        // popover 弹出窗
        visible: false,
        // 给子组建的popover
        childPopBool: false,
        // PopBool: false,
        // 新增节点开始id
        maxexpandId: api.maxexpandId,
        // 新增节点开始id(不更改)
        non_maxexpandId: api.maxexpandId,
        // 节点树数据
        setTree: [],
        defaultProps: {
          children: 'childFieldClassList',
          label: 'name'
        },
        search: '' // 搜索
      }
    }
  },
  watch: {
    // 新建字段 字段搜索
    dialogNewfield(val) {
      this.$refs.newField.filter(val)
    }
    // // 新建组 字段搜索
    // newGroupName(val) {
    //   this.$refs.newGroup.filter(val)
    // }
  },
  created() {
  },
  mounted() {
    const _this = this
    document.addEventListener('click', () => {
      _this.childObj.childPopBool = false
      // _this.childObj.PopBool = false
      _this.childObj.visible = false
      _this.childObj.nodeVisible = false
    })
    // 渲染树的 data
    this.getTree()
    this.getData()
    // 事件总线
    // this.getBus()
  },
  methods: {
    // 获取字段总数
    getData() {
      // const url = 'http://47.104.98.71:8680/costmanagement/field/list'
      const params = { pageSize: 10, pageNo: 1 }
      // this.$axios.get(url, { params })
      //   .then((res) => {
      //     console.log('字段信息请求成功', res)
      //     this.total = res.data.resultData.count // 需要修改
      //     console.log('res.data.resultData.count', this.total)
      //     console.log('this.fieldData', this.fieldData)
      //   })
      //   .catch((res) => { console.log('字段信息请求失败') })
      list(params).then(res => {
        console.log('字段信息请求成功', res)
        this.total = res.resultData.count // 需要修改
        console.log('res.resultData.count', this.total)
        console.log('this.fieldData', this.fieldData)
      }).catch(res => {
        console.log('字段信息请求失败')
      })
    },
    // bus事件接收数据
    // getBus() {
    //   // 获取字段总数
    //   Eventbus.$on('total', (total) => {
    //     this.$nextTick(() => {
    //       this.total = total
    //       console.log('total', this.total)
    //     })
    //   })
    // },
    // tree 数据
    getTree() {
      searchFieldList().then(res => {
        console.log('接口树的data', res)
        this.childObj.setTree = res.resultData
      }).catch(err => {
        console.log(err)
      })
    },
    // 子组件 传来的数据
    getChildMsg(childData) {
      console.log('子组件传过来的数据', childData)
      this.childObj.visible = childData.dialog
    },
    // 字段库字段信息列表
    handleAllField() {
      // this.$store.dispatch('FieldShowHide', true)
      this.$router.push({
        path: '/field/index'
      })
    },
    // 顶部加号
    headerAdd() {
      // this.$emit()
      this.childObj.visible = true
      this.childObj.childPopBool = false
      this.childObj.nodeVisible = false
      this.treeNode = {}
      this.FieName = ''
      // this.newGroupName = ''
    },
    // 点击tree 节点
    handleNodeClick(node, data) {
      console.log('node', node)
      console.log('data', data)
      this.treeNode = node
      this.treeData = data
    },
    // 新建字段
    handleNewField(value, data) {
      console.log('新建字段！')
      this.childObj.visible = false
      this.childObj.dialogVisible = true
    },
    // 新建字段 新建组 字段搜索
    filterSearch(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 新建字段 弹窗确定按钮
    handleDialogVisible(treeNode, treeData) {
      console.log('新建字段treeNode', treeNode)
      console.log('新建字段this.treeNode', this.treeNode)
      var newArr = []
      if (treeNode.childFieldClassList !== undefined) {
        treeNode.childFieldClassList.map((item, index) => {
          if (item.group === '0') {
            newArr.push(item.group)
          }
        })
      }
      // 请求接口
      const FielAddParam = {
        fieldClassId: this.treeNode.fieldClassId,
        name: this.FieName,
        state: '',
        type: '',
        way: '',
        message: '',
        logicalAccess: '',
        formulaMode: ''
      }
      if (treeNode.childFieldClassList !== undefined) {
        // if (newArr.length === treeNode.childFieldClassList.length) {
        FieldAdd(FielAddParam).then(res => {
          console.log('FielAddParam', FielAddParam)
          this.getTree()
          // this.getBus()
          this.getData()
          Eventbus.$emit('total', this.total)
          // 树的展开闭合
          var arr = []
          arr.push(this.treeNode.fieldClassId)
          Eventbus.$emit('TreeSwitch', arr)
          console.log('添加成功', res)
          this.$message({
            message: '添加字段成功',
            type: 'success'
          })
          // this.childObj.dialogVisible = false
        }).catch(res => {
          console.log('添加失败1')
          this.$message.error('添加字段失败!')
        })
        this.childObj.dialogVisible = false
        // } else {
        //   this.$message.error('组下存在组，不能添加字段!')
        // }
      } else {
        // if (this.childObj.setTree.length === 0) {
        //   this.$message.error('请先新建组')
        // } else {
        //   this.$message.error('请选择组')
        // }
        FieldAdd(FielAddParam).then(res => {
          console.log('FielAddParam', FielAddParam)
          this.getTree()
          // this.getBus()
          this.getData()
          Eventbus.$emit('total', this.total)
          console.log('添加成功', res)
          this.childObj.dialogVisible = false
          // 树的展开闭合
          var arr = []
          arr.push(this.treeNode.fieldClassId)
          Eventbus.$emit('TreeSwitch', arr)
          this.$message({
            message: '添加字段成功',
            type: 'success'
          })
        }).catch(res => {
          console.log('添加失败2')
          this.$message.error('添加字段失败!')
        })
      }
    },
    // 新建组
    handleNewGroup() {
      console.log('新建组！')
      this.childObj.visible = false
      this.childObj.dialogNewGroup = true
      console.log('this.childObj.newGroupName', this.childObj.newGroupName)
      this.childObj.newGroupName = ''
      this.newGroupName = ''
    },
    // 新建组  弹窗确定按钮
    handleAddTop(treeNode, treeData) {
      console.log('新建组treeNode', treeNode)
      console.log('新建组this.treeNode', this.treeNode)
      var newArr = []
      if (treeNode.childFieldClassList !== undefined) {
        console.log('treeNode.childFieldClassList', treeNode.childFieldClassList)
        treeNode.childFieldClassList.map((item, index) => {
          if (item.group === '1') {
            newArr.push(item.group)
          }
        })
      }
      // console.log('treeData.childFieldClassList', treeData.childFieldClassList)
      // if (treeData.childFieldClassList !== undefined) {
      //   treeData.childFieldClassList.map((item, index) => {
      //     if (item.group === '1') {
      //       newArr.push(item.group)
      //     }
      //   })
      // }
      console.log('this.treeNode.fieldClassId', this.treeNode.fieldClassId)
      const fieldAdd = {
        pFieldClassId: this.treeNode.fieldClassId,
        name: this.newGroupName,
        code: ''
      }
      const fieldAdd2 = {
        // pFieldClassId: '',
        name: this.newGroupName,
        code: ''
      }
      console.log('treeNode.childFieldClassList', treeNode.childFieldClassList)
      // console.log('treeNode.childFieldClassList.length', treeNode.childFieldClassList.length)
      if (treeNode.childFieldClassList !== undefined) {
        if (newArr.length === treeNode.childFieldClassList.length) {
          fieldClassAdd(fieldAdd).then(res => {
            this.getTree()
            // this.getBus()
            this.getData()
            Eventbus.$emit('total', this.total)
            this.$message({
              message: res.resultData,
              type: 'success'
            })
            // this.reload()
          })
        } else {
          this.$message.error('组下存在字段，不能添加组!')
        }
      } else {
        fieldClassAdd(fieldAdd2).then(res => {
          this.getTree()
          // this.getBus()
          this.getData()
          Eventbus.$emit('total', this.total)
          this.$message({
            message: res.resultData,
            type: 'success'
          })
          // this.reload()
          this.childObj.dialogNewGroup = false
        })
      }
      this.childObj.dialogNewGroup = false
      // if (JSON.stringify(treeNode) === '{}') {
      //   this.childObj.setTree.push({
      //     id: ++this.childObj.maxexpandId,
      //     label: this.FieName,
      //     pid: '',
      //     Group: 1,
      //     isEdit: false,
      //     children: []
      //   })
      // } else {
      //   treeNode.children.push({
      //     id: ++this.childObj.maxexpandId,
      //     label: this.FieName,
      //     pid: '',
      //     Group: 1,
      //     isEdit: false,
      //     children: []
      //   })
      // }
    },
    // 搜索icon按钮
    handleSearch() {
      console.log('搜索！')
    },
    // 弹窗关闭按钮dialog
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style scoped>
/* .contextBOX {
  overflow: hidden;
} */
.contextBOX .left {
  background: rgba(255, 255, 255, 1);
  border-top: 0;
}
/* 字段库总数 */
.contextBOX .left .fieldConut {
  width: 100%;
  border-bottom: 1px solid rgba(209, 209, 209, 1);
  text-align: center;
  font-weight: 600;
  padding: 20px 0;
}
.contextBOX .left .fieldConut .add {
  float: right;
  margin-right: 29px;
  color: #333333;
  font-weight: 600;
}
.contextBOX .left .fieldConut .add:hover {
  cursor: pointer;
}
.contextBOX .left .fieldConut .sum {
  color: #007cff;
}
.contextBOX .left .fieldConut .sum:hover {
  cursor: pointer;
}
/* 树形 */
.contextBOX .left .Tree {
  padding: 30px 20px;
}
.contextBOX .left .Tree .custom-tree-node .Con {
  font-size: 14px;
  color: #333333;
}
.contextBOX .left .Tree .el-tree-node__children .custom-tree-node .Con {
  font-size: 13px;
  color: #333333;
}
.contextBOX .left .Tree .custom-tree-node .Con .fa {
  padding-right: 6px;
}
.contextBOX .left .Tree .custom-tree-node .Con .fa.fa-folder {
  font-size: 16px;
}
.contextBOX .left .Tree .custom-tree-node .Con .fa.fa-file-o {
  font-size: 12px;
}
/* @media screen and (max-width: 1440px) {
} */
/* popover弹出框 */
.FIELD {
  font-size: 16px;
  padding: 10px;
}
.FIELD:hover {
  background: #007cff;
  color: #ffffff;
  cursor: pointer;
}
.NEWFIELD {
  display: none;
}
/* 新建字段 */
.fieldConBox {
  padding: 0 6%;
}
.fieldConBox .fieldCon {
  border: 1px solid rgba(151, 151, 151, 1);
  text-align: left;
}
.fieldConBox .TREE {
  min-height: 200px;
  font-weight: 500;
  padding: 10px;
  text-align: left;
  max-height: 420px;
  overflow-y: auto;
}
.groupTree {
  border: 1px solid rgba(151, 151, 151, 1);
  margin-top: 20px;
}
</style>
<style>
/* 搜索 */
.contextBOX .left .search {
  overflow: hidden;
  border-bottom: 1px solid rgba(209, 209, 209, 1);
}
.contextBOX .left .search .el-input__prefix {
  color: #333333;
  font-size: 16px;
  margin-left: 20px;
}
.contextBOX .left .search .el-input__icon {
  font-weight: 600;
}
.contextBOX .left .search .el-input__prefix:hover {
  cursor: pointer;
}
.contextBOX .left .search .el-input__inner {
  border: 0;
  text-indent: 24px;
}
/* popover弹出框 */
.el-popover {
  padding: 0;
}
/* dialog 弹窗 */
.contextBOX .el-dialog__header {
  padding: 0;
  height: 36px;
  text-align: left;
  background: -webkit-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(360deg, #1990ea, #2ea1f8);
  /* 标准的语法 */
}
.contextBOX .el-dialog__title {
  font-size: 16px;
}
.contextBOX .el-dialog__header .el-dialog__title {
  float: left;
  line-height: 36px;
  margin-left: 22px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}
.contextBOX .treeHeader .dialogHeaherInput {
  width: 75% !important;
}
.contextBOX .treeHeaderGroup .dialogHeaherInput {
  width: 82% !important;
}
.contextBOX .el-dialog__footer {
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border-radius: 0px 0px 4px 4px;
  border: 1px solid rgba(242, 242, 242, 1);
  border-bottom: 0;
  padding: 10px 20px;
}
.contextBOX .el-dialog__headerbtn {
  top: 10px;
}
.contextBOX .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
.contextBOX .fieldConBox .el-input--prefix .el-input__inner {
  border: 0;
  border-bottom: 1px solid #979797;
  border-radius: 0;
}
.contextBOX .fieldConBox .el-input__icon.el-icon-search {
  color: #666666;
  font-weight: 600;
}
.el-icon-search:hover {
  cursor: pointer;
}
.fieldConBox .TREE .fa-folder {
  font-size: 16px;
}
.fieldConBox .TREE .el-tree-node__children {
  font-size: 13px;
}
/*滚动条整体样式 高宽分别对应横竖滚动条的尺寸*/
.fieldConBox .TREE::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/*滚动条里面小方块*/
.fieldConBox .TREE::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
/*滚动条里面轨道*/
.fieldConBox .TREE::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
/* .fieldConBox .TREE .el-tree-node__children {
  display: none;
} */
.contextBOX .left .Tree {
  overflow: auto;
  height: 732px;
}
/*滚动条整体样式 高宽分别对应横竖滚动条的尺寸*/
.contextBOX .left .Tree::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/*滚动条里面小方块*/
.contextBOX .left .Tree::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
/*滚动条里面轨道*/
.contextBOX .left .Tree::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.contextBOX .fa.fa-folder {
  color: #f8ae3f;
  font-size: 16px;
}
.contextBOX .fa.fa-file-text {
  color: #4e86c7;
}
.FIELD .fa.fa-folder {
  color: #f8ae3f;
  font-size: 16px;
}
.FIELD .fa.fa-file-text {
  color: #4e86c7;
}
.FIELD:hover .fa.fa-file-text {
  color: #ffffff;
}
</style>
