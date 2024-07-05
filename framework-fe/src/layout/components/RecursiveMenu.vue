<template>
  <div class="left-menu">
    <template v-for="menu in menuData">
      <el-sub-menu :key="menu.name" :index="menu.path" v-if="menu.children && menu.children.length">
        <template v-slot:title>
          <i class="iconfont icon-tab_crisis" style="color: #fff"></i>
          <span class="icon-title" slot="title">
            <b>{{ menu.meta.title }}</b>
          </span>
        </template>
        <recursive-menu :menuData="menu.children"></recursive-menu>
      </el-sub-menu>
      <el-menu-item :key="menu.name" :index="menu.path" v-else>
        <i class="iconfont icon-tab_rule" style="color: #fff"></i>
        <template v-slot:title>
          <span class="icon-title">
            <b>{{ menu.meta.title }}</b>
          </span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const { menuData } = defineProps({
  menuData: {
    type: Array,
    required: true,
    default: []
  }
});
</script>
<style lang="scss" scoped>
.el-submenu__icon-arrow.el-icon-arrow-down {
  color: #fff;
}
.icon-title {
  padding-left: 15px;
}
.el-menu-item.is-active {
  background-color: #4890ff !important;
}
</style>
