<template>
  <div
    v-if="
      store.leftMenus[store.topMenuActiveIndex] && store.leftMenus[store.topMenuActiveIndex].length
    "
  >
    <div class="content">
      <el-menu
        :default-active="activeRoute"
        class="el-menu-vertical-demo"
        background-color="#2B5799"
        text-color="#D4DDEA"
        active-text-color="#FFF"
        :router="true"
        :unique-opened="true"
        :collapse-transition="true"
        :collapse="isCollapse"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <recursive-menu :menu-data="store.leftMenus[store.topMenuActiveIndex]"></recursive-menu>
      </el-menu>
    </div>
    <div class="collapse-button">
      <img :src="closeImg" @click="menuCollapse" v-if="!isCollapse" />
      <img :src="openImg" @click="menuCollapse" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import openImg from '@/assets/images/menu_open.png';
import closeImg from '@/assets/images/menu_close.png';
import RecursiveMenu from './RecursiveMenu.vue';
import { useMenusStore } from '@/stores/menus';

const store = useMenusStore();
console.log(store.leftMenus, store.topMenuActiveIndex);

const activeRoute = ref('/');
const isCollapse = ref(false);

const handleSelect = () => {};
const handleOpen = () => {};
const handleClose = () => {};
const menuCollapse = () => {};
</script>

<style lang="scss" scoped>
div.content::-webkit-scrollbar {
  width: 0;
}
.content {
  width: 220px;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;

  .el-menu {
    .is-active > .el-submenu__title {
      background-color: #4890ff !important ;
      font-weight: bold !important;
      .iconfont {
        color: #fff !important;
      }
      .name {
        color: #fff !important;
      }
    }
    .is-opened > .el-submenu__title {
      background-color: #285190 !important ;
    }
    > .el-submenu {
      width: 220px;

      box-sizing: border-box;

      > .el-submenu__title {
        height: 50px;
        line-height: 50px;
        position: relative;
        font-weight: bold !important;
        .iconfont {
          width: 18px;
          height: 18px;
          color: #d4ddea;
          display: inline-block;
          line-height: 18px;
          text-align: center;
          font-size: 18px;
          margin-right: 10px;
        }
        span {
          color: #d4ddea;
        }
        .spanSelect {
          color: #fff;
        }
        .el-icon-arrow-down {
          color: #fff;
          position: absolute;
          right: 0px;
          margin-right: 10px;
        }
        &:hover {
          background-color: #244880 !important;
        }
      }
      > .el-menu--inline {
        .iconfont {
          width: 6px;
          display: inline-block;
        }
        span {
          color: #d4ddea;
        }
      }
      .el-menu-item.is-active {
        background-color: #4890ff !important;
        > ul {
          background-color: #285190 !important;
        }
        span {
          color: #fff !important;
        }
      }
      .el-menu-item {
        min-width: 179px !important;
        font-weight: bold !important;
      }
    }
    .el-submenu .is-active {
      background-color: #4890ff !important;
      .el-submenu__title {
        background-color: transparent;
      }
    }
  }
}
.collapse-button {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 220px;
  min-width: 56px;
  height: 50px;
  background-color: #244880;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  > .iconfont {
    font-size: 24px;
    color: #fff;
    &:hover {
      cursor: pointer;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  height: 100%;
}
.el-menu--collapse {
  width: 56px;
}

.el-menu--vertical {
  //   left: 56px !important;
  .el-menu-item {
    height: 50px;
    &:hover {
      background-color: #244880 !important;
    }
  }
  .is-active {
    background-color: #4890ff !important;
  }
}
@mixin keyframes($closing2) {
  @keyframes #{$closing2} {
    from {
      width: 220px;
    }
    to {
      width: 56px;
    }
  }
}
</style>
