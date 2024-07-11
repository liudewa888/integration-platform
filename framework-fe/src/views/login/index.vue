<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <div class="loginForm">
        <el-radio-group v-model="loginForm.loginType" style="width: 100%">
          <el-radio-button label="0">用户名登陆</el-radio-button>
          <el-radio-button label="1">工号登陆</el-radio-button>
          <el-radio-button label="2">手机号登陆</el-radio-button>
        </el-radio-group>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
    <el-dialog
      :title="title"
      width="42%"
      top="5%"
      v-model:visible="diaVis"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div v-html="html"></div>
      <template v-slot:footer>
        <div class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="goToPage()">同意</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt';
import { GetPublicKey, login } from '@/api/user';
console.log('login');
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
export default {
  data() {
    return {
      title: '个人信息保护管理制度',
      diaVis: false,
      html: '',
      loginForm: {
        loginType: '0',
        username: '',
        password: ''
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      privateKey: ''
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  computed: {},
  methods: {
    getRsaCode(str, PublicKey) {
      const encryptStr = new JSEncrypt();
      encryptStr.setPublicKey(PublicKey); // 设置 加密公钥
      this.privateKey = encryptStr.encrypt(str.toString()); // 进行加密
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          GetPublicKey().then(async (res) => {
            await this.getRsaCode(
              this.loginForm.password,
              res.key.split('-----END PUBLIC KEY-----')[0] + '-----END PUBLIC KEY-----'
            );

            var ch = '0',
              len = this.privateKey.length.toString().length;
            for (var i = 1; i < 4 - len; i++) ch += '0';

            var kk = ch + this.privateKey.length.toString();
            var finalKey = this.privateKey + res.key + kk;
            this.loginForm.password = finalKey;
            login(this.loginForm)
              .then((res) => {
                console.log('login user info', res);
                userStore.setUser(res);
                this.goToPage();
              })
              .finally(() => {
                this.loading = false;
              });
          });
        } else {
          console.log('login error: 用户名或密码格式错误');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    goToPage() {
      this.diaVis = false;
      this.redirect = '/'; //设置默认页面
      this.$router.push({ path: this.redirect, query: this.otherQuery });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__wrapper {
      width: 100%;
      box-shadow: none;
      background-color: transparent;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-radio-button__inner {
    width: 150px;
    height: 40px;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 5px;
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #c0cbd2fa;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #eee;
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
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
}
</style>
