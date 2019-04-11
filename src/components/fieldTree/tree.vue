/*
 * @Page: 字段库树形图组件
 * @Author: csg
 * @Date: 2018-12
 * @Last Modified by: csg
 */
<template>
  <div class="slot-tree">
    <!--
    * highlight-current ：为了点击时节点高亮
    * expand-on-click-node : 只能箭头控制树形的展开收缩
    * render-content : 节点渲染方式
    * default-expanded-keys ：默认展开节点
    :allow-drag="allowDrag" ：禁止拖拽
    * default-expand-all : 全展开
    :default-expanded-keys="fieldsOn"
    default-expand-all
    -->
    <el-tree
      v-if="isLoadingTree"
      ref="SlotMenuList"
      :data="toChild.setTree"
      :props="toChild.defaultProps"
      :filter-node-method="filterNode"
      :allow-drop="allowDrop"
      :default-expanded-keys="fieldsOn"
      node-key="fieldClassId"
      class="expand-tree"
      draggable
      @node-drag-end="handleDragEnd"
      @node-click="handleNodeClick"
      @node-contextmenu="handleContextmenu"
    >
      <!--  -->
      <span slot-scope="{ node, data }" :title="node.label" class="slot-t-node">
        <!-- 未编辑状态 -->
        <span v-show="!node.isEdit" style="width: 100%;">
          <span
            :class="[data.id > toChild.maxexpandId ? 'slot-t-node--label' : 'node']"
            style="overflow: hidden; display: inline-block;"
          >
            <i :class="[ data.group === '0' ? 'fa fa-file-text' : 'fa fa-folder']"/>
            {{ node.label }}
          </span>
          <span class="slot-t-icons">
            <!-- 新增按钮 -->
            <span
              v-if="data.group !== '1' ? false : true"
              @click.stop="handleGroupShow(node, data, $event)"
            >
              <i class="el-icon-plus"/>
            </span>
          </span>
        </span>
        <!-- 编辑输入框 -->
        <span v-show="node.isEdit">
          <el-input
            v-model="data.label"
            :ref="'slotTreeInput'+data.id"
            class="slot-t-input"
            size="mini"
            autofocus
            @blur.stop="NodeBlur(node, data)"
            @keyup.enter.native="NodeBlur(node, data)"
          />
        </span>
      </span>
    </el-tree>
    <!-- 添加字段到组 弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleAddToGroup"
      :title=" $t('fieldInTheLibrary.addFieldsTo') + ' ‘ ' + AddToGroupTitle + ' ’ ' + $t('fieldInTheLibrary.group')"
      width="540px"
    >
      <div class="fieldConBox">
        <div class="fieldCon">
          <div class="TREE">
            <div class="left">
              <el-input :placeholder="$t('fieldInTheLibrary.pleaseEnterTheContent')">
                <i slot="prefix" class="el-input__icon el-icon-search"/>
              </el-input>
              <!-- 左侧展示列表 -->
              <el-tree
                ref="tree"
                :data="toChild.setTree"
                :props="toChild.defaultProps"
                show-checkbox
              />
            </div>
            <div class="right">右</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisibleAddToGroup = false"
        >{{ $t('buttonGroup.confirm') }}</el-button>
        <el-button @click="dialogVisibleAddToGroup = false">{{ $t('buttonGroup.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!-- 新建字段 弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleNewField"
      :title=" $t('fieldInTheLibrary.be') + ' ‘ ' + NewFieldTitle + ' ’ ' + $t('fieldInTheLibrary.beNewField')"
      width="540px"
    >
      <div class="fieldConBox">
        <div class="fieldCon fieldTree">
          <span
            style="margin-right: 10px; font-weight: 500;"
          >{{ $t('fieldInTheLibrary.fieldName') }}</span>
          <el-input
            v-model="newFieldName"
            :placeholder="$t('fieldInTheLibrary.pleaseEnterTheContent')"
            class="dialogHeaherInput"
            style="width: 80%;"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="theNewFieldSure(treeNewNode, treeNewData)"
        >{{ $t('buttonGroup.confirm') }}</el-button>
        <el-button @click="dialogVisibleNewField = false">{{ $t('buttonGroup.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!-- 新建组 弹窗 -->
    <el-dialog
      :visible.sync="dialogNewGroup"
      :title="$t('fieldInTheLibrary.be') + ' ‘ ' + newGroupTitle + ' ’ ' + $t('fieldInTheLibrary.beNewGroup')"
      width="540px"
    >
      <div class="fieldConBox fieldTree">
        <span
          style="margin-right: 10px; font-weight: 500;"
        >{{ $t('fieldInTheLibrary.newGroupName') }}</span>
        <el-input
          v-model="newGroupName"
          :placeholder="$t('fieldInTheLibrary.pleaseEnterTheContent')"
          class="dialogHeaherInput"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="newGroupSure(treeNewNode, treeNewData)"
        >{{ $t('buttonGroup.confirm') }}</el-button>
        <el-button @click="dialogNewGroup = false">{{ $t('buttonGroup.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!-- 重命名 弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleReName"
      :title="$t('fieldInTheLibrary.for') + ' ‘' + newReNameTitle + ' ’ ' + $t('buttonGroup.rename')"
      width="540px"
    >
      <div class="fieldConBox">
        <div class="fieldCon fieldTree">
          <span
            style="margin-right: 10px; font-weight: 500;"
          >{{ $t('fieldInTheLibrary.renameField') }}</span>
          <el-input
            v-model="newReName"
            :placeholder="$t('fieldInTheLibrary.pleaseEnterTheContent')"
            class="dialogHeaherInput"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="ReNameSure(treeNewNode, treeNewData)"
        >{{ $t('buttonGroup.confirm') }}</el-button>
        <el-button @click="dialogVisibleReName = false">{{ $t('buttonGroup.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!-- 字节点编辑弹窗 -->
    <el-popover
      id="NODE"
      v-model="toChild.nodeVisible"
      placement="bottom"
      trigger="manual"
      style="position: absolute"
    >
      <!-- 重命名 -->
      <p class="FIELD" @click="Rename(node, data)">
        <i class="el-icon-edit" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('buttonGroup.rename') }}
      </p>
      <!-- 删除 -->
      <p class="FIELD" @click="fieldDelete(node, data)">
        <i class="fa fa-trash-o" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('buttonGroup.delete') }}
      </p>
    </el-popover>
    <!-- tree 左边popover -->
    <el-popover
      id="FieldPop"
      v-model="toChild.childPopBool"
      placement="right"
      width="180"
      trigger="manual"
    >
      <!-- 添加字段到组 -->
      <!-- <p class="FIELD" @click="AddFieldsToGroups(resNode, resData)">
        <i class="fa fa-check-square-o" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('fieldInTheLibrary.addFieldsToGroups') }}
      </p>-->
      <!-- 新建字段 -->
      <p class="FIELD" @click="theNewField(resNode, resData)">
        <i class="fa fa-file-text" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('fieldInTheLibrary.newField') }}
      </p>
      <!-- 新建组 -->
      <p
        class="FIELD"
        style="border-top:1px solid rgba(204,204,204,1);border-bottom:1px solid rgba(204,204,204,1);"
        @click="newDatacenter(resNode, resData)"
      >
        <i class="fa fa-folder" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('fieldInTheLibrary.newGroup') }}
      </p>
      <!-- 重命名 -->
      <p class="FIELD" @click="Rename(resNode, resData)">
        <i class="el-icon-edit" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('buttonGroup.rename') }}
      </p>
      <!-- 删除 -->
      <p class="FIELD" @click="fieldClassDelete(resNode, resData)">
        <i class="fa fa-trash-o" style="margin-right: 10px; font-size: 18px;"/>
        {{ $t('buttonGroup.delete') }}
      </p>
    </el-popover>
    <!-- 蒙版popover -->
    <!-- <div
      v-show="toChild.PopBool"
      style=" width: 100%; height: 100%;position: fixed;top:0;right: 0;bottom: 0;left: 0;overflow: auto;margin: 0;z-index:1000"
    />-->
  </div>
