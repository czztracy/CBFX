<!-- 我的消息 -->
<template>
  <dl>
    <dt>
      <img src="../../assets/index/index_choose_title.png" alt="">
      <span>{{ $t('dashboard.myMessage') }}</span>
      <small @click="skip">{{ $t('dashboard.more') }}<i class="el-icon-back" /></small>
    </dt>
    <dd v-for="(item, index) in messData" :key="index">
      <ul>
        <li>
          <!-- <img v-if="item.type == 1" src="../../assets/index/index_note.png" alt="">
          <img v-if="item.type == 2" src="../../assets/index/index_my_warning.png" alt="">
          <img v-if="item.type == 3" src="../../assets/index/index_my_msg.png" alt=""> -->
        </li>
        <li :title="item.message_content" v-html="item.message_content" />
        <!-- <li :title="item.create_time + ' ' + item.source">{{ item.create_time }} {{ $t('dashboard.source') }}: {{ item.demandSource }}</li> -->
        <!-- 查看详情 -->
        <!-- <li><el-button type="primary" size="small" plain @click="skip">{{ $t('dashboard.look') }}</el-button></li> -->
      </ul>
    </dd>
  </dl>
</template>

<script>
import { getMessageInfos } from '@/api/mynews'
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
export default {
  name: 'Message',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // 我的消息数据
      messData: [],
      // 时间戳转化数据存放
      newArr: []
    }
  },
  computed: {
    ...mapGetters(['userCode', 'avatarCode', 'key', 'roles', 'name', 'token'])
  },
  mounted() {
    this.search()
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
      // var hours = time.getHours()
      // var minutes = time.getMinutes()
      // var seconds = time.getSeconds()
      // console.log('6666', year + '-' + this.add0(month) + '-' + this.add0(date))
      this.newArr.push(year + '-' + this.add0(month) + '-' + this.add0(date))
    },
    search() {
      var params = {
        // receiverCode: this.token, // 角色编码userCode
        // receiverType: this.avatarCode, // 角色权限 权限不完整
        messageType: '', // 办理状态首页固定为空
        Keyword: '', // 模糊查询标识
        page: 1, // 第几页
        row: 3 // 每页的数据数
      }
      // // 判断演示，本地，正式环境
      // if (judgeUrl() === '001' || judgeUrl() === '003') {
      //   params.receiverType = this.avatarCode
      //   params.receiverCode = this.userCode
      // }
      // 传值是后台写死的,前端判断重新赋值params.receiverType
      // if (this.name === 'manager') {
      //   params.receiverType = '0003'
      //   console.log('params.receiverType', params.receiverType)
      // } else if (this.name === 'leader') {
      //   params.receiverType = '0005'
      // } else if (this.name === 'supplier') {
      //   params.receiverType = '0006'
      // }
      // console.log('params', params)
      var that = this
      getMessageInfos(params)
        .then(res => {
          console.log('查询返回', res)
          // 对返回的数据中的时间戳进行处理
          res.resultData.data.map(function(item, index, arr) {
            that.timeFormat(item.create_time)
          })
          // console.log('newArr', that.newArr)
          // 循环更改create_time
          for (let k = 0; k < res.resultData.data.length; k++) {
            res.resultData.data[k].create_time = that.newArr[k]
          }
          this.messData = res.resultData.data
          // console.log('this.messData', this.messData)
        })
        .catch(res => {
          this.$message.error('查询失败')
        })
    },
    skip() {
      this.$router.push('/index')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
dl {
  border: 1px solid #d1d1d1;
  padding-bottom: 52%;
  height: 100%;
  overflow: hidden;
  dt {
    font-size: 1.25vw;
    position: relative;
    margin: 3% 0 2.5%;
    img {
      vertical-align: bottom;
      margin-right: 2%;
    }
    small {
      font-size: 14px;
      position: absolute;
      right: 2%;
      top: 0;
      cursor: pointer;
      i {
        transform: rotate(180deg);
      }
    }
    small:hover {
      color: #2290ff;
    }
  }
  dd {
    margin: 0;
    padding: 0 3%;
    span {
      color: #7f8390;
      display: inline-block;
      margin-bottom: 2%;
      em {
        font-style: normal;
        color: #4a4a4a;
      }
    }
    ul {
      border-bottom: 1px solid #eee;
      padding: 1% 0;
      overflow: hidden;
      li {
        list-style-type: none;
        float: left;
        height: 0;
        width: 8%;
        padding-bottom: 9%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 290%;
        img {
          width: 100%;
        }
      }
      li:nth-of-type(2) {
        width: 50%;
        text-align: left;
        margin-left: 1%;
        line-height: 64px;
      }
      li:nth-of-type(3) {
        width: 25%;
        line-height: 64px;
      }
      li:nth-of-type(4) {
        width: 13%;
        line-height: 64px;
      }
    }
  }
  dd:last-of-type ul {
    border: none;
  }
  // dd:hover {
  //   // background-color: #f5f5f5;
  // }
}
</style>
