/*
 * @Page: 报价单填报 -> 物料号维度
 * @Author: zp
 * @Date: 2018-12
 * @Last Modified by: zp
 */
<template>
  <div style="display: inline-block;">
    <el-upload
      ref="upload"
      :show-file-list="false"
      :on-remove="uploadRemove"
      :on-progress="uploadProgress"
      :on-success="uploadSuccessFn"
      :on-error="uploadErrorFn"
      :file-list="fileList"
      :auto-upload="uploadBox.autoUpload"
      :multiple="uploadBox.multiple"
      :on-change="tableUploadChange"
      :action="uploadBox.action"
      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf"
      class="upload-demo"
    >
      <el-button type="primary" plain>
        <i class="fa fa-upload" style="margin-right: 6px;"/>
        {{ name }}
      </el-button>
    </el-upload>
    <!-- 上传弹框 -->
    <el-dialog
      :visible.sync="tableUpload"
      :title="$t('demandNoResolve.batchUpload')"
      class="dialog-box"
      @close="fileListClear"
    >
      <el-row style="margin: 20px 0 50px;padding: 0 20px;">
        <el-col :span="12" style="font-size: 16px;line-height: 32px;">
          <span v-if="uploadTitle === 1">{{ $t('demandNoResolve.prepareFilesForUpload') }}</span>
          <span v-else-if="uploadTitle === 2">{{ $t('demandNoResolve.uploadingFile') }}</span>
          <span v-else-if="uploadTitle === 4">
            <i
              class="fa fa-exclamation-triangle"
              style="color: #FF9E00;font-size: 22px;margin-right: 6px;vertical-align: middle;"
            />
            {{ $t('demandNoResolve.uploadBreak') }}
          </span>
          <span v-else>
            <i
              class="el-icon-circle-check-outline"
              style="color: #38D889;font-size: 22px;margin-right: 6px;vertical-align: middle;"
            />
            {{ $t('demandNoResolve.allUploaded') }}
          </span>
          ：({{ uploadFileNum }}/{{ fileList.length }})
        </el-col>
        <el-col :span="12" align="right">
          <el-button
            v-if="uploading === 1"
            :disabled="fileListLen"
            type="primary"
            size="small"
            @click="submitUpload"
          >{{ $t('demandNoResolve.toUpload') }}</el-button>
          <el-button
            v-else-if="uploading === 4"
            type="primary"
            size="small"
            @click="submitUpload"
          >{{ $t('demandNoResolve.continueToUpload') }}</el-button>
          <el-button
            v-else-if="uploading === 3"
            type="primary"
            size="small"
            @click="finishUpload"
          >{{ $t('demandNoResolve.finish') }}</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            plain
            disabled
            style="background-color: #C4C4C4;border-color: #c4c4c4;color: #fff;margin-left: 0;"
          >{{ $t('demandNoResolve.uploading') }}</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="fileList"
        :header-cell-style="{'background-color': '#F4F4F4'}"
        stripe
        style="width: 100%;"
      >
        <el-table-column label width="35">
          <template slot-scope="scope">
            <i v-if="scope.row.percentage === 0"/>
            <i
              v-else-if="scope.row.percentage === 100"
              class="el-icon-circle-check-outline"
              style="color: #38D889;"
            />
            <i v-else class="el-icon-circle-close-outline" style="color: #D83838;"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('demandNoResolve.filename')">
          <template slot-scope="scope">
            <span v-if="scope.row.name.endsWith('.pdf')">
              <i class="fa fa-file-pdf-o" style="color: #D83838;"/>
              {{ scope.row.name }}
            </span>
            <span v-else-if="scope.row.name.endsWith('.xls') || scope.row.name.endsWith('.xlsx')">
              <i class="fa fa-file-excel-o" style="color: #D83838;"/>
              {{ scope.row.name }}
            </span>
            <span
              v-else-if="scope.row.name.endsWith('.jpg') || scope.row.name.endsWith('.jpeg') || scope.row.name.endsWith('.png')"
            >
              <i class="fa fa-file-image-o" style="color: #D83838;"/>
              {{ scope.row.name }}
            </span>
            <span v-else>{{ scope.row.name }}</span>
            <span
              v-if="false"
              style="color: #D83838;"
            >({{ $t('demandNoResolve.aMatchingTemplateCouldNotBeFound') }})</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('demandNoResolve.filesize')" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.size | fileSize }}</span>
            <span
              v-if="scope.row.size > 1024**2*5"
              style="color: #D83838;"
            >({{ $t('demandNoResolve.objectFileTooLarge') }})</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('demandNoResolve.fileStatus')" prop="address" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.percentage === 0">{{ $t('demandNoResolve.readyToUpload') }}</span>
            <span
              v-else-if="scope.row.percentage === 100"
            >{{ $t('demandNoResolve.uploadSuccessful') }}</span>
            <span
              v-else-if="scope.row.percentage < 100 && scope.row.percentage > 0"
            >上传中</span>
            <span v-else>{{ $t('demandNoResolve.uploadFail') }}</span>
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <i
              v-if="scope.row.size > 1024**2*5"
              class="el-icon-delete"
              style="cursor: pointer;"
              @click="fileDel(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UploadBox',
  components: {

  },
  filters: {
    // 文件的大小换算成kb
    fileSize(value) {
      return parseInt(value / 1024 * 100) / 100 + 'KB'
    }
  },
  props: {
    uploadBox: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 文件上传列表
      fileList: [],
      // 批量上传弹框
      tableUpload: false,
      // 开始上传按钮
      // 1：开始上传，2上传中，3完成，4继续上传
      uploading: 1,
      // 成功上传文件的个数
      uploadFileNum: 0,
      // 开始上传按钮是否能点击
      fileListLen: false,
      // 弹框标题文字改变
      uploadTitle: 1
    }
  },
  computed: {

  },
  watch: {
    fileList(newVal) {
      console.log('newVal', newVal)
    }
  },
  mounted() {

  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
      this.uploadTitle = 2
      this.uploading = 2
    },
    // 批量上传列表中删除
    uploadRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 上传进度
    uploadProgress(event, file, fileList) {
      // console.log(event)
      if (event.percent === 100) {
        this.uploadFileNum++
      }
      if (this.uploadFileNum === fileList.length) {
        this.uploadTitle = 3
        this.uploading = 3
      }
    },
    // 上传成功
    uploadSuccessFn(response, file, fileList) {
      // console.log(file)
      this.fileList = fileList
      this.$emit('success', fileList)
    },
    // 上传失败
    uploadErrorFn(response, file, fileList) {
      console.log(response)
    },
    // 点击垃圾图标
    fileDel(row) {
      // console.log(row)
      var fileIndex = 0
      this.fileList.forEach((value, index) => {
        if (value.uid === row.uid) {
          fileIndex = index
        }
      })
      this.fileList.splice(fileIndex, 1)
      if (!this.fileList.length) {
        this.fileListLen = true
      }
    },
    // 点击批量上传
    tableUploadChange(file, fileList) {
      // console.log(fileList)
      if (fileList.length) {
        this.fileList = fileList
        if (!this.uploadBox.autoUpload) {
          this.tableUpload = true
        }
      }
    },
    // 关闭弹框的回调
    fileListClear() {
      this.fileList = []
      this.uploading = 1
      this.uploadTitle = 1
      this.uploadFileNum = 0
    },
    // 点击完成
    finishUpload() {
      this.fileList = []
      this.uploading = 1
      this.uploadTitle = 1
      this.uploadFileNum = 0
      this.tableUpload = false
    }
  }
}
</script>
