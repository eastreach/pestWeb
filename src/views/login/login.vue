<template>
  <div class="login-container">
    <el-form class="login-form"
             autoComplete="off"
             :model="tzdOperator"
             ref="form"
             label-position="left"
             :rules="formRules">
      <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
      </div>

      <input type="text" id="aaa" style="visibility: hidden;"/>
      <input type="password" id="aba" style="visibility: hidden;"/>

      <el-form-item prop="code" class="login-el-form-item">
         <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          class="login-el-input"
          type="text"
          v-model="tzdOperator.account"
          autoComplete="off"
          placeholder="工号"></el-input>
      </el-form-item>

      <el-form-item prop="pass" class="login-el-form-item">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          class="login-el-input"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
          v-model="tzdOperator.password"
          autoComplete="off"
          placeholder="密码"></el-input>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :loading="loading"
        @click.native.prevent="handleLogin">{{$t('login.logIn')}}
      </el-button>

    </el-form>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/util/validate'
  import LangSelect from '@/components/LangSelect'
  import SocialSign from './socialsignin'
  export default {
    components: {
      LangSelect,
      SocialSign,
    },
    name: 'login',
    data() {
      return {
        tzdOperator: {account: "", password: '', username: 'admin', password: '111111'},
        passwordType: 'password',
        loading: false,
        showDialog: false,
        formRules: {
          account: [
            {required: true, message: '请填写工号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleLogin(){
        let self = this;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.$http.post(self.$store.state.gatewayUrl+"/operator/login", {
              account: self.tzdOperator.account,
              password: self.tzdOperator.password,
            }).then((res) => {
              if (res.data.state === "success") {
                self.$store.state.tzdOperator = res.data.data;
                self.tzdOperator.username = 'admin';
                self.tzdOperator.password = '111111';
                self.tzdOperator.roles = ['admin'];
                self.$store.dispatch('LoginByUsername', self.tzdOperator).then(() => {
                  self.loading = false;
                  self.$router.push({path: '/'});
                  self.$message.success('登录成功:' + res.data.tzdOperator.name);
                }).catch(() => {
                  this.loading = false
                })
              } else {
                self.$message.success('登录失败:' + res.data.msg);
              }
            }).catch((e) => {
              self.loading = false;
              self.$message.success('操作失败:' + e);
            });
          } else {
            return false;
          }
        });
      },
    },
    mounted(){
      let self = this;
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .login-el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .login-el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
