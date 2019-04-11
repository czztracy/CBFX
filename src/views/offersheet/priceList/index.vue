/*
 * @Page: 供应商填报
 * @Author: cls
 * @Date: 2018-12-19
 * @Last Modified by: cls
 */
<template>
  <div class="priceListss">
    <iframe id="myIframe" ref="myIframe" :src="userData" frameborder="0"/>
  </div>
</template>

<script>
import { iframeApi } from '@/utils/api'
export default {
  name: 'PriceList',
  data() {
    return {
      // iframe地址
      userData: iframeApi() + '?'
      // src: iframeApi() + 'suppliers' + '?timestamp=' + new Date().getTime() + 10,
    }
  },
  created() {
    this.iframeUser()
  },
  mounted() {
    // window.sessionStorage.setItem('baojiaData', JSON.stringify(this.$route.query))
  },
  methods: {
    // iframe地址传参
    iframeUser() {
      // this.userData = 'http://127.0.0.1:5500/index/index.html?'
      Object.keys(this.$route.query).forEach(element => {
        this.userData += element + '=' + this.$route.query[element] + '&'
      })
      this.userData += 'token=' + window.sessionStorage.getItem('token')
      let getparent = 1
      if (window.location.href.indexOf('localhost') !== -1) {
        getparent = 2
      } else if (window.location.href.indexOf(':18780') !== -1) {
        getparent = 3
      } else if (window.location.href.indexOf('.71/') !== -1) {
        getparent = 4
      }
      this.userData += '&getparent=' + getparent
      // console.log(JSON.stringify(this.$route.query))
    }
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  min-height: calc(100vh - 172px);
  /* border: none; */
  background: #fff;
  border: 1px solid #d1d1d1;
  padding: 30px;
}
.priceListss {
  background: rgba(244, 244, 244, 1);
  padding: 18px;
  /* min-height: calc(100vh - 153px); */
}
/* 匹配历史报价单顶部 */
.PriceList .PriceListBox .matching {
  overflow: hidden;
}
.PriceList .PriceListBox .matching .UpDown {
  float: right;
}
.PriceList .PriceListBox .matching .Phistory {
  float: left;
}
/* 报价单 */
.PriceList .PriceListBox .priceSheet {
  /* height: 500px; */
  min-height: calc(100vh - 172px);
}
/* 保存提交 */
.PriceList .PriceListBox .CommitCharge {
  overflow: hidden;
  padding-top: 30px;
  text-align: center;
}
</style>
<style>
.PriceList .el-radio-group {
  display: block;
}
.PriceList .el-input.is-disabled .el-input__inner {
  color: #333;
}
.PriceList .PriceListBox .matching .el-form-item__label {
  font-weight: 500;
}
.PriceList .PriceListBox .matching .el-input--suffix .el-input__inner {
  background: #f9f9f9;
}
.PriceList .PriceListBox .matching .el-form--inline .el-form-item {
  margin-bottom: 0;
}
.PriceList .PriceListBox .matching .el-input span.pic {
  border-left: 1px solid #cecece;
  display: inline-block;
  height: 60%;
  width: 32px;
  margin-top: 24%;
  padding: 0 20%;
}
.PriceList .PriceListBox .matching .el-input span.pic img {
  display: inline;
  padding: 0;
  margin-bottom: 18%;
}
.PriceList .PriceListBox .matching .el-input span.pic img:hover {
  cursor: pointer;
}
/* 上传下载按钮 */
.PriceList .PriceListBox .matching .UpDown .el-button {
  border: 1px solid #4a90e2;
  color: #4a90e2;
}
.PriceList .PriceListBox .matching .UpDown .el-button:nth-child(1) {
  margin-right: 10px;
}
/* 保存提交按钮 */
.PriceList .PriceListBox .CommitCharge .el-button {
  padding: 12px 60px;
}
.PriceList .PriceListBox .CommitCharge .el-button:nth-child(1) {
  color: #1875f0;
  border-color: #1875f0;
  margin-right: 10px;
}
.PriceList .PriceListBox .CommitCharge .el-button:nth-child(2) {
  border-color: #d1d1d1;
}
</style>
