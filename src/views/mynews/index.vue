/*
 * @Page: 我的消息
 * @Author: chenlisha
 * @Date: 2018-11-30 16:15:26
 * @Last Modified by: chenlisha
 */
<template>
  <div style="background-color: #f4f4f4;">
    <div class="message">
      <!-- 时间排序 -->
      <!-- <el-button plain class="sort" >{{ $t('myMessage.timeSequence') }}
        <span :class="sortTime"><span @click="timeSortA"/><span @click="timeSortB"/></span>
      </el-button> -->
      <el-input v-model="news">
        <i slot="suffix" class="el-icon-search style-search" @click="serchFind"/>
      </el-input>
      <!--  suffix-icon="el-icon-search" @blur="serchFind" -->
      <!-- <i slot="prefix" class="el-icon-search"/> -->
      <el-tabs v-model="mess" type="card" style="margin-bottom:39px;min-height: calc(100vh - 360px);" @tab-click="handleClick">
        <el-tab-pane :label="$t('myMessage.total')" name="third">
          <el-card v-for="(item,index) in messData" :key="index" class="news">
            <span v-if="item.img === 'blur'" class="newsIcon blur"><img src="../../assets/index/images/newsBlur.png"></span>
            <span v-else-if="item.img === 'red'" class="newsIcon red"><img src="../../assets/index/images/newsRed.png"></span>
            <span v-else class="newsIcon orange"><img src="../../assets/index/images/newsOrange.png"></span>
            <p :title="item.message_content" class="newsTit">{{ item.message_content }}</p>
            <p class="newsTime">{{ item.create_time }}</p>
            <!-- <p class="source newsTime">{{ $t('myMessage.source') }}： {{ item.demandSource }}</p> -->
            <!-- 查看信息，去办理暂时不做 -->
            <!-- <el-button type="primary" class="goto" plain>{{ $t('myMessage.toDealWith') }}</el-button> -->
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="$t('myMessage.unhandled')" name="first">
          <el-card v-for="(item,index) in messData" :key="index" class="news">
            <span v-if="item.img === 'blur'" class="newsIcon blur"><img src="../../assets/index/images/newsBlur.png"></span>
            <span v-else-if="item.img === 'red'" class="newsIcon red"><img src="../../assets/index/images/newsRed.png"></span>
            <span v-else class="newsIcon orange"><img src="../../assets/index/images/newsOrange.png"></span>
            <p :title="item.message_content" class="newsTit">{{ item.message_content }}</p>
            <p class="newsTime">{{ item.create_time }}</p>
            <!-- <p class="source newsTime">{{ $t('myMessage.source') }}： {{ item.demandSource }}</p> -->
            <!-- 查看信息，去办理暂时不做 -->
            <!-- <el-button type="primary" class="goto" plain>{{ $t('myMessage.toDealWith') }}</el-button> -->
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="$t('myMessage.handled')" name="second">
          <el-card v-for="(item,index) in messData" :key="index" class="news">
            <span v-if="item.img === 'blur'" class="newsIcon blur"><img src="../../assets/index/images/newsBlur.png"></span>
            <span v-else-if="item.img === 'red'" class="newsIcon red"><img src="../../assets/index/images/newsRed.png"></span>
            <span v-else class="newsIcon orange"><img src="../../assets/index/images/newsOrange.png"></span>
            <p :title="item.message_content" class="newsTit">{{ item.message_content }}</p>
            <p class="newsTime">{{ item.create_time }}</p>
            <!-- <p class="source newsTime">{{ $t('myMessage.source') }}： {{ item.demandSource }}</p> -->
            <!-- 查看信息，去办理暂时不做 -->
            <!-- <el-button type="primary" class="goto" plain>{{ $t('myMessage.toDealWith') }}</el-button> -->
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <div style="text-align: center;">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          :prev-text="$t('demandForFiltering.previousPage')"
          :next-text="$t('demandForFiltering.nextPage')"
          class="paging"
          background
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>
<script>
// import Language from '@/utils/language'
import { getMessageInfos } from '@/api/mynews'
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
export default {
  name: 'Mynews',
  // mixins: [Language],
  data() {
    return {
      // 时间戳转化数据存放
      newArr: [],
      // 消息排序验证
      timeS: true,
      // 我的消息数据接收
      messData: [],
      // result 接口办理状态
      result: '0002',
      mess: 'third', // 标签页绑定值
      news: '', // 模糊查询框绑定值
      sign: false, // 查询为空是否重置
      sortTime: 'sortIcon big', // 时间排序样式控制
      // 分页
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页展示条数
      total: 0 // 表格总条数
    }
  },
  computed: {
    ...mapGetters(['userCode', 'avatarCode', 'roles', 'name', 'token'])
  },
  mounted() {
    // 我的消息接口请求
    this.search()
  },
  created() {
    // this.copyNot = Array.from(this.not)
    // this.copyHaved = Array.from(this.haved)
    document.onkeyup = (e) => { // 回车键验证
      var key = window.event.keyCode
      if (key === 13) {
        this.serchFind()
      }
    }
  },
  methods: {
    // 时间戳方法
    add0(m) { return m < 10 ? '0' + m : m },
    // 时间戳转化成时间格式
    timeFormat(timestamp) {
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      console.log('6666', year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds))
      this.newArr.push(year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds))
    },
    // 时间排序
    // timeSortA() {
    //   if (this.timeS === false) {
    //     this.messData.reverse()
    //     this.timeS = true
    //   }
    // },
    // timeSortB() {
    //   // 判断一下是否为倒叙
    //   if (this.timeS === true) {
    //     this.messData.reverse()
    //     this.timeS = false
    //   }
    // },
    // 判断消息状态待后台数据更改重新判断
    handleState() {
      if (this.mess === 'first') {
        this.result = '0001' // 通知类
      } else if (this.mess === 'second') {
        this.result = '0002' // 办理类
      } else {
        this.result = ''
      }
    },
    // 查询重置
    serchFind() {
      this.currentPage = 1
      this.search()
    },
    // 我的消息接口数据获取
    search() {
      // 办理状态处理
      this.handleState()
      var params = {
        // receiverCode: this.userCode, // 角色编码userCode
        // receiverType: this.avatarCode, // 角色权限 权限不完整
        messageType: this.result, // 办理状态
        Keyword: this.news, // 模糊查询标识
        page: this.currentPage, // 第几页
        row: this.pageSize // 每页的数据数
      }
      // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   params.receiverType = this.avatarCode
      //   params.receiverCode = this.userCode
      // }
      // 传值是后台写死的,前端判断重新赋值params.receiverType
      // if (this.name === 'manager') {
      //   params.receiverType = '0003'
      // } else if (this.name === 'leader') {
      //   params.receiverType = '0005'
      // } else if (this.name === 'supplier') {
      //   params.receiverType = '0006'
      // }
      console.log('params', params)
      var that = this
      getMessageInfos(params)
        .then(res => {
          console.log('查询返回', res)
          if (res.resultData.count) {
            this.total = res.resultData.count
          } else {
            this.total = 0
          }
          // 对返回的数据中的时间戳进行处理
          res.resultData.data.map(function(item, index, arr) {
            that.timeFormat(item.create_time)
          })
          console.log('newArr', that.newArr)
          // 循环更改create_time
          for (let k = 0; k < res.resultData.data.length; k++) {
            res.resultData.data[k].create_time = that.newArr[k]
          }
          this.messData = res.resultData.data
          console.log('this.messData', this.messData)
        })
        .catch(res => {
          this.$message.error('查询失败')
        })
    },
    // search() {
    //   if (this.news !== '') {
    //     this.sign = true
    //     if (this.mess === 'first') {
    //       this.searchNotNone(this.not, this.copyNot)
    //     } else {
    //       this.searchNotNone(this.haved, this.copyHaved)
    //     }
    //   } else if (this.sign === true) {
    //     if (this.mess === 'first') {
    //       this.not.splice(0)
    //       this.not = Array.from(this.copyNot)
    //     } else {
    //       this.haved.splice(0)
    //       this.haved = Array.from(this.copyHaved)
    //     }
    //     this.sign = false
    //   }
    // },
    // searchNotNone(arr, copy) {
    //   var reg = new RegExp(this.news)
    //   arr.splice(0)
    //   for (var i in copy) {
    //     if (reg.test(copy[i].newsTit)) {
    //       arr.push(copy[i])
    //     }
    //   }
    // },
    handleClick(tab, event) {
      // 切换选项进行接口请求
      this.currentPage = 1
      this.search()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
    }
  }
}
</script>

