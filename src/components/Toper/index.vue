/*
 * @Page: 布局-头部
 * @Author: cong
 * @Date: 2018-11-30 16:43:58
 * @Last Modified by: cong
 */

<template>
  <div id="toper">
    <div class="rightnav">
      <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'"> -->
      <img src="@/assets/pageimg/haier.png" alt>
      <span>{{ name }}</span>
      <span class="logout" @click="logout">注销</span>
      <lang-select class="international right-menu-item"/>
    </div>
    <div class="leftnav">
      <img src="@/assets/pageimg/haier.png" alt>
      <span>{{ $t('pageBody.sysname') }}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LangSelect from '@/components/LangSelect'
// import { removeToken } from '@/utils/auth'
export default {
  name: 'Toper',
  components: {
    LangSelect
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['avatar', 'name'])
  },
  methods: {
    logout() {
      var _this = this
      this.$confirm('确认注销' + this.name + '吗？')
        .then(_ => {
          this.$store
            .dispatch('FedLogOut').then(() => {
              _this.$router.push({ path: '/login' })
            })
          sessionStorage.removeItem('avatarCode')
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('supplierCode')
          sessionStorage.removeItem('ticket')
          sessionStorage.removeItem('roles')
          sessionStorage.removeItem('rolename')
          sessionStorage.removeItem('rolecode')
          sessionStorage.removeItem('company')
          sessionStorage.removeItem('loginname')
          sessionStorage.removeItem('userCode')
          sessionStorage.removeItem('usercode')
          sessionStorage.removeItem('usersign')
          sessionStorage.removeItem('liziData')
          sessionStorage.removeItem('userData')
          // removeToken()
          // console.log('注销')
        })
        .catch(_ => { })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/mixin.scss";
#toper {
  height: 81px;
  width: 100%;
  background: #004ea1;
  padding: 0;
  @include clearfix;
  .leftnav {
    margin-left: 60px;
    line-height: 81px;
    img {
      height: 38px;
      width: 128px;
      display: inline-block;
      vertical-align: middle;
    }
    span {
      font-size: 36px;
      color: #fff;
      vertical-align: middle;
      display: inline-block;
      margin-left: 9px;
    }
  }
  .rightnav {
    float: right;
    margin-right: 63px;
    line-height: 81px;
    .logout {
      &:hover {
        cursor: pointer;
      }
    }
    span {
      font-size: 16px;
      color: #fff;
      vertical-align: middle;
      display: inline-block;
      margin-left: 6px;
    }
    img {
      height: 28px;
      width: 28px;
      display: inline-block;
      vertical-align: middle;
      border-radius: 50%;
    }
  }
}
.international {
  margin-left: 25px;
}
</style>