</template>

<script>
import Bus from '@/bus.js'
import Eventbus from '@/bus.js'
// 数据请求
import {
  fieldClassAdd,
  fieldClassUpdate,
  FieldDelete,
  FieldAdd,
  searchFieldList,
  fieldClassDelete,
  fieldUpdate
} from '@/api/field'
export default {
  name: 'Tree',
  // 注入reload方法
  inject: ['reload'],
  props: {
    toChild: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // indexGroup存符合的下标
      indexGroup: 0,
      node: {},
      data: {},
      isLoadingTree: true, // 是否加载节点树
      treeBool: false, // 右击事件判断
      visibles: null, // 记录popover显示隐藏
      dialogVisibleAddToGroup: false, // 添加字段到组弹窗
      AddToGroupTitle: '', // 添加字段到组标题
      dialogVisibleNewField: false, // 新建字段弹窗
      NewFieldTitle: '', // 新建字段标题
      newFieldName: '', // 新建的字段 v-model
      dialogNewGroup: false, // 新建组弹窗
      newGroupTitle: '', // 新建组标题
      newGroupName: '', // 新建组名称 v-model
      dialogVisibleReName: false, // 重命名弹窗
      newReName: '', // 重命名字段 v-model
      newReNameTitle: '', // 重命名标题
      treeNewNode: {}, // tree node节点数据 新建字段
      treeNewData: {}, // tree data 存储数据 新建字段
      resData: {},
      resNode: {},
      fieldsOn: [] // 展开的节点
    }
  },
  computed: {
    searchTree() {
      return this.toChild.search
    }
  },
  watch: {
    searchTree(val) {
      this.$refs.SlotMenuList.filter(val)
    }
  },
  mounted() {
    Bus.$on('TreeData', res => {
      this.toChild.setTree = res.data
      this.fieldsOn = res.list
    })
    Eventbus.$on('TreeSwitch', res => {
      this.fieldsOn = res
    })
    if (this.$route.query.fieldClassId) {
      this.fieldsOn = [this.$route.query.fieldClassId]
    }
  },
  methods: {
    // node 点击事件
    handleNodeClick(node, data) {
      console.log('点击node触发的', node, data)
      // 传给字段设置组件的数据
      // Bus.$emit('toFieldSetData', node)
      this.toChild.childPopBool = false
      this.toChild.nodeVisible = false
      // this.toChild.childPopBool = false
      if (node.group === '0') {
        // Bus.$emit('toFieldSetData', node)
        this.$router.push({
          path: '/field/fieldMsgList',
          query: node
        })
        console.log(node)
      }
    },
    // 添加字段到组
    AddFieldsToGroups(node, data) {
      console.log('node', node, 'data', data)
      this.toChild.childPopBool = false
      this.dialogVisibleAddToGroup = true
      this.AddToGroupTitle = data.name
    },
    // popover 新建字段
    theNewField(node, data) {
      this.toChild.childPopBool = false
      this.dialogVisibleNewField = true
      this.NewFieldTitle = data.name
      this.treeNewNode = node
      this.treeNewData = data
      // 树添加字段  清空
      this.newFieldName = ''
    },
    // 新建字段 弹窗确定按钮 完成
    theNewFieldSure(node, data) {
      this.dialogVisibleNewField = false
      var newArr = []
      data.childFieldClassList.map((item, index) => {
        if (item.group === '0') {
          newArr.push(item.group)
        }
      })
      const params = {
        fieldClassId: data.fieldClassId,
        name: this.newFieldName,
        state: data.code,
        type: '',
        way: '',
        message: ''
      }
      FieldAdd(params)
        .then(res => {
          var arr = []
          arr.push(data.fieldClassId)
          this.fieldsOn = arr
          this.getTreeData()
          // 重新获取字段
          this.$emit('regainGetData')
          Eventbus.$emit('total')
          this.$message({
            message: '新建成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // popover 新建组
    newDatacenter(node, data) {
      this.toChild.childPopBool = false
      this.dialogNewGroup = true
      this.newGroupTitle = data.name
      this.treeNewNode = node
      this.treeNewData = data
      // 树添加组  清空
      this.newGroupName = ''
    },
    // dialog 新建组确定按钮 完成
    newGroupSure(node, data) {
      this.dialogNewGroup = false
      // 新增数据
      var newArr = []
      data.childFieldClassList.map((item, index) => {
        if (item.group === '1') {
          newArr.push(item.group)
        }
      })
      const fieldAddObj = {
        pFieldClassId: data.fieldClassId,
        name: this.newGroupName
        // code: ''
      }
      fieldClassAdd(fieldAddObj).then(res => {
        console.log(res)
        var arr = []
        arr.push(data.fieldClassId)
        this.fieldsOn = arr
        this.getTreeData()
        this.$message({
          message: '新建成功',
          type: 'success'
        })
      })
    },
    // popover 重命名
    Rename(node, data) {
      console.log('字段重命名', data)
      this.toChild.childPopBool = false
      this.dialogVisibleReName = true
      this.newReName = data.name
      this.newReNameTitle = data.name
      this.treeNewNode = node
      this.treeNewData = data
    },
    // 重命名确定按钮 tree组的重命名 完成
    ReNameSure(node, data) {
      if (!data.childFieldClassList) {
        const params = {
          fieldId: data.fieldId,
          name: this.newReName
        }
        // 字段修改
        fieldUpdate(params)
          .then(res => {
            console.log(res)
            this.dialogVisibleReName = false
            var arr = []
            arr.push(data.fieldClassId)
            this.fieldsOn = arr
            this.getTreeData()
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const fieldUpdataObj = {
          fieldClassId: data.fieldClassId,
          pFieldClassId: data.pFieldClassId,
          name: this.newReName,
          code: data.code
        }
        // 字段分组修改
        fieldClassUpdate(fieldUpdataObj)
          .then(res => {
            console.log(res)
            this.dialogVisibleReName = false
            var arr = []
            arr.push(data.fieldClassId)
            this.fieldsOn = arr
            this.getTreeData()
            this.$message({
              type: 'success',
              message: res.resultData
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 删除组 完成
    fieldClassDelete(node, data) {
      console.log('字段删除组', node, data)
      this.toChild.childPopBool = false
      const params = {
        fieldClassId: data.fieldClassId
      }
      if (data.childFieldClassList && data.childFieldClassList.length !== 0) {
        this.$message.error('此节点有子级，先删除子级')
      } else {
        fieldClassDelete(params)
          .then(res => {
            this.getTreeData()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // popover 删除节点 字段删除 右击删除 完成
    fieldDelete(node, data) {
      this.toChild.childPopBool = []
      this.$emit('listenToChild', this.toChild)
      this.$set(this.toChild.childPopBool, node.id, false)
      console.log(node, data)
      // 有子级不删除
      if (data.childFieldClassList && data.childFieldClassList.length !== 0) {
        this.$message.error('此节点有子级，先删除子级')
      } else {
        const params = {
          fieldId: data.fieldId
        }
        FieldDelete(params)
          .then(res => {
            var arr = []
            arr.push(data.fieldClassId)
            this.fieldsOn = arr
            this.getTreeData()
            // 删除重新获取字段
            this.$emit('regainGetData')
            Eventbus.$emit('total')
            this.$router.push({ path: '/field/index' })
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 父级节点加号
    handleGroupShow(node, data, e) {
      // 点击的节点
      this.toChild.childPopBool = true
      this.toChild.nodeVisible = false
      // this.toChild.PopBool = true
      this.$emit('listenToChild', this.toChild)
      const FieldPop = document.getElementById('FieldPop')
      FieldPop.style.left = e.clientX / 2 + 'px'
      FieldPop.style.top = e.clientY / 1.5 + 'px'
      this.resData = data
      this.resNode = node
      console.log(node, data, this.visibles)
    },
    // node 右击事件
    handleContextmenu(event, data, node) {
      console.log('右击触发的', event, data, node)
      if (data.group === '0') {
        this.toChild.nodeVisible = true
      } else {
        this.toChild.nodeVisible = false
      }
      this.toChild.childPopBool = false
      this.$emit('listenToChild', this.toChild)
      const pop = document.getElementById('NODE')
      pop.style.left = event.clientX / 2 + 'px'
      pop.style.top = event.clientY / 1.5 + 'px'
      this.data = data
      this.node = node
    },
    // 输入框失焦
    NodeBlur(n, d) {
      console.log(n, d)
      this.$set(n, 'isEdit', false)
      this.$nextTick(() => {
        this.$refs['slotTreeInput' + d.id].$refs.input.focus()
      })
    },
    // 搜索事件
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 获取treeData
    getTreeData() {
      searchFieldList()
        .then(res => {
          console.log('接口树的dat111111111111111111a', res)
          this.toChild.setTree = res.resultData
        })
        .catch(res => {
          // console.log(err)
        })
    },
    // 拖拽结束后
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode, dropNode)
      // 字段拖动
      if (draggingNode.data.group === '0') {
        const params = {
          fieldId: draggingNode.data.fieldId,
          fieldClassId: dropNode.data.fieldClassId,
          name: draggingNode.data.name,
          state: draggingNode.data.state,
          type: draggingNode.data.type,
          way: draggingNode.data.way,
          message: draggingNode.data.message
        }
        // 字段发生父节点改变时
        if (draggingNode.data.fieldClassId !== dropNode.data.fieldClassId) {
          // 字段修改
          fieldUpdate(params)
            .then(res => {
              console.log(res)
              // this.dialogVisibleReName = false
              var arr = []
              arr.push(dropNode.data.fieldClassId)
              this.fieldsOn = arr
              this.getTreeData()
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
        // 整组拖动
      } else if (draggingNode.data.group === '1') {
        const params = {
          fieldClassId: draggingNode.data.fieldClassId,
          name: draggingNode.data.name,
          code: draggingNode.data.code
        }
        if (dropNode.data.fieldClassId) {
          params.pFieldClassId = dropNode.data.fieldClassId
        } else {
          params.pFieldClassId = ''
        }
        if (draggingNode.data.fieldClassId !== dropNode.data.fieldClassId) {
          fieldClassUpdate(params)
            .then(res => {
              console.log(res)
              var arr = []
              arr.push(dropNode.data.fieldClassId)
              this.fieldsOn = arr
              this.getTreeData()
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    // 禁止拖入
    allowDrop(draggingNode, dropNode, type) {
      // console.log('拖动的节点', draggingNode, '进入的节点', dropNode)
      if (dropNode.data.group === '0') {
        return type !== 'inner'
      } else {
        return true
      }
    }
    // 禁止拖拽
    // allowDrag(draggingNode) {
    //   console.log(111111111111111111111, draggingNode)
    //   return draggingNode.level !== 1
    // }
  }
}
</script>
<style scoped>
/* 添加字段到组 */
.fieldConBox .fieldCon {
  text-align: center;
}
.fieldConBox .fieldCon .TREE {
  width: 100%;
  height: 350px;
  border: 1px solid rgba(151, 151, 151, 1);
  display: inline-block;
}
/* 左边部分 */
.fieldConBox .fieldCon .TREE .left {
  width: 50%;
  float: left;
  height: 100%;
  border-right: 1px solid rgba(151, 151, 151, 1);
}
/* 右边部分 */
.fieldConBox .fieldCon .TREE .right {
  float: left;
  width: 50%;
  height: 100%;
}
</style>

<style>
/*顶部按钮*/
.slot-tree .slot-t-top {
  margin-bottom: 15px;
}
.slot-tree .slot-t-node span {
  display: inline-block;
}
/*节点*/
.slot-tree .slot-t-node--label {
  font-size: 14px;
}
/*输入框*/
.slot-tree .slot-t-input .el-input__inner {
  height: 26px;
  line-height: 26px;
}
/*按钮列表*/
.slot-tree .slot-t-node .slot-t-icons {
  display: inline-block;
  margin-left: 10px;
}
.el-tree-node__content .slot-t-node {
  width: 100%;
}

.el-tree-node__content .slot-t-node .slot-t-icons {
  float: right;
  padding-right: 10px;
}
/* .slot-tree .el-tree-node__content:hover {
  background: #007cff;
  color: #ffffff;
} */
.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
/* 自定义图标 */
.slot-tree .fa {
  margin-right: 2px;
}
.slot-tree .slot-t-icons .el-icon-plus,
.el-icon-edit,
.el-icon-delete {
  color: #333333;
}
.slot-tree .fa.fa-folder-o {
  font-size: 16px;
}
.slot-tree .node {
  font-size: 14px;
}
.el-header {
  z-index: 999 !important;
}
.slot-tree .el-tree-node__content {
  height: 30px;
}
/* popover弹出框 */
.FIELD {
  font-size: 16px;
  padding: 10px;
}
.FIELD .el-icon-edit {
  font-weight: 500;
}
.FIELD:hover {
  background: #007cff;
  color: #ffffff;
  cursor: pointer;
}
.FIELD:hover .el-icon-edit {
  background: #007cff;
  color: #ffffff;
  cursor: pointer;
}
#FieldPop {
  position: absolute;
}
/* 点击变色 */
.el-tree-node:focus > .el-tree-node__content {
  background-color: #007cff;
  color: #fff;
}
.el-tree-node:focus > .el-tree-node__content .fa.fa-file-text {
  color: #ffffff;
}
.el-tree-node:focus > .el-tree-node__content .el-icon-plus {
  color: #ffffff;
}
.fieldTree .el-input {
  width: 80%;
}
/* .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #007cff;
  color: #fff;
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  span
  i.el-icon-plus {
  color: #fff;
} */
.Tree .fa.fa-folder {
  color: #f8ae3f;
  font-size: 16px;
}
.Tree .fa.fa-file-text {
  color: #4e86c7;
}
</style>