<style scoped>
  span{
    display: inline-block;
  }
  .style-search{
    padding: 12px 30px
  }
  .message{
    margin: 0 3.14%;
    padding: 36px 0 42px;
    background-color: #f4f4f4;
    position: relative;
    /* min-height: 600px; */
    min-height: calc(100vh - 138px);
  }
  .news{
    margin-bottom: 20px;
    padding:2px 1.316% 2px 0.658%;
    font-size: 0;
  }
  .news p{
    display: inline-block;
    vertical-align: top;
  }
  .newsIcon{
    width:48px;
    height:48px;
    box-shadow:0px 2px 6px 0px rgba(7,85,207,0.3);
    border-radius: 50px;
    display: inline-flex;
  }
  .newsIcon img{
    margin: auto;
  }
  .newsTit{
    width: 70.566%;
    font-size:20px;
    color:rgba(51,51,51,1);
    margin:12px 0 0 1.447%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .newsTime{
    font-size:18px;
    color:rgba(136,136,136,1);
    margin:14px 0 0 5.46%
  }
  .message .source{
    margin-left: 6.184%;
  }
  .sortIcon{
    display: inline-flex;
    flex-direction: column;
    vertical-align: top;
    margin-top:-4px;
  }
  .sortIcon span{
    border:6px solid rgba(0,0,0,0);
    margin-bottom: 2px;
  }
  .big span:first-child{
    border-bottom-color:rgba(155,155,155,1);
  }
  .big span:last-child{
    border-top-color:rgba(74,74,74,1);
  }
  .small span:first-child{
    border-bottom-color:rgba(74,74,74,1);
  }
  .small span:last-child{
    border-top-color:rgba(155,155,155,1);
  }
  .goto{
    float: right;
    background-color: #fff;
    margin-top: 4px;
  }
  .blur{
    background:rgba(2,100,255,1);
  }
  .red{
    background:rgba(255,82,110,1);
  }
  .orange{
    background:rgba(248,139,94,1);
  }
  .sort{
    position: absolute;
    left: 276px;
    z-index: 9;
  }
  .message .el-button{
    font-size: 18px;
    padding: 10px 20px;
  }
  .message .el-input{
    width: 34%;
    position: absolute;
    right: 0;
    z-index: 9;
  }
</style>
<style>
/* 选项卡样式调整 */
.message .el-tabs--card>.el-tabs__header{
    border-bottom: 0;
}
.message .el-tabs--card>.el-tabs__header .el-tabs__item{
    width:120px;
    height: 44px;
    line-height: 46px;
    font-size: 18px;
    padding: 0 0;
    background-color: #fff;
    color: #6C7180;
    text-align:center;
}
.message .el-tabs__header{
    margin-bottom: 37px;
}
.message .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: 1px solid #e4e7ed;
}
.message .el-tabs--card>.el-tabs__header .el-tabs__nav div:first-child{
    border-radius:4px 0px 0px 4px;
}
.message .el-tabs--card>.el-tabs__header .el-tabs__nav div:last-child{
    border-radius:0px 4px 4px 0px;
}
.message .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    border-color: #2290FF;
    background-color: #2290FF;
    color: #fff;
}
/* 模糊查询样式调整 */
.message .el-input__inner{
    height: 46px;
    padding-right:19.05%
}
.message .el-icon-search:before{
    color:rgba(127,131,144,1);
}
.message .el-input__suffix{
    width: 17.05%;
    font-size: 23px;
    right: 0;
    background:rgba(228,228,228,1);
    cursor: pointer;
}
</style>
