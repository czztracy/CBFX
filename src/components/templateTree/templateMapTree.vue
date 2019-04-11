/*
 * @Page: 模板创建 --> 左侧树
 * @Author: csg
 * @Date: 2018-12-11 14:57:45
 * @Last Modified by: csg
 */
<template>
  <div class="TEMPLATEMAPTREE" style="display:inline-block; float: left;">
    <el-tree
      ref="templateTree"
      :data="setTree"
      :props="defaultProps"
      class="expand-tree"
      node-key="id"
      default-expand-all
      highlight-current
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" :title="node.label" class="slot-t-node">
        <!-- 未编辑状态 -->
        <span
          :class="[data.Group === 0 ? 'childeNode' : 'parentNode']"
          style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;width: 135px;display: inline-block;"
        >
          <i :class="[ data.Group === 0 ? 'fa fa-file-o' : 'fa fa-folder-o']"/>
          {{ node.label }}
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import api from '@/api/resource'
export default {
  data() {
    return {
      // 节点树数据
      setTree: api.treelist,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // node 点击事件
    handleNodeClick(node, data) {
      console.log(node, data)
    }
  }
}
</script>

<style>
.TEMPLATEMAPTREE .el-tree-node__content .childeNode {
  font-size: 13px;
}
.TEMPLATEMAPTREE .el-tree-node__content .parentNode {
  font-size: 14px;
}
.TEMPLATEMAPTREE .el-tree-node__content .slot-t-node .fa-folder-o {
  font-size: 15px;
}
.TEMPLATEMAPTREE .el-tree-node__content .slot-t-node .fa-file-o {
  font-size: 10px;
}
</style>
