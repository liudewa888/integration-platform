<template>
  <div class="navbar">
    <div class="navbar-left">
      <img :src="logo1" class="knt-logo" />
      <!-- 系统名称 -->
      <span class="title">{{ appStore.systemName }}</span>
    </div>
    <div class="navbar-center">
      <el-menu
        background-color="#1D3A66"
        text-color="#D4DDEA"
        active-text-color="#FFFFFF"
        :ellipsis="false"
        :default-active="topMenusActivIndex"
        mode="horizontal"
        @select="handleSelect"
        v-if="showTopMenu"
      >
        <el-menu-item
          :index="index"
          :key="item.meta.id"
          v-for="(item, index) in menusStore.topMenus"
        >
          <b>
            {{ item.meta.title }}
          </b>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="navbar-right">
      <div class="right-menu">
        <el-dropdown size="medium" class="right-menu-item-toole" trigger="hover">
          <span class="el-dropdown-link">
            Hello,{{ name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item>
                <div class="right-menu-item" @click="dialogUpdatePwd = true">
                  <svg-icon :iconClass="'lock'" />
                  修改密码
                </div>
              </el-dropdown-item> -->
              <el-dropdown-item>
                <div class="right-menu-item" @click="logout">
                  <svg-icon :iconClass="'switch'" />
                  退出登录
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 头像 -->
        <el-dropdown
          v-if="false"
          class="avatar-container right-menu-item hover-effect"
          trigger="hover"
        >
          <div class="avatar-wrapper"></div>

          <template v-slot:dropdown>
            <el-dropdown-menu class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item>返回首页</el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 修改密码窗口 -->
    <!-- <el-dialog title="修改密码" v-model:visible="dialogUpdatePwd" width="30%" append-to-body>
      <el-form ref="refUpdatePwd" :model="formUpdatePwd" :rules="rules">
        <el-form-item label="原密码" prop="pwd">
          <el-input type="password" v-model="formUpdatePwd.pwd" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input type="password" v-model="formUpdatePwd.newpwd" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="rpnewpwd">
          <el-input type="password" v-model="formUpdatePwd.rpnewpwd" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="dialogUpdatePwd = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdatePwd">确 定</el-button>
        </div>
      </template>
    </el-dialog> -->
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/images/logo.png';
import { useMenusStore } from '@/stores/menus';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
const router = useRouter();
const menusStore = useMenusStore();
const userStore = useUserStore();
const appStore = useAppStore();
const showTopMenu = ref(window.appConfig.showTopMenu);
const logo1 = ref();
const name = ref(userStore.user.name);
const handleSelect = (index) => {
  menusStore.setTopMenuActiveIndex(index);
  const menu = menusStore.topMenus[index];
  router.push(menu.path);
};
const clearAllCookie = () => {
  const date = new Date();
  date.setTime(date.getTime() - 10000);
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + '=0; expire=' + date.toGMTString() + '; path=/';
  }
};
const logout = async () => {
  clearAllCookie();
  userStore.removeUser();
  router.push(`/login`);
};

const topMenusActivIndex = computed(() => {
  return menusStore.topMenuActiveIndex;
});
</script>
<style lang="scss" scoped>
.el-menu-item.is-active {
  border-bottom: 4px solid #4890ff !important;
  font-size: 16px;
}
.el-menu-item {
  font-size: 16px;
}
.navbar-left {
  width: 415px;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;

  :deep(.el-menu--horizontal.el-menu ){
    border-bottom: none;
  }
}

.navbar-right {
  width: 300px;
}
.navbar {
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #1d3a66;

  .right-menu {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #d4ddea;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 20px;
      .avatar-wrapper {
        margin-top: 5px;
        .avatar-name {
          cursor: pointer;
          position: relative;
          right: -4px;
          top: -13px;
          font-size: 16px;
          color: #fff;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .navbar-left .knt-logo {
    width: 256px;
    height: 37px;
    float: left;
    margin: 12px 10px auto 20px;
    border: 1px solid #ddd;
  }
  > .iconfont {
    font-size: 24px;
    color: #fff;
    float: left;
    margin: 18px 10px auto 20px;
  }
  > .navbar-left .title {
    font-size: 18px;
    color: #fff;
    float: left;
    height: 60px;
    line-height: 60px;
  }
  > .el-dropdown {
    float: right;
    > .el-dropdown-link {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
}
.right-menu-item-toole {
  color: #d4ddea;
  padding-right: 20px;
  cursor: pointer;
  font-size: 14px;
}
</style>
