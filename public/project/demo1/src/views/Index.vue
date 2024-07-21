<template>
  <div>
    <h2>Vue3示例--首页</h2>
    <div class="content" style="text-align: center">
      <p>
        当前vue版本
        <el-tag style="vertical-align: text-top" size="small">3.2.45</el-tag>
      </p>
      <p>
        当前element-plus版本
        <el-tag style="vertical-align: text-top" size="small">2.2.6</el-tag>
      </p>
      <p>
        <el-button @click="open">仓库地址</el-button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ElButton,ElTag } from "element-plus";
const open = () => {
  window.open('https://github.com/liudewa888/integration-platform')
}
</script>

<style>
:root {
  --host-color: #f16b5f;
}
</style>
