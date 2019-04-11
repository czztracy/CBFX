/*
 * @Page: 登录页
 * @Author:cls
 * @Date: 2019-1
 * @Last Modified by: cls
 */
<template>
  <el-container class="login-container">
    <el-header class="login-container-header">
      <div class="rightnavs">
        <lang-select class="internationals right-menu-item"/>
      </div>
      <div class="leftnavs">
        <img src="@/assets/pageimg/haier.png" alt="">
        <span>{{ $t('pageBody.sysname') }}</span>
      </div>
    </el-header>
    <el-main class="login-container-main">
      <img src="../../assets/index/images/Group 418.png" class="login-container-img">
      <div class="contactInfo">
        <p class="contactTit">{{ $t('dashboard.contactInfo') }}</p>
        <div class="InfoName">
          <p>{{ $t('dashboard.office') }}</p>
          <p class="emailNeat">冷<span class="telNeat">超</span>{{ $t('dashboard.business') }}</p>
          <p class="emailNeat">刘<span class="telNeat">凯</span>{{ $t('dashboard.business') }}</p>
          <p>苑宝贞{{ $t('dashboard.technology') }}</p>
        </div>
        <div class="InfoName">
          <p>88938024</p>
          <p>lengchao@haier.com</p>
          <p>183 0026 5686</p>
          <p>liukai01@haier.com</p>
          <p>186 5324 1789</p>
          <p>yuanbaozhen@fineway.com</p>
          <p>132 4025 3483</p>
        </div>
      </div>
      <div class="showOperate">
        <div v-if="clicks">
          <el-button type="primary" round @click="rolesLogin(1)">{{ $t('demandManagement.supplier') }}</el-button>
          <el-button type="primary" round @click="rolesLogin(2)">{{ $t('demandManagement.haieruser') }}</el-button>
        </div>
        <el-form v-else ref="loginForm" :model="loginForm" :rules="loginRules" :inline="true" class="login-form" auto-complete="on">
          <el-form-item v-if="roles==='supplier'" :label="$t('demandManagement.supplier')" prop="userName">
            <el-input v-model="loginForm.userName" :placeholder="$t('demandManagement.usertip')" name="userName" type="text" auto-complete="on" clearable/>
          </el-form-item>
          <el-form-item v-else :label="$t('demandManagement.haieruser')" prop="userName">
            <el-input v-model="loginForm.userName" :placeholder="$t('demandManagement.usertip')" name="userName" type="text" auto-complete="on" clearable/>
          </el-form-item>
          <el-form-item :label="$t('demandManagement.password')" class="mima" prop="password">
            <el-input
              :type="pwdType"
              :placeholder="$t('demandManagement.passtip')"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              clearable
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" round @click.native.prevent="handleLogin">{{ $t('buttonGroup.confirm') }}</el-button>
            <el-button round @click="clicks=true">{{ $t('buttonGroup.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer class="login-container-footer"><p>Copyright © 2017{{ $t('demandManagement.footLogo') }}</p></el-footer>
  </el-container>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
// import jwt from 'jwt-simple'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Login',
  components: {
    LangSelect
  },
  // inject: ['reload'],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('密码不能为空')) // 密码没验证，只要不小于5位数ok
      } else {
        callback()
      }
    }
    return {
      loginForm: { // 账号密码
        userName: '',
        password: ''
      },
      loginRules: { // 校验规则
        userName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      roles: 'haier', // 角色登录
      clicks: true, // 是否点击
      loading: false, // 登录loading
      pwdType: 'password', // 密码type
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 显示隐藏密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    // 登录确定按钮 按角色
    rolesLogin(val) {
      this.clicks = false
      // if ((this.roles==='supplier'&&val===2)||(this.roles==='haier'&&val===1)) {
      this.loginForm.userName = ''
      this.loginForm.password = ''
      this.pwdType = 'password'
      // }
      this.roles = val === 1 ? 'supplier' : 'haier'
    },
    // 角色登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const obj = []
          obj.push(this.loginForm, this.roles)
          this.$store
            .dispatch('Login', obj)
            .then(() => {
              // this.loading = false
              this.clicks = false
              // let startJumpe = '/dashboard'
              // if (sessionStorage.getItem('roles') === '14') {
              //   startJumpe = '/financialInfo'
              // }
              // console.log(startJumpe, '111111111', this.redirect)
              // this.$router.push({ path: this.redirect || startJumpe})
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
.login-container {
  width: 100%;
  .login-container-header {
    height: 81px !important;
    width: 100%;
    background: #004ea1;
    padding: 0;
    @include clearfix;
    .leftnavs {
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
    .rightnavs {
      float: right;
      margin-right: 63px;
      line-height: 81px;
      .internationals {
        margin-left: 25px;
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
  .login-container-main{
    padding: 0;
    overflow: hidden !important;
    .login-container-img{
      width: 100%;
      max-height: calc(100vh - 250px);
    }
    .contactInfo{
      position: absolute;
      color: #333;
      font-size: 12px;
      line-height: 20px;
      right: 1%;
      .InfoName {
        display: inline-block;
        vertical-align: top;
      }
      .telNeat {
        margin-left: 14px;
      }
      .emailNeat {
        margin-bottom: 20px;
      }
    }
    .showOperate{
      padding-top: 58px;
      text-align: center;
      .el-button{
        width:12.5%;
        font-size: 20px;
        @include btnbg;
        span{
          color:#fff !important;
        }
      }
      .el-button+.el-button{
        margin-left: 20px
      }
      .login-form{
        .el-button{
          width:auto;
          min-width: 102px;
          font-size: 16px;
          span{
            color:#fff !important;
          }
        }
        .el-button+.el-button{
          color: #fff;
          margin-left: 10px
        }
        .el-input__inner{
          border-radius: 20px;
          height: 44px;
          line-height: 44px;
        }
        .el-input__suffix{
          right:50px;
        }
        .el-form-item{
          margin: 0 30px 0 0
        }
        .el-form-item__label{
          font-size: 18px;
          line-height: 44px;
        }
        .mima{
          position: relative;
          .show-pwd {
            position: absolute;
            right: 15px;
            top: 5px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
          }
        }
        .el-form-item.is-required .el-form-item__label:before{
          display: none;
        }
      }
    }
  }
  .login-container-footer{
    height: 45px !important;
    text-align: center;
    color: #9B9B9B;
    font-size: 14px;
    p {
      line-height: 45px;
    }
  }
  .el-form-item__error {
    position: static !important;
    text-align: left;
  }
}
</style>
