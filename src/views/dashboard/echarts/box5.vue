<!-- 大数据概况 -->
<template>
  <div id="box5">
    <div class="inner">
      <div class="top">
        <span />
        <h3>{{ $t('dashboard.bigDataOverview') }}</h3>
      </div>
      <div class="middle">
        <div>
          <p class="p1">{{ $t('dashboard.numberOfFields') }}：</p>
          <p class="p2">{{ bigData.fieldNumber }}{{ $t('dashboard.entries') }}</p>
        </div>
        <div>
          <p class="p1">{{ $t('dashboard.dataSize') }}：</p>
          <p class="p2">{{ bigData.dataVolume }}{{ $t('dashboard.entries') }}</p>
        </div>
      </div>
      <div id="echartsBox5">
        <div class="showbox1">
          <p class="p3">{{ $t('dashboard.art') }}</p>
          <p class="p4">{{ bigData.bardianTemplate }}</p>
        </div>
        <div class="showbox2">
          <p class="p3">{{ $t('dashboard.masterTaper') }}</p>
          <p class="p4">{{ bigData.standardTemplate }}</p>
        </div>
        <div class="showbox3">
          <p class="p3">{{ $t('dashboard.generalTemplate') }}</p>
          <p class="p4">{{ bigData.currencyTemplate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Eventbus from '@/bus.js'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
import { getBigData } from '@/api/dashboard'
export default {
  name: 'Box5',
  components: {},
  props: {
    time: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    show: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // show: {},
      bigData: {
        'fieldNumber': '0', // 字段数量
        'dataVolume': '0', // 数据量
        'standardTemplate': '0', // 标准模板
        'currencyTemplate': '0', // 通用模板
        'bardianTemplate': '0' // 个性模板
      }

    }
  },

  computed: {
    ...mapGetters(['userCode'])
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      var params = { region: this.region }
      // if (judgeUrl() !== '002') {
      //   params.receiverCode = this.userCode
      // }
      // var params = { region: this.region, receiverCode: this.userCode }
      // var params = { region: this.region }
      if (this.time === 'month') {
        params.yearOrMonth = '2'
      } else if (this.time === 'year') {
        params.yearOrMonth = '1'
      }
      getBigData(params).then(res => {
        this.bigData = res.resultData
      })
    }
  }
}
</script>
<style scoped>
#box5 {
  width: 100%;
}
.inner {
  width: 100%;
  height: 0;
  padding-bottom: 52%;
  border: 1px solid #d1d1d1;
}
.top {
  width: 100%;
  margin: 3% 0 2.5%;
  display: flex;
  align-items: flex-start;
}
.top h3 {
  margin: 0 3%;
  font-size: 1.25vw;
  color: #4a4a4a;
  font-family: 'PingFangSC';
  font-weight: 500;
}
.top span {
  display: inline-block;
  width: 0.52%;
  height: 0;
  padding-bottom: 3.92%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA8CAYAAABb5PswAAACdklEQVRIS31Vy1ITQRS9pyPg2nLBH4iCoYzlA0TwgWIUy51fkXLBlwTLGB+RstQSFZ9QUhrK+PgH4p5fgIWZmZpr3Z6Z7p5XejM9M6f7nnP73Nu48yfcJ9AeM3dZqc7WHHbJGbj9O+DkHUBIoPbYEbWyMQlPvmP5V8AgaAwTk56De4ePVuoCwvJPuwMBRMwkTwVqbS5UGrjVcwBubEKIUVXFzR8BQ1ZKCGaSuTxlVBSaGuCyTs/RR30nEGZl4wA3dkTFkD2Wur6RmYVp2UvfhWT0K1aonyZ5AkhYJwpSqq5/C2SneMhEtks+gHBt2xfxhSzlKxa3LclsovSxLH71XUrx9smOLAAhWcaBCFe3fPM/oWcYAYQrmw7JgkTg8hcBRCHELMY0iYEEUBZDy7z0WVSU5FpkLnyyMrMkdV7nPw4DMGH+g5OonE4iXHzvWQ65E2HC3IZv/FB0YhpgHOLUhXH5hXfuYRX4YfatV+pJnd3ZN54xTNYPOpMz66IiHhkOwg0z65ZDbgdJ9fnXnjVt3hCEc688W7xxfzArJIUCcMok78mzL71yy4mKMy+cEJn+oPMgAKeQoqJy/XP6uWSyeGh/CsDkKUNRh6itDRyZ6dLVmaytuTLzoVB7JjKjKIV1capj82Al2AWYfmo5GIm2fxCmnzgkixIlAKfhpGtTFlQfOyqy1S1+OPloUNqKRRWm2oPcfeG0PcLUQ2eHIk9OtoaEAA5w4kG5TCjqa0BZrwehieP3ByX3BUKAqxGguBG3/t4bbWBi9V++PwC9yvhIffcuPBxrCsnkvkCoFLXV+MiK/NQWmFj19kPmPRC6lUPc6TfGUlfzf0npeCkVfufUAAAAAElFTkSuQmCC)
    no-repeat;
  background-size: 100%;
}
.middle {
  display: flex;
  margin: 0 3.52%;
}
.middle div {
  display: flex;
  margin-right: 3%;
  align-items: center;
}
.middle .p1 {
  font-size: 0.85vw;
  color: #7f8390;
  font-family: 'PingFangSC';
}
.middle .p2 {
  font-size: 0.92vw;
  color: #4a4a4a;
  font-family: 'PingFangSC';
}
#echartsBox5 {
  width: 90%;
  height: 14vw;
  margin: 2% 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
#echartsBox5 > div {
  height: 3.75vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
#echartsBox5 .p3 {
  padding: 10px 0;
  color: #fff;
  font-size: 0.9375vw;
  line-height: 1.46vw;
  margin-right: 10px;
}
#echartsBox5 .p4 {
  padding: 10px 0;
  color: #fff;
  font-size: 1.46vw;
  line-height: 1.46vw;
}
.showbox1 {
  width: 50%;
  background: url('../../../assets/index/images/bg1.png') no-repeat;
  background-size: 100%;
}
.showbox2 {
  width: 70%;
  background: url('../../../assets/index/images/bg2.png') no-repeat;
  background-size: 100%;
}
.showbox3 {
  width: 100%;
  background: url('../../../assets/index/images/bg3.png') no-repeat;
  background-size: 100%;
}
</style>
